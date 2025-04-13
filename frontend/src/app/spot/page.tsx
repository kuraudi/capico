"use client";
import React, { useEffect, useState } from "react";
import HeaderNav from "../components/common/HeaderNav";
import { useGlobalContext } from "../GlobalContext";
import CustomImage from "../components/ui/CustomImage";
import { TypeCoinInfo } from "../GlobalContext";
import TradingViewWidget from "./TradingViewWidget";
import axios from "axios";
import Orderbook from "./Orderbook";
import Trades from "./Trades";

export type InputFieldsType = {
  takeProfit: {
    value: string;
    percent: string;
  };
  stopLoss: {
    value: string;
    percent: string;
  };
  spot: {
    price: string;
    total: string;
    showTpSlChechBox: boolean;
  };
};

export default function Page() {
  //states
  const { coinPrices, userCoinsBalances } = useGlobalContext();
  const [orderbookHistory, setOrderBookHistory] = useState([]);
  const [percentage, setPercentage] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [coinAmount, setCoinAmount] = useState("");

  const [selectedCoin, setSelectedCoin] = useState<[string, TypeCoinInfo]>([
    "BTC",
    {
      name: "Bitcoin",
      url_logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      price: 0,
      price24hPcnt: 0,
      turnover24h: 0,
      volume24h: 0,
      lowPrice24h: 0,
      highPrice24h: 0,
    },
  ]);
  const [activeTab, setActiveTab] = useState({
    orders: "orderbook",
    marketMode: {
      type: "spot",
      orderType: "buy",
    },
  });
  const [searchCoin, setSearchCoin] = useState("");
  const [inputFields, setInputFields] = useState<InputFieldsType>({
    takeProfit: {
      value: "",
      percent: "",
    },
    stopLoss: {
      value: "",
      percent: "",
    },
    spot: {
      price: "",
      total: "",
      showTpSlChechBox: false,
    },
  });

  const [orderbook, setOrderBook] = useState({
    orderbook_buy: [],
    orderbook_sell: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (coinPrices.length > 0) {
      setSelectedCoin((prevSelectedCoin) => {
        return prevSelectedCoin[1].price === 0
          ? coinPrices[0]
          : prevSelectedCoin;
      });
    }
  }, [coinPrices]);

  useEffect(() => {
    setInputFields((prev) => ({
      ...prev,
      spot: {
        ...prev.spot,
        price: String(selectedCoin[1]?.price),
      },
    }));
  }, [selectedCoin]);

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const { data: orderbook } = await axios.post(
          "http://127.0.0.1:8000/market/orderbook",
          {
            params: { symbol: selectedCoin[0] }, // 👈 Передаем в query params
          }
        );
        // const { data: orderbookHistory } = await axios.post(
        //   "http://127.0.0.1:8000/market/orderbook/history",
        //   {
        //     params: { symbol: selectedCoin[0] }, // 👈 Передаем в query params
        //   }
        // );
        // console.log(orderbookHistory?.orderbook_history);

        // setOrderBookHistory(orderbookHistory?.orderbook_history);

        setOrderBook({
          orderbook_buy: orderbook.orderbook_buy,
          orderbook_sell: orderbook.orderbook_sell,
        });
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchOrderBook();
    const interval = setInterval(fetchOrderBook, 3000);
    return () => clearInterval(interval);
  }, [selectedCoin]);

  const fetchAddOrder = async () => {
    if (!coinAmount) {
      setError("Enter amount");
      return;
    }
    console.log(activeTab.marketMode.orderType, "123");

    const response = await axios.post(
      "http://127.0.0.1:8000/market/spot/order/add",
      {
        symbol: selectedCoin[0],
        coin_price: inputFields.spot.price,
        coin_amount: coinAmount,
        type_order: activeTab.marketMode.orderType.toUpperCase(),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    setError("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(",", ".");
    if (value === "") {
      setCoinAmount("");
      setInputFields((prev) => ({
        ...prev,
        spot: {
          ...prev.spot,
          total: "",
        },
      }));
      setPercentage(0);
      return;
    }

    const foundCoin = userCoinsBalances.find(
      (obj) => obj.symbol === selectedCoin[0]
    )?.avaliable_balance;

    const numValue = Number(value);
    console.log(numValue);
    if (!isNaN(numValue)) {
      console.log(foundCoin);
      setCoinAmount(value);
      setPercentage(foundCoin ? (numValue / Number(foundCoin)) * 100 : 0);
      setInputFields((prev) => ({
        ...prev,
        spot: {
          ...prev.spot,
          total: String(numValue * (Number(prev.spot.price) || 0)),
        },
      }));
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setPercentage(value);

    const foundCoin = userCoinsBalances.find(
      (obj) => obj.symbol === selectedCoin[0]
    )?.avaliable_balance;

    setCoinAmount(((value / 100) * (foundCoin ? foundCoin : 0)).toString());

    setInputFields((prev) => ({
      ...prev,
      spot: {
        ...prev.spot,
        total: String(
          (value / 100) *
            (Number(prev.spot.price) ?? 0) *
            (foundCoin ? foundCoin : 0)
        ),
      },
    }));
  };
  return (
    <div className="wrapper !bg-[#242424] text-white">
      <div className="bg-[#171717]">
        <HeaderNav />
      </div>
      <div className="flex items-center space-x-[10px] text-white p-[5px] mb-[5px] mt-[3px]">
        <div>
          <CustomImage
            width={20}
            height={20}
            alt="fire"
            src="/pages/SpotPage/fire.svg"
          ></CustomImage>{" "}
        </div>
        {coinPrices.slice(0, 8).map((coin, index) => (
          <div key={index}>
            <div>
              <p className="font-nekstmedium inline-block">{coin[0]}/USDT</p>
              <span
                className={`ml-[2px] text-[12px] font-nekstmedium ${
                  Number(coin[1]?.price24hPcnt) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {Number(coin[1]?.price24hPcnt)?.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <div className="relative flex w-full  h-[80px] bg-[#181818]  rounded-[20px] mx-[10px] items-center px-[10px] py-[20px]">
          <div className="flex min-w-[10px] h-full items-center pr-[10px] border-r-[1px] border-solid border-[#2d2d2d] ">
            {selectedCoin && (
              <div className="mr-[7px]  w-[40px] min-h-[10px] ">
                <CustomImage
                  src={selectedCoin[1].url_logo}
                  width={50}
                  height={30}
                  alt="coin"
                  className="rounded-[40px]"
                />
              </div>
            )}
            <div className="flex group cursor-pointer ">
              <div className="">
                <p className="font-semibold text-[20px]">
                  {selectedCoin?.[0] || ""}/USDT
                </p>
              </div>
              <div className="ml-[7px] w-[20px] bg-[#292929] rounded-[10px]  ">
                <CustomImage
                  src="/pages/SpotPage/arrow.svg"
                  width={30}
                  height={20}
                  alt="arrow"
                  className="filter invert"
                />

                <div
                  className="menu invisible opacity-0 absolute  left-[20px] w-[450px] min-h-[500px]  group-hover:opacity-100 group-hover:visible z-10 flex flex-col items-center  
    pointer-events-none group-hover:pointer-events-auto pt-[0px] duration-[0.3s]  scale-y-[50%] group-hover:scale-y-[100%] origin-top group-hover:flex text-white rounded-[30px] transition-all"
                >
                  <div
                    className="w-full h-[450px] bg-[#1b1b1b]  
     mt-[30px] py-[10px] rounded-[12px] overflow-y-scroll "
                  >
                    <div className="px-[5px] font-nekstmedium h-full  ">
                      <div className="w-full flex items-center justify-center ">
                        <div className="flex w-[95%] h-[40px] border-[1px] rounded-[20px] border-solid border-[#424242] ">
                          <div className="flex items-center  pl-[13px] pr-[3px]">
                            <CustomImage
                              src="pages/SpotPage/glass.svg"
                              width={23}
                              height={20}
                              alt="glass"
                              className="invert"
                            ></CustomImage>
                          </div>
                          <input
                            type="text"
                            placeholder="Search"
                            value={searchCoin}
                            className="w-full h-full rounded-full bg-opacity-0 bg-white p-[10px] font-nekstmedium text-[16px] focus:placeholder:opacity-0 "
                            onChange={(e) => setSearchCoin(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="px-[20px]  w-full h-[300px] mt-[10px]">
                        <div className="w-full grid grid-cols-3">
                          <div className="font-nekstmedium text-[#767676]">
                            Coin
                          </div>
                          <div className="flex justify-end font-nekstmedium text-[#767676]">
                            Last price
                          </div>
                          <div className="flex justify-end font-nekstmedium text-[#767676] mb-[15px]">
                            24h price
                          </div>
                        </div>
                        <ul className=" w-full">
                          {searchCoin === ""
                            ? coinPrices.map((coin, index) => (
                                <div
                                  key={index}
                                  className="grid grid-cols-3 hover:bg-[#2e2e2e] rounded-[5px] cursor-pointer"
                                  onClick={() => {
                                    setSelectedCoin(coin);
                                  }}
                                >
                                  <div className="pl-[5px] flex items-center justify-end font-nekstmedium text-[16px] h-[60px]">
                                    <div className="flex items-center w-full ">
                                      <div className="flex items-center">
                                        <CustomImage
                                          src={coin[1]?.url_logo}
                                          height={20}
                                          width={25}
                                          alt="coin"
                                        ></CustomImage>
                                      </div>
                                      <div>{coin[0]}/USDT</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-end font-nekstmedium text-[16px] ">
                                    {coin[1].price}
                                  </div>
                                  <div
                                    className={`flex items-center justify-end font-nekstmedium text-[16px] ${
                                      Number(coin[1]?.price24hPcnt) >= 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {Number(coin[1]?.price24hPcnt) >= 0
                                      ? "+"
                                      : ""}
                                    {coin[1].price24hPcnt}%
                                  </div>
                                </div>
                              ))
                            : coinPrices
                                .filter(([symbol]) =>
                                  symbol
                                    .toLowerCase()
                                    .includes(searchCoin.toLowerCase())
                                )
                                .map((coin, index) => (
                                  <div
                                    key={index}
                                    className="grid grid-cols-3 hover:bg-[#2e2e2e] rounded-[5px] cursor-pointer"
                                    onClick={() => {
                                      setSelectedCoin(coin);
                                    }}
                                  >
                                    <div className="pl-[5px] flex items-center justify-end font-nekstmedium text-[16px] h-[60px]">
                                      <div className="flex items-center w-full ">
                                        <div className="flex items-center">
                                          <CustomImage
                                            src={coin[1]?.url_logo}
                                            height={20}
                                            width={25}
                                            alt="coin"
                                          ></CustomImage>
                                        </div>
                                        <div>{coin[0]}/USDT</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-end font-nekstmedium text-[16px] ">
                                      {coin[1].price}
                                    </div>
                                    <div
                                      className={`flex items-center justify-end font-nekstmedium text-[16px] ${
                                        Number(coin[1]?.price24hPcnt) >= 0
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      {Number(coin[1]?.price24hPcnt) >= 0
                                        ? "+"
                                        : ""}
                                      {coin[1].price24hPcnt}%
                                    </div>
                                  </div>
                                ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-[10px] w-full h-[full] grid grid-cols-6 grid-rows-2 grid-flow-col gap-[5px] ">
            <div className="">
              <p className="font-semibold text-[#19d464] text-[19px]">
                {selectedCoin?.[1].price || "0"}
              </p>
            </div>
            <div>
              <p className="font-medium text-[12px] text-[#8a8888]">
                ≈$ {selectedCoin?.[1]?.price || "0"}
              </p>
            </div>
            <div className="">
              <p className="font-nekstmedium text-[15px] text-[#8a8888]">
                24h change
              </p>
            </div>
            <div
              className={`font-nekstmedium flex space-x-[5px] ${
                Number(selectedCoin?.[1]?.price24hPcnt) >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              <p className="">
                {Number(
                  Number(selectedCoin?.[1]?.price) -
                    Number(selectedCoin?.[1]?.price) /
                      (1 + Number(selectedCoin?.[1]?.price24hPcnt ?? 0) / 100)
                )?.toFixed(6) || "0"}
              </p>
              <p> ({selectedCoin?.[1]?.price24hPcnt}%)</p>
            </div>
            <div className="font-nekstmedium text-[15px] text-[#8a8888]">
              24h high
            </div>
            <div className="font-nekstmedium">
              {selectedCoin?.[1]?.highPrice24h}
            </div>
            <div className="font-nekstmedium text-[15px] text-[#8a8888]">
              24h low
            </div>
            <div className="font-nekstmedium">
              {selectedCoin?.[1]?.lowPrice24h}
            </div>
            <div className="font-nekstmedium text-[15px] text-[#8a8888]">
              24h quantity({selectedCoin?.[0]})
            </div>
            <div className="font-nekstmedium">
              {selectedCoin?.[1]?.volume24h}
            </div>
            <div className="font-nekstmedium text-[15px] text-[#8a8888]">
              24h total(USDT)
            </div>
            <div className="font-nekstmedium">
              {selectedCoin?.[1]?.turnover24h}
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-[10px] ">
        <div className="flex-1 ml-[10px]  h-[67vh] bg-[#181818] rounded-[20px]">
          <TradingViewWidget
            symbol={selectedCoin?.[0] || "BTCUSDT"}
          ></TradingViewWidget>
        </div>
        <div className="flex flex-1 mr-[10px]">
          <div className="flex-1 ml-[10px] h-[67vh] bg-[#181818] rounded-[20px] p-[15px]">
            <div className="flex flex-col  h-full">
              <div className="flex space-x-[10px] text-[#8a8888] font-nekstmedium mb-[10px]">
                <button
                  className={`py-[5px] border-b-[2px] border-solid border-white ${
                    activeTab.orders === "orderbook"
                      ? "border-opacity-100"
                      : "border-opacity-0"
                  } `}
                  onClick={() =>
                    setActiveTab((prev) => ({
                      ...prev,
                      orders: "orderbook",
                    }))
                  }
                >
                  Order book
                </button>
                <button
                  className={`py-[5px] border-b-[2px] border-solid border-white ${
                    activeTab.orders === "trades"
                      ? "border-opacity-100"
                      : "border-opacity-0"
                  } `}
                  onClick={() =>
                    setActiveTab((prev) => ({
                      ...prev,
                      orders: "trades",
                    }))
                  }
                >
                  Market Trades
                </button>
              </div>

              {activeTab.orders === "orderbook" ? (
                <Orderbook
                  selectedCoin={selectedCoin}
                  orderbook={orderbook}
                  setInputFields={setInputFields}
                ></Orderbook>
              ) : (
                <Trades
                  selectedCoin={selectedCoin}
                  orderbookHistory={orderbookHistory}
                />
              )}
            </div>
          </div>

          <div className="flex-1  ml-[10px] min-h-[20px] bg-[#181818] rounded-[20px] p-[15px]">
            <div className="flex space-x-[10px] mb-[20px]">
              <button
                className={`font-nekstmedium border-b-[2px] border-solid border-white  py-[5px]
              ${
                activeTab.marketMode.type === "spot"
                  ? "border-opacity-100"
                  : "border-opacity-0 text-[#8a8888]"
              }
              `}
                onClick={() =>
                  setActiveTab((prev) => ({
                    ...prev,
                    marketMode: {
                      ...prev.marketMode,
                      type: "spot",
                    },
                  }))
                }
              >
                Spot
              </button>
              <button
                className={`font-nekstmedium border-b-[2px] border-solid border-white  py-[5px]
              ${
                activeTab.marketMode.type === "cross3x"
                  ? "border-opacity-100 "
                  : "border-opacity-0 text-[#8a8888]"
              }
              `}
                onClick={() =>
                  setActiveTab((prev) => ({
                    ...prev,
                    marketMode: {
                      ...prev.marketMode,
                      type: "cross3x",
                    },
                  }))
                }
              >
                Cross 3x
              </button>
              <button
                className={`font-nekstmedium border-b-[2px] border-solid border-white py-[5px]
              ${
                activeTab.marketMode.type === "isolated10x"
                  ? "border-opacity-100 text-white"
                  : "border-opacity-0 text-[#8a8888]"
              }
              `}
                onClick={() =>
                  setActiveTab((prev) => ({
                    ...prev,
                    marketMode: {
                      ...prev.marketMode,
                      type: "isolated10x",
                    },
                  }))
                }
              >
                Isolated 10x
              </button>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-between w-[45%]">
                <button
                  className={`h-[40px] bg-contentTradeBuy flex-auto ps-8 relative text-center rounded-full cursor-pointer z-0 after:-z-10 after:w-1/2 after:content-[''] after:bg-inherit after:h-full after:rounded-r-lg after:absolute after:top-0 after:-right-4 after:-skew-x-[35deg] ${
                    activeTab.marketMode.orderType === "buy"
                      ? "bg-[#1ae5b2]"
                      : "bg-[#424242]"
                  }  font-semibold text-[16px]`}
                  onClick={() => {
                    setActiveTab((prev) => ({
                      ...prev,
                      marketMode: {
                        ...prev.marketMode,
                        orderType: "buy",
                      },
                    }));
                  }}
                >
                  Buy
                </button>
              </div>
              <div className="flex items-center justify-between w-[45%]">
                <button
                  className={` ${
                    activeTab.marketMode.orderType === "sell"
                      ? "bg-red-500"
                      : "bg-[#424242]"
                  } h-[40px] flex-auto bg-backgroundTertiary text-contentPrimary w-1/2 pe-8 relative overflow-visible text-center rounded-full cursor-pointer z-0 before:-z-10 before:w-1/2 before:content-[''] before:bg-inherit before:h-full before:rounded-l-lg before:absolute before:top-0 before:-left-4 before:skew-x-[-35deg] font-semibold text-[16px]`}
                  onClick={() => {
                    setActiveTab((prev) => ({
                      ...prev,
                      marketMode: {
                        ...prev.marketMode,
                        orderType: "sell",
                      },
                    }));
                  }}
                >
                  Sell
                </button>
              </div>
            </div>

            <div className="flex  font-nekstmedium text-[#8a8888] mt-[20px] border-b-[1px] border-[#2c2c2c] border-solid justify-between">
              <div className="flex space-x-[10px] ">
                <button className="border-b-[2px] border-solid border-white">
                  Limit
                </button>
                <button className="border-b-[2px] border-solid border-white py-[5px]">
                  Market
                </button>
              </div>
              <p className={`text-red-500`}>{error}</p>
            </div>
            <div className="">
              <div className="flex space-x-[10px] mt-[10px] group">
                <div className="group flex w-[100%] h-[40px] rounded-[20px] bg-[#262626] border-[1px] border-solid border-opacity-0 border-white group-focus-within:border-opacity-100 duration-[0.2s]">
                  <div
                    className="w-[20%] font-nekstregular text-[#959595] flex items-center pl-[15px]"
                    onClick={() =>
                      document.getElementById("coinPriceInput")?.focus()
                    }
                  >
                    Price
                  </div>
                  <input
                    type="number"
                    id="coinPriceInput"
                    value={inputFields.spot.price}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        setInputFields((prev) => ({
                          ...prev,
                          spot: {
                            ...prev.spot,
                            price: "",
                          },
                        }));
                        return;
                      }
                      setInputFields((prev) => ({
                        ...prev,
                        spot: {
                          ...prev.spot,
                          price: value,
                        },
                      }));
                      return;
                    }}
                    className="w-[40%] h-[40px] bg-white bg-opacity-0 rounded-[20px] p-[15px] font-nekstregular text-end appearance-none focus:outline-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                  />

                  <div className="flex flex-col w-[20%] h-[40px] font-nekstregular  justify-center">
                    USDT
                  </div>
                  <div className="flex flex-col w-[20%] border-l-[1px] border-solid border-[#363636] rounded-r-[20px]">
                    <button
                      className="flex-1 border-b-[1px] border-solid border-[#363636] flex items-center justify-center font-nekstregular text-[20px] text-[#a5a5a5] hover:bg-[#424242] rounded-tr-[20px]"
                      onClick={() =>
                        setInputFields((prev) => ({
                          ...prev,
                          spot: {
                            ...prev.spot,
                            price: (Number(prev.spot.price) + 0.01).toFixed(2),
                          },
                        }))
                      }
                    >
                      +
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center font-nekstregular text-[20px] text-[#a5a5a5] hover:bg-[#424242] rounded-br-[20px]"
                      onClick={() =>
                        setInputFields((prev) => ({
                          ...prev,
                          spot: {
                            ...prev.spot,
                            price: (Number(prev.spot.price) - 0.01).toFixed(2),
                          },
                        }))
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-[10px] w-full group duration-[0.2s]">
                <div className="w-full flex bg-[#262626] rounded-[20px] border-[1px] border-solid border-opacity-0 border-white group-focus-within:border-opacity-100">
                  <div
                    className="w-[25%] font-nekstregular text-[#959595] flex items-center pl-[15px]"
                    onClick={() =>
                      document.getElementById("coinAmountInput")?.focus()
                    }
                  >
                    Amount
                  </div>
                  <input
                    type="number"
                    id="coinAmountInput"
                    className="w-[60%] h-[40px]  bg-opacity-100 rounded-[20px] p-[15px] font-nekstregular text-end  bg-[#262626] duration-[0.2s] appearance-none  [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                    value={coinAmount}
                    onChange={handleInputChange}
                  />
                  <div className="font-nekstregular w-[15%]  text-[13px] flex items-center ">
                    {selectedCoin[0]}
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto relative mt-[10px]">
                {/* Ползунок */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={percentage}
                  onChange={handleSliderChange}
                  className={`w-full h-[13px] rounded-lg appearance-none ${
                    activeTab.marketMode.orderType === "sell" &&
                    userCoinsBalances.find(
                      (obj) => obj?.symbol === selectedCoin[0]
                    )?.avaliable_balance === 0
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } 
      [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:h-[16px]
      [&::-webkit-slider-thumb]:bg-[#ffffff] [&::-webkit-slider-thumb]:rounded-full 
      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 
      [&::-webkit-slider-thumb]:border-white bg-[#2a2a2a]`}
                  style={{
                    background: `linear-gradient(to right, #808080 ${percentage}%, #2a2a2a ${percentage}%)`,
                  }}
                  disabled={
                    userCoinsBalances.find(
                      (obj) => obj?.symbol === selectedCoin[0]
                    )?.avaliable_balance === 0
                  }
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                />

                {/* Всплывающее окно с процентом */}
                <div
                  className={`absolute ${
                    isDragging ? "flex" : "hidden"
                  } items-center justify-center top-[-35px] font-nekstregular text-[13px] w-[42px] 
    rounded-[6px] h-[28px] text-center bg-[#414141] text-white font-bold
    after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 
    after:bottom-[-6px] after:border-[6px] after:border-transparent after:border-t-[#414141]`}
                  style={{
                    left: `${percentage}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {percentage}%
                </div>

                {/* Подписи под ползунком */}
                <div className="top-[35px] mt-[3px] w-full flex justify-between items-center">
                  <div className="text-[12px] text-[#6b6a6a] font-nekstmedium flex items-center justify-between w-full">
                    <div>0%</div>
                    <div>25%</div>
                    <div>50%</div>
                    <div>75%</div>
                    <div>100%</div>
                  </div>
                </div>
              </div>

              <div className="mt-[10px] flex justify-between w-full group">
                <div className="w-[73%] flex bg-[#262626] rounded-[20px] border-[1px] border-solid border-opacity-0 border-white group-focus-within:border-opacity-100  duration-[0.2s]">
                  <div
                    className="w-[25%] font-nekstregular text-[#959595] flex items-center pl-[15px] "
                    onClick={() =>
                      document.getElementById("coinTotalInput")?.focus()
                    }
                  >
                    Total
                  </div>
                  <input
                    type="number"
                    id="coinTotalInput"
                    className="w-[60%] h-[40px]  bg-opacity-100 rounded-[20px] p-[15px] font-nekstregular text-end  bg-[#262626] duration-[0.2s] appearance-none  [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                    value={inputFields.spot.total}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        setInputFields((prev) => ({
                          ...prev,
                          spot: {
                            ...prev.spot,
                            total: "",
                          },
                        }));
                        return;
                      }
                      setCoinAmount(
                        String(
                          Number(
                            Number(value) / Number(selectedCoin[1]?.price)
                          ).toFixed(8)
                        ) || ""
                      );
                      setInputFields((prev) => ({
                        ...prev,
                        spot: {
                          ...prev.spot,
                          total: value,
                        },
                      }));
                      return;
                    }}
                  />
                  <div className="font-nekstregular w-[30%] text-[14px] flex items-center ">
                    USDT
                  </div>
                </div>
                <button
                  className="w-[25%] h-[40px] bg-[#262626] rounded-[20px] p-[15px] font-nekstregular text-[#ffffff] flex items-center justify-center"
                  onClick={() => {
                    const avaliableBalance =
                      userCoinsBalances.find(
                        (obj) => obj.symbol === selectedCoin[0]
                      )?.avaliable_balance ?? 0;
                    setInputFields((prev) => ({
                      ...prev,
                      spot: {
                        ...prev.spot,
                        total: String(
                          userCoinsBalances
                            ? avaliableBalance * Number(prev.spot.price)
                            : 0
                        ),
                      },
                    }));
                    setCoinAmount(String(avaliableBalance));
                    setPercentage(avaliableBalance === 0 ? 0 : 100);
                  }}
                >
                  max
                </button>
              </div>
              <button
                className={`mt-[10px] ${
                  activeTab.marketMode.orderType === "buy"
                    ? "bg-[#1ae5b2]"
                    : "bg-red-500"
                } w-full h-[40px]  rounded-[20px] font-semibold`}
                onClick={() => {
                  if (!Number(coinAmount)) {
                    setError("Set amount coin");
                    return;
                  }

                  setError("");
                  fetchAddOrder();
                }}
              >
                {activeTab.marketMode.orderType === "buy" ? "Buy " : "Sell "}
                {selectedCoin[0]}
              </button>

              <div className="mt-[7px] flex items-center">
                <input
                  id="custom-checkbox"
                  type="checkbox"
                  className="hidden peer"
                  onChange={() =>
                    setInputFields((prev) => ({
                      ...prev,
                      spot: {
                        ...prev.spot,
                        showTpSlChechBox: prev.spot.showTpSlChechBox
                          ? false
                          : true,
                      },
                    }))
                  }
                />
                <label
                  htmlFor="custom-checkbox"
                  className="h-[17px] w-[17px] bg-[#4e4e4e] border-[1px] border-[#383838] border-solid rounded-md cursor-pointer flex items-center justify-center peer-checked:bg-white peer-checked:border-black relative"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 50 50"
                    id="svg_checkbox"
                    className={`opacity-${
                      inputFields.spot.showTpSlChechBox ? "100" : "0"
                    } transition-opacity duration-200`}
                  >
                    <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path>
                  </svg>
                </label>
                <span className="font-nekstregular ml-[2px] text-[14px]">
                  TP/SL
                </span>
              </div>

              <div
                className={`${
                  inputFields.spot.showTpSlChechBox ? "block" : "hidden"
                }`}
              >
                <div className="w-full">
                  <div className="w-full flex justify-between items-center mt-[15px] h-[40px]">
                    <div className="w-[68%] h-full flex group">
                      <div className="w-[100%] flex bg-[#262626] rounded-[20px] border-[1px] border-solid border-opacity-0 border-white group-focus-within:border-opacity-100  duration-[0.2s]">
                        <div className="flex items-center ml-[15px] text-[14px] font-nekstregular text-[#959595]">
                          TP
                        </div>
                        <input
                          type="number"
                          className="w-full h-full bg-opacity-100 rounded-[20px] p-[15px] font-nekstregular text-end  bg-[#262626] duration-[0.2s] appearance-none  [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                          value={inputFields.takeProfit.value}
                          onChange={(e) =>
                            setInputFields((prev) => ({
                              ...prev,
                              takeProfit: {
                                ...prev.takeProfit,
                                value: e.target.value,
                              },
                            }))
                          }
                        />
                        <div className="flex items-center mr-[15px] text-[14px] font-nekstregular ">
                          USDT
                        </div>
                      </div>
                    </div>
                    <div className="w-[30%] h-full flex group">
                      <div className="w-[100%] flex bg-[#262626] rounded-[20px] border-[1px] border-solid border-opacity-0 border-white group-focus-within:border-opacity-100  duration-[0.2s]">
                        <input
                          type="number"
                          className="w-full h-full bg-opacity-100 rounded-[20px] p-[15px] 
                        pr-[5px] font-nekstregular text-end  bg-[#262626] duration-[0.2s] appearance-none  [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                          placeholder="PnL"
                          value={inputFields.takeProfit.percent}
                          onChange={(e) => {
                            setInputFields((prev) => ({
                              ...prev,
                              takeProfit: {
                                value: String(
                                  (Number(e.target.value) / 100) *
                                    (selectedCoin[1].price ?? 0)
                                ),
                                percent: e.target.value,
                              },
                            }));
                          }}
                        />
                        <div className="w-[20%] flex text-[13px] items-center font-nekstmedium ">
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="w-full flex justify-between items-center mt-[15px] h-[40px]">
                    <div className="w-[68%] h-full flex group">
                      <div className="w-[100%] flex bg-[#262626] rounded-[20px] border-[1px] border-solid border-opacity-0 border-white group-focus-within:border-opacity-100  duration-[0.2s]">
                        <div className="flex items-center ml-[15px] text-[14px] font-nekstregular text-[#959595]">
                          SL
                        </div>
                        <input
                          type="number"
                          className="w-full h-full bg-opacity-100 rounded-[20px] p-[15px] font-nekstregular text-end  bg-[#262626] duration-[0.2s] appearance-none  [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                          value={inputFields.stopLoss.value}
                          onChange={(e) =>
                            setInputFields((prev) => ({
                              ...prev,
                              stopLoss: {
                                ...prev.stopLoss,
                                value: e.target.value,
                              },
                            }))
                          }
                        />
                        <div className="flex items-center mr-[15px] text-[14px] font-nekstregular ">
                          USDT
                        </div>
                      </div>
                    </div>
                    <div className="w-[30%] h-full flex group">
                      <div className="w-[100%] flex bg-[#262626] rounded-[20px] border-[1px] border-solid border-opacity-0 border-white group-focus-within:border-opacity-100  duration-[0.2s]">
                        <input
                          type="number"
                          className="w-full h-full bg-opacity-100 rounded-[20px] p-[15px] 
                        pr-[5px] font-nekstregular text-end  bg-[#262626] duration-[0.2s] appearance-none  [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                          placeholder="PnL"
                          value={inputFields.stopLoss.percent}
                          onChange={(e) => {
                            setInputFields((prev) => ({
                              ...prev,
                              stopLoss: {
                                value: String(
                                  (Number(e.target.value) / 100) *
                                    (selectedCoin[1].price ?? 0)
                                ),
                                percent: e.target.value,
                              },
                            }));
                          }}
                        />
                        <div className="w-[20%] flex text-[13px] items-center font-nekstmedium ">
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-nekstregular  mt-[10px] flex space-x-[5px]">
                <p className="text-[#959595]">Avaliable</p>
                <p className="">0.02394835 USDT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
