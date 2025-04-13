"use client";
import React from "react";
import CustomImage from "@/app/components/ui/CustomImage";
import { Eye } from "lucide-react";
import { useGlobalContext } from "@/app/GlobalContext";

export default function Page() {
  const { userCoinsBalances } = useGlobalContext();

  return (
    <div className="w-full h-full pl-[50px]">
      <div>
        <div className="flex items-center justify-between max-w-[100%]">
          <p className="text-[40px] font-nekstmedium inline-block">
            Spot account
          </p>
          <div className="space-x-[15px] pr-[30px]">
            <button className="text-[18px] font-nekstregular bg-white p-[13px] text-black rounded-[20px] hover:bg-[#e3e2e2]">
              Deposit
            </button>
            <button className="text-[18px] font-nekstregular bg-[#1a1a1a] border-[1px] border-solid border-[#323131] hover:bg-[#252525] p-[13px]  rounded-[20px]">
              Buy crypto
            </button>
            <button className="text-[18px] font-nekstregular bg-[#1a1a1a] border-[1px] border-solid border-[#323131] hover:bg-[#252525] p-[13px]  rounded-[20px]">
              Withdrawal
            </button>
            <button className="text-[18px] font-nekstregular bg-[#1a1a1a] border-[1px] border-solid border-[#323131] hover:bg-[#252525] p-[13px]  rounded-[20px]">
              Transfer
            </button>
          </div>
        </div>
        <button className="flex mt-[25px]">
          <p className="text-[#5e5e5e] font-nekstregular border-b-[1px] border-[#959494] inline-block border-dashed">
            Total balance
          </p>
          <Eye className="w-5 h-5 text-gray-500 ml-[5px]" />
        </button>
        <div className="flex max-w-[700px] items-center justify-between">
          <div className="mt-[13px]">
            <p className="text-[45px] font-nekstsemibold">0.00 BTC</p>
            <p className="text-[20px] font-nekstmedium text-[#6a6a6a] ">
              ≈ 0.00 USD
            </p>
          </div>
          <div className="h-full">
            <button>
              <p className="text-[22px] font-nekstmedium mb-[10px]">
                Todays PnL
              </p>
            </button>
            <div>
              <p className="text-[24px] font-nekstsemibold text-red-500">
                0.00 BTC
              </p>
              <p className="text-[18px] font-nekstregular mt-[15px] text-red-500">
                ≈ - 0.01 USD
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[100px]">
        <div className="flex space-x-[20px] text-[22px] font-nekstmedium border-b-[1px] border-solid border-[#2f2f2f]">
          <button className="py-[5px] px-[10px] border-b-[1px] border-[#FFF] border-solid border-opacity-0 focus:border-opacity-100 ">
            Crypto
          </button>
          <button className="py-[5px] px-[10px] border-b-[1px] border-[#FFF] border-solid border-opacity-0 focus:border-opacity-100 ">
            Fiat
          </button>
        </div>
        <div>
          <li className="w-full mt-[50px] py-[5px] grid grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr_3fr] text-center">
            <p className="text-[#4d4d4d] font-nekstregular">Coin</p>
            <p className="text-[#4d4d4d] font-nekstregular">Total balance</p>
            <p className="text-[#4d4d4d] font-nekstregular">Available</p>
            <p className="text-[#4d4d4d] font-nekstregular">Reserved</p>
            <p className="text-[#4d4d4d] font-nekstregular">
              Breakeven price (USDT)
            </p>
            <p className="text-[#4d4d4d] font-nekstregular">Total PnL (USDT)</p>
            <p className="text-[#4d4d4d] font-nekstregular">Actions</p>
          </li>

          <ul className="flex flex-col w-full min-h-[100px]">
            {userCoinsBalances.map((coin, index) => (
              <li
                key={index}
                className="w-full min-h-[70px] py-[5px] grid grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr_3fr] text-center items-center border-b-[1px] border-solid border-[#2f2f2f] hover:bg-[#1f1f1f] rounded-[5px] transition-[0.3s]"
              >
                <div className="flex items-center">
                  <CustomImage
                    src={`${coin.url_logo}`}
                    alt="coin_logo"
                    width={30}
                    height={30}
                    className="mr-[7px]"
                  ></CustomImage>
                  <p className="font-nekstmedium text-[16px]">{coin?.symbol}</p>
                </div>
                <p className="font-nekstmedium text-[16px]">
                  {coin?.total_balance || "0.00"}
                </p>
                <p className="font-nekstmedium text-[16px]">
                  {" "}
                  {coin?.available_balance || "0.00"}
                </p>

                <p className="font-nekstmedium text-[16px]">
                  {" "}
                  {coin?.total_balance || "0.00"}
                </p>
                <p className="font-nekstmedium text-[16px]">
                  {" "}
                  {coin?.breakeven_price || "--"}
                </p>
                <p className="font-nekstmedium text-[16px]">
                  {" "}
                  {coin?.total_pnl || "--"}
                </p>
                <div className="flex gap-2">
                  <button className="font-nekstmedium text-[16px] text-purple-500">
                    Deposit
                  </button>
                  <button className="font-nekstmedium text-[16px] text-purple-500">
                    Buy
                  </button>
                  <button className="font-nekstmedium text-[16px] text-purple-500">
                    Withdrawal
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
