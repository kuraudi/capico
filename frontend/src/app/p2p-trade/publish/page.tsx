"use client";
import React, { useEffect, useState } from "react";
import HeaderNav from "@/app/components/common/HeaderNav";
import CustomImage from "@/app/components/ui/CustomImage";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  const [inputFields, setInputFields] = useState({
    fromCurrency: "RUB",
    toCurrency: "USDT",
    price: "",
    amount: "",
    minLimit: "",
    maxLimit: "",
    paymentMethod: "",
    tradeType: "BUY",
    error: "",
    welcomeMessage: "",
  });
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/market/payment-methods"
      );
      setPaymentMethods(data);
    };
    fetchPaymentMethods();
  }, [setPaymentMethods]);

  const fetchTradeInfo = async (e) => {
    e.preventDefault();
    const fetchTotalBalance = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/market/test", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        console.log(data);
        return data.total_balance;
      } catch (error) {
        console.error("Ошибка при получении баланса:", error);
      }
    };
    console.log(inputFields.tradeType);
    let TotalBalance = 0;
    if (inputFields.tradeType === "SELL") {
      TotalBalance = await fetchTotalBalance();
      console.log(TotalBalance);
    }

    if (!inputFields.paymentMethod) {
      e.preventDefault();
      setInputFields((prev) => ({
        ...prev,
        error: "Please select a payment method.",
      }));
      return;
    } else if (
      inputFields.tradeType === "SELL" &&
      Number(inputFields.amount) > TotalBalance
    ) {
      e.preventDefault();

      setInputFields((prev) => ({
        ...prev,
        error: "The amount exceeds your available balance.",
      }));
      return;
    } else {
      e.preventDefault();
      setInputFields((prev) => ({
        ...prev,
        error: "Successful",
      }));
    }

    const token = localStorage.getItem("access");

    try {
      axios.post(
        "http://127.0.0.1:8000/market/p2p-trade/add",
        {
          fromCurrency: inputFields.fromCurrency,
          toCurrency: inputFields.toCurrency,
          price: inputFields.price,
          amount: inputFields.amount,
          limit_min: inputFields.minLimit,
          limit_max: inputFields.maxLimit,
          payment_method: inputFields.paymentMethod,
          trade_type: inputFields.tradeType,
          welcome_message: inputFields.welcomeMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer токен в заголовке
            "Content-Type": "application/json", // Укажите тип данных, если отправляете JSON
          },
        }
      );
    } catch (error) {
      console.error("Error: ", error);
    }
    router.push("/p2p-trade");
  };

  return (
    <div className="wrapper ">
      <HeaderNav></HeaderNav>
      <div className="flex w-full min-h-full bg-[#1b1b1b] pt-[30px] font-nekstmedium ">
        <div className="w-[20%] h-[100%]"></div>
        <div className="w-[80%] h-[100%]">
          <div className="w-full font-nekstregular">
            <Link href={"/"}>Capico</Link> /{" "}
            <Link href={"/p2p-trade"}>P2P trading </Link>/{" "}
            <Link href={"/p2p-trade/publish"}>Post an ad </Link>
          </div>
          <div className="flex justify-between w-[95%] mt-[15px]">
            <p className="text-[34px] ">Post an ad</p>
            <Link href="/p2p-trade">
              <button className="text-[22px] text-black bg-white py-[4px] px-[30px] rounded-[20px]">
                Back
              </button>
            </Link>
          </div>
          <div className="w-full">
            <form onSubmit={(e) => fetchTradeInfo(e)}>
              <div className="flex mt-[40px] border-b-[1px] border-solid border-[#333]">
                <button
                  className={`pb-[10px] text-[20px] border-b-[2px] border-solid duration-[0.3s] border-white ${
                    inputFields.tradeType !== "BUY" &&
                    "border-opacity-0 text-[#454545]"
                  } mr-[10px]`}
                  onClick={() =>
                    setInputFields((prev) => ({ ...prev, tradeType: "BUY" }))
                  }
                >
                  I want to buy
                </button>
                <button
                  className={`pb-[10px] text-[20px] border-b-[2px] border-solid border-white mr-[10px] ${
                    inputFields.tradeType !== "SELL" &&
                    "border-opacity-0 text-[#454545]"
                  } duration-[0.3s]`}
                  onClick={() =>
                    setInputFields((prev) => ({ ...prev, tradeType: "SELL" }))
                  }
                >
                  I want to sell
                </button>
              </div>
              <div>
                {inputFields.error && (
                  <p
                    className={`font-nekstmedium ${
                      inputFields.error === "Successful"
                        ? "text-green-500"
                        : "text-red-500"
                    } mt-[7px]`}
                  >
                    {inputFields.error !== null && inputFields.error}
                  </p>
                )}
                <div className="grid grid-rows-2  grid-cols-2 grid-flow-col max-w-[70%] font-nekstlight mt-[10px] gap-y-[20px] gap-x-[30px] ">
                  <div className="">
                    <label
                      htmlFor="font"
                      className="text-[16px] inline-block mb-[10px]"
                    >
                      Crypto
                    </label>
                    <div className="relative w-[100%] group h-[40px] ">
                      <label
                        htmlFor="dropdownToggle"
                        className="text-white"
                      ></label>
                      <div className="pr-[10px] h-full  w-full rounded-[20px] cursor-pointer border-[1px] border-solid flex items-center border-[#414141] group-hover group-hover:border-[#b5b5b5] duration-[0.3s]">
                        <div className="w-[90%] h-full flex items-center pl-[15px]">
                          <CustomImage
                            width={20}
                            height={20}
                            alt="arrow"
                            src={`/pages/p2p-trade/${inputFields.toCurrency}.png`}
                          />
                          <p className="ml-[5px]">{inputFields.toCurrency}</p>
                        </div>
                        <div className="w-[10%] flex justify-end">
                          <CustomImage
                            width={20}
                            height={20}
                            alt="arrow"
                            src="/pages/p2p-trade/arrow.svg"
                            className="invert transition-transform duration-300 group-hover:rotate-[180deg]"
                          />
                        </div>
                      </div>
                      <div className="absolute left-0 top-[33px]   mt-2 w-[100%] bg-[#212121] rounded-lg  group-hover:opacity-100 opacity-0 duration-300 justify-center flex flex-wrap scale-y-[50%] p-[8px] group-hover:scale-y-[100%] origin-top z-10 pointer-events-none group-hover:pointer-events-auto">
                        {["USDT", "USDC", "BTC"].map((coin, index) => (
                          <button
                            key={index}
                            type="button"
                            className="w-[100%] py-[15px] hover:bg-[#444] rounded-[5px] flex"
                            onClick={() =>
                              setInputFields((prev) => ({
                                ...prev,
                                toCurrency: coin,
                              }))
                            }
                          >
                            <div className="w-[22%] flex items-center justify-start pl-[10px]">
                              <CustomImage
                                width={20}
                                height={20}
                                alt={`${coin}`}
                                src={`/pages/p2p-trade/${coin}.png`}
                              ></CustomImage>
                              <p className="font-nekstmedium ml-[7px]">
                                {coin}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <label
                      htmlFor="font"
                      className="text-[16px] inline-block mb-[10px]"
                    >
                      Price
                    </label>
                    <div className="relative w-[100%] group h-[40px] ">
                      <label
                        htmlFor="dropdownToggle"
                        className="text-white"
                      ></label>

                      <div className="pr-[10px] h-full  w-full rounded-[20px] border-[1px] border-solid flex items-center border-[#414141] duration-[0.3s]">
                        <input
                          type="number"
                          required={true}
                          className="font-nekstmedium w-[85%] pl-[15px] h-full bg-white  text-[18px] bg-opacity-0 "
                          value={inputFields.price}
                          onChange={(e) =>
                            setInputFields((prev) => ({
                              ...prev,
                              price: e.target.value,
                            }))
                          }
                        ></input>
                        <div className="font-nekstmedium w-[15%]">
                          {inputFields.fromCurrency}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <label
                      htmlFor="font"
                      className="text-[16px] inline-block mb-[10px]"
                    >
                      Fiat
                    </label>
                    <div className="relative w-[100%] group h-[40px] ">
                      <label
                        htmlFor="dropdownToggle"
                        className="text-white"
                      ></label>
                      <div className="pr-[10px] h-full  w-full rounded-[20px] cursor-pointer border-[1px] border-solid flex items-center border-[#414141] group-hover group-hover:border-[#b5b5b5] duration-[0.3s] ">
                        <div className="w-[90%] h-full flex items-center pl-[15px]">
                          <CustomImage
                            width={20}
                            height={20}
                            alt="arrow"
                            src={`/pages/p2p-trade/${inputFields.fromCurrency}.png`}
                          />
                          <p className="ml-[5px]">{inputFields.fromCurrency}</p>
                        </div>
                        <div className="w-[10%] flex justify-end">
                          <CustomImage
                            width={20}
                            height={20}
                            alt="arrow"
                            src="/pages/p2p-trade/arrow.svg"
                            className="invert transition-transform duration-300 group-hover:rotate-[180deg]"
                          />
                        </div>
                      </div>
                      <div className="absolute left-0 top-[33px]   mt-2 w-[100%] bg-[#212121] rounded-lg  group-hover:opacity-100 opacity-0 duration-300 justify-center flex flex-wrap scale-y-[50%] p-[8px] group-hover:scale-y-[100%] origin-top z-10 pointer-events-none group-hover:pointer-events-auto">
                        {["USD", "RUB"].map((coin, index) => (
                          <button
                            key={index}
                            type="button"
                            className="w-[100%] py-[15px] hover:bg-[#444] rounded-[5px] flex"
                            onClick={() =>
                              setInputFields((prev) => ({
                                ...prev,
                                fromCurrency: coin,
                              }))
                            }
                          >
                            <div className="w-[22%] flex items-center justify-start pl-[10px]">
                              <CustomImage
                                width={20}
                                height={20}
                                alt={`${coin}`}
                                src={`/pages/p2p-trade/${coin}.png`}
                              ></CustomImage>
                              <p className="font-nekstmedium ml-[7px]">
                                {coin}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-rows-2  grid-cols-1 gap-x-[30px] gap-y-[10px]  grid-flow-row max-w-[70%] font-nekstlight mt-[30px] ">
                  <div className="">
                    <div className="">
                      <label
                        htmlFor="font"
                        className="text-[16px] inline-block mb-[10px]"
                      >
                        Order limit
                      </label>
                      <div className="flex gap-x-[10px] items-center">
                        <div className="flex-1">
                          <div className="pr-[10px] h-[40px]  w-full rounded-[20px] border-[1px] border-solid flex items-center border-[#414141] group-hover ">
                            <input
                              type="number"
                              required={true}
                              className="font-nekstmedium w-[85%] pl-[15px] h-full bg-white text-[18px] bg-opacity-0"
                              value={inputFields.maxLimit}
                              onChange={(e) =>
                                setInputFields((prev) => ({
                                  ...prev,
                                  maxLimit: e.target.value,
                                }))
                              }
                            ></input>
                            <div className="font-nekstmedium w-[15%]">
                              {inputFields.fromCurrency}
                            </div>
                          </div>
                        </div>
                        <div className="font-nekstlight text-[#7e7e7e]">-</div>
                        <div className=" flex-1 relative w-[100%] group h-[40px] ">
                          <label
                            htmlFor="dropdownToggle"
                            className="text-white"
                          ></label>
                          <div className="pr-[10px] h-full  w-[100%] rounded-[20px] border-[1px] border-solid flex items-center border-[#414141] group-hover ">
                            <input
                              type="number"
                              required={true}
                              className="font-nekstmedium w-[85%] pl-[15px] h-full bg-white text-[18px] bg-opacity-0"
                              value={inputFields.minLimit}
                              onChange={(e) =>
                                setInputFields((prev) => ({
                                  ...prev,
                                  minLimit: e.target.value,
                                }))
                              }
                            ></input>
                            <div className="font-nekstmedium w-[15%]">
                              {inputFields.fromCurrency}
                            </div>
                          </div>
                          {/* <div className="text-[#717171] font-extrabold">-</div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <label
                      htmlFor="font"
                      className="text-[16px] inline-block mb-[10px]"
                    >
                      Amount
                    </label>
                    <div className="flex gap-x-[30px] ">
                      <div className="relative flex-1 group h-[40px] ">
                        <label
                          htmlFor="dropdownToggle"
                          className="text-white"
                        ></label>

                        <div className="pr-[10px] h-full  w-full rounded-[20px] border-[1px] border-solid flex items-center border-[#414141] duration-[0.3s]">
                          <input
                            type="number"
                            required={true}
                            className="font-nekstmedium w-[85%] pl-[15px] h-full bg-white  text-[18px] bg-opacity-0 "
                            value={inputFields.amount}
                            onChange={(e) =>
                              setInputFields((prev) => ({
                                ...prev,
                                amount: e.target.value,
                              }))
                            }
                          ></input>
                          <div className="font-nekstmedium w-[15%]">
                            {inputFields.toCurrency}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-[30px]">
                  <p className="text-[22px]  mb-[15px]">Payment methods</p>
                  <div className="flex items-center space-x-[10px]">
                    {paymentMethods.map((method, index) => (
                      <button
                        type="button"
                        key={index}
                        className={`px-[30px] py-[10px] rounded-[20px] border-[1px] border-solid  hover:bg-[#323232]  ${
                          inputFields.paymentMethod === method
                            ? "bg-[#383838] border-[#b9b9b9]"
                            : "border-[#3c3c3c]"
                        } duration-[0.3s] `}
                        onClick={() =>
                          setInputFields((prev) => ({
                            ...prev,
                            paymentMethod: method,
                          }))
                        }
                      >
                        <div className="flex items-center">
                          <CustomImage
                            src={`/pages/p2p-trade/${method}.png`}
                            width={20}
                            height={20}
                            alt={method}
                            className="rounded-[20px]"
                          ></CustomImage>
                          <p className="ml-[5px]">{method}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-[20px]">
                  <p className="mb-[10px]">Welcome message(optional)</p>
                  <div className="w-[35%] h-[130px] border-[1px] border-solid rounded-[12px] border-[#303030] p-[10px] ">
                    <textarea
                      className="w-full h-full bg-black bg-opacity-0 align-text-top resize-none text-[16px] placeholder:text-[#414141]"
                      placeholder="Auto-send message once users place an order"
                      value={inputFields.welcomeMessage}
                      onChange={(e) =>
                        setInputFields((prev) => ({
                          ...prev,
                          welcomeMessage: e.target.value,
                        }))
                      }
                      maxLength={500}
                    />
                  </div>
                </div>
                <button className="w-[35%] rounded-[20px] h-[45px] border-[1px] border-[#3d3d3d] border-solid bg-white mt-[25px] text-black text-[22px]">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
