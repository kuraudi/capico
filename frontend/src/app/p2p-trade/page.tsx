"use client";
import React, { useState, useEffect } from "react";
import HeaderNav from "../components/common/HeaderNav";
import CustomImage from "../components/ui/CustomImage";
import axios from "axios";
import Link from "next/link";

type TypeTrade = {
  email: string;
  trades30d: number;
  rate: number;
  fromCurrency: string;
  toCurrency: string;
  price: number;
  type: string;
  amount: number;
  limit: [number, number];
  paymentMethod: string;
};

export default function Page() {
  const [inputFields, setInputFields] = useState({
    fromCurrency: "RUB",
    toCurrency: "USDT",
    tradeType: "BUY",
    tradePrice: "",
    paymentMethods: "Tinkoff",
    createTrade: {
      isOpen: true,
    },
  });

  const [tradebook, setTradebook] = useState<TypeTrade[]>([]);

  useEffect(() => {
    const fetchTradesBook = async () => {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/market/trades-book"
      );

      console.log(data);
      setTradebook(data);
    };
    fetchTradesBook();
  }, []);

  return (
    <div className="wrapper ">
      <HeaderNav></HeaderNav>
      <div className="min-h-[100vh] w-full bg-[#1b1b1b] ">
        <div className="h-[250px] bg-[#1e1e1e] flex items-center">
          <div className="container px-[100px] flex justify-between items-center">
            <div className="max-w-[800px] ">
              <p className="font-nekstmedium text-[30px] mb-[20px]">
                Используйте P2P для покупки и продажи USDT
              </p>
              <p className="font-medium text-[16px]">
                Безопасный и легкий трейдинг без комиссии на Capico P2P.
                Торгуйте USDT с помощью различные способы оплаты, такие как
                банковские переводы и электронные кошельки.
              </p>
            </div>
            <div className="p-[5px] bg-[#1b1b1b] rounded-[20px]">
              <CustomImage
                width={350}
                height={200}
                alt="p2p"
                src="/pages/p2p-trade/p2p-trade-icon.png"
              ></CustomImage>
            </div>
          </div>
        </div>
        <div className="container px-[100px]">
          <div className="flex justify-between items-center mt-[10px]">
            <div className="flex">
              {" "}
              <div className="flex w-[300px] h-[40px] bg-[#2b2b2b] rounded-[20px]">
                <button
                  className={`w-[50%] font-nekstmedium rounded-[20px] text-[18px] ${
                    inputFields.tradeType === "BUY"
                      ? "bg-[#3a3a3a]"
                      : "text-[#727272]"
                  } duration-[0.5s] `}
                  onClick={() =>
                    setInputFields((prev) => ({ ...prev, tradeType: "BUY" }))
                  }
                >
                  Buy
                </button>
                <button
                  className={`w-[50%] font-nekstmedium rounded-[20px]  text-[18px] ${
                    inputFields.tradeType === "SELL"
                      ? "bg-[#3a3a3a]"
                      : "text-[#727272]"
                  } duration-[0.5s] `}
                  onClick={() =>
                    setInputFields((prev) => ({ ...prev, tradeType: "SELL" }))
                  }
                >
                  Sell
                </button>
              </div>
              <Link href="/p2p-trade/publish" className="h-[40px] =h-f ">
                <button className=" font-nekstmedium  ml-[20px] h-full px-[40px] text-[16px] rounded-[20px] bg-[#272727] hover:bg-[#323232] duration-[0.3s]">
                  Add trade
                </button>
              </Link>
            </div>

            <div className="flex items-center space-x-[10px]">
              <div className="relative w-[200px] border-solid border-[1px] border-[#888888] rounded-[20px] h-[35px] group flex justify-between">
                <div className="w-[35%] h-full flex items-center  pl-[10px] font-nekstlight text-[#878787] ">
                  <CustomImage
                    width={20}
                    height={20}
                    alt={inputFields.toCurrency}
                    src={`/pages/p2p-trade/${inputFields.toCurrency ?? ""}.png`}
                    className="mr-[3px]"
                  ></CustomImage>
                  <p>{inputFields.toCurrency}</p>
                </div>
                <div className="w-[20%] h-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-[20px] h-[20px]"
                  >
                    <path d="M21.53 20.47l-4.694-4.694a8.26 8.26 0 10-1.06 1.06l4.693 4.695a.75.75 0 001.062-1.062zM3.75 10.5a6.75 6.75 0 116.75 6.75 6.758 6.758 0 01-6.75-6.75z"></path>
                  </svg>
                </div>
                <ul className="absolute invisible opacity-0 top-[35px] w-full bg-[#232323] rounded-[10px] p-[5px] group-hover:visible group-hover:opacity-100">
                  {["USDT", "USDC", "BTC"].map((currency) => (
                    <li
                      key={currency}
                      className="w-full h-[50px] items-center flex font-nekstmedium hover:bg-[#3c3c3c] rounded-[10px]"
                    >
                      <button
                        className="w-full h-full flex items-center px-[15px]"
                        data-currency={currency}
                        onClick={() => {
                          setInputFields((prev) => ({
                            ...prev,
                            toCurrency: currency,
                          }));
                        }}
                      >
                        <div className="flex items-center">
                          <CustomImage
                            width={20}
                            height={20}
                            alt={currency}
                            src={`/pages/p2p-trade/${currency.toLowerCase()}.png`}
                            className="mr-[3px]"
                          />
                        </div>
                        <p>{currency}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-[200px] h-[35px] group">
                <div className="relative w-[100%] h-full border-[1px] border-solid border-[#888888] rounded-[20px] flex items-center">
                  <input
                    type="number"
                    value={inputFields.tradePrice}
                    onChange={(e) =>
                      setInputFields((prev) => ({
                        ...prev,
                        tradePrice: e.target.value,
                      }))
                    }
                    placeholder="Buy amount"
                    className="w-[70%] pl-[10px] font-nekstlight h-full bg-[#2f2f2f] bg-opacity-0  rounded-[20px]"
                  />
                  <div className="w-[35%]  h-full flex items-center">
                    <CustomImage
                      width={25}
                      height={25}
                      alt="rub"
                      src={`/pages/p2p-trade/${inputFields.fromCurrency}.png`}
                    ></CustomImage>
                    <p className="font-nekstlight text-[#878787]">
                      {inputFields.fromCurrency}
                    </p>
                    <ul className="absolute invisible opacity-0 left-0 top-[35px] w-full bg-[#232323] rounded-[10px] p-[5px] group-hover:visible group-hover:opacity-100">
                      {["RUB", "USD"].map((currency) => (
                        <li
                          key={currency}
                          className="w-full h-[50px] items-center flex font-nekstmedium hover:bg-[#3c3c3c] rounded-[10px]"
                        >
                          <button
                            className="w-full h-full flex items-center px-[15px]"
                            data-currency={currency}
                            onClick={() => {
                              setInputFields((prev) => ({
                                ...prev,
                                fromCurrency: currency,
                              }));
                            }}
                          >
                            <div className="flex items-center">
                              <CustomImage
                                width={25}
                                height={25}
                                alt={currency}
                                src={`/pages/p2p-trade/${currency.toLowerCase()}.png`}
                                className="mr-[3px]"
                              />
                            </div>
                            <p className="">{currency}</p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative w-[200px] border-solid border-[1px] border-[#888888] rounded-[20px] h-[35px] group flex justify-between">
                <div className="w-[35%] h-full flex items-center  pl-[10px] font-nekstlight text-[#878787] ">
                  <CustomImage
                    width={20}
                    height={20}
                    alt={inputFields.paymentMethods}
                    src={`/pages/p2p-trade/${
                      inputFields.paymentMethods ?? ""
                    }.png`}
                    className="mr-[3px] rounded-[20px]"
                  ></CustomImage>
                  <p>{inputFields.paymentMethods}</p>
                </div>
                <div className="w-[20%] h-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="group-hover:rotate-[180deg] w-[20px] h-[20px] duration-[0.3s]"
                  >
                    <path d="M20.03 15.53a.75.75 0 01-1.06 0L12 8.56l-6.97 6.97a.75.75 0 11-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.751.751 0 010 1.06z"></path>
                  </svg>
                </div>
                <ul className="absolute invisible opacity-0 top-[35px] w-full bg-[#232323] rounded-[10px] p-[5px] group-hover:visible group-hover:opacity-100">
                  {["Tinkoff", "Sberbank"].map((method) => (
                    <li
                      key={method}
                      className="w-full h-[50px] items-center flex font-nekstmedium hover:bg-[#3c3c3c] rounded-[10px]"
                    >
                      <button
                        className="w-full h-full flex items-center px-[15px]"
                        onClick={() => {
                          setInputFields((prev) => ({
                            ...prev,
                            paymentMethods: method,
                          }));
                        }}
                      >
                        <div className="flex items-center">
                          <CustomImage
                            width={20}
                            height={20}
                            alt={method}
                            src={`/pages/p2p-trade/${method.toLowerCase()}.png`}
                            className="mr-[3px] rounded-[20px]"
                          />
                        </div>
                        <p>{method}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div></div>
            </div>
          </div>
          <div className="mt-[20px] w-full min-h-[100px]">
            <div className="grid grid-cols-[3fr_1fr_2fr_1fr_1fr] w-full font-nekstregular text-[#9d9d9d] border-y-[1px] border-solid border-[#444444] py-[12px]  ">
              <div>Merchants(Trades | Complection rate) </div>
              <div>Price</div>
              <div>Amount/Limit</div>
              <div>Payment methods</div>
              <div className="text-end">Action</div>
            </div>
            {tradebook
              .filter(
                (trade) =>
                  trade.paymentMethod === inputFields.paymentMethods &&
                  trade.fromCurrency === inputFields.fromCurrency &&
                  trade.toCurrency === inputFields.toCurrency &&
                  trade.type === inputFields.tradeType &&
                  Number(trade.price) >= Number(inputFields.tradePrice)
              )
              .map((user, index) => (
                <div
                  className="grid grid-cols-[3fr_1fr_2fr_1fr_1fr] w-full h-[100px] font-nekstregular px-[20px] hover:bg-[#333333]"
                  key={index}
                >
                  <div className="flex items-center ">
                    <div className="bg-[#1652ea] bg-opacity-30 w-[40px] h-[40px] rounded-[20px] mr-[10px] shrink-0 flex items-center justify-center">
                      <p className="font-nekstmedium text-[#b5b1ff]">
                        {user.email.slice(0, 1).toUpperCase()}
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="font-nekstmedium text-[20px] mb-[2px]">
                        {user.email}
                      </p>
                      <p className="text-[#9d9d9d] mb-[3px]">
                        30-day trades:{user.trades30d} | Completion rate{" "}
                        {user.rate}%
                      </p>
                      <div className="flex text-[#9d9d9d]">
                        <p>Online 3 hour(s) ago |</p>
                        <div>Like</div>
                      </div>
                    </div>
                  </div>
                  <div className="font-nekstmedium text-[20px] flex items-center">
                    {user.price} {user.fromCurrency}
                  </div>
                  <div className="text-[16px] flex flex-wrap items-center">
                    <div className="flex ">
                      <div className=" font-nekstlight text-[#9d9d9d] space-y-[5px]">
                        <div>Amount</div>
                        <div>Limit</div>
                      </div>
                      <div className="ml-[10px] space-y-[5px]">
                        <div className="font-nekstlight">
                          {user.amount} USDT
                        </div>
                        <div className="font-nekstlight">
                          {user.limit[0]}-{user.limit[1]} USD
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <CustomImage
                      width={20}
                      height={20}
                      alt="s"
                      src={`/pages/p2p-trade/${user.paymentMethod}.png`}
                      className="mr-[3px] rounded-[20px]"
                    />
                  </div>
                  <div className="flex justify-end items-center">
                    <button
                      className={`w-[100px] h-[35px]  rounded-[20px] font-extrabold text-[16px] ${
                        inputFields.tradeType === "BUY"
                          ? "bg-[#31e2a4]"
                          : "bg-red-500"
                      } `}
                    >
                      {inputFields.tradeType[0] +
                        inputFields.tradeType.slice(1).toLowerCase()}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
