"use client";
import React, { useState } from "react";
import CustomImage from "../components/ui/CustomImage";
import HeaderNav from "../components/common/HeaderNav";
import Asset from "./Asset";
import { Eye } from "lucide-react";
import Chart from "./Chart";

export default function Page() {
  const [settingsButton, setSettingsButton] = useState(1);
  const portfolioData = [
    { name: "Spot", value: 2500, color: "#56edb5" },
    { name: "Futures", value: 3000, color: "#3498db" },
    { name: "Margin", value: 550, color: "#ffcc00" },
    {
      name: "Futures copy trading",
      value: 100,
      color: "#ff4141",
    },
  ];
  return (
    <div className="w-full bg-opacity-10 pl-[50px]">
      <div className="w-full ">
        <div className="flex items-center justify-between max-w-[100%]">
          <p className="text-[40px] font-nekstmedium inline-block">Assets</p>
          <div className="space-x-[15px] ">
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

        <div className="mt-[13px]">
          <p className="text-[45px] font-nekstsemibold">0.00 BTC</p>
          <p className="text-[20px] font-nekstmedium text-[#6a6a6a] ">
            ≈ 0.00 USD
          </p>
        </div>

        <div className="mt-[100px]">
          <p className="text-[25px] font-nekstregular mb-[20px]">Account</p>
          <ul className="flex space-x-[10px] /bg-[#56edb5]">
            <li className="flex-1 h-[160px] border-[1px] border-solid border-[#2c2c2c] rounded-[15px] hover:shadow-[0px_4px_8px_rgba(66,66,66,0.5)] p-[25px]">
              <CustomImage
                width={40}
                height={40}
                src="/pages/UserPage/spot.svg"
                alt="spot"
              ></CustomImage>
              <p className="text-[25px] font-nekstmedium mt-[3px]">Spot</p>
              <p className="text-[20px] font-nekstregular mt-[7px]">0.00 BTC</p>
              <p className="text-[14px] font-nekstregular text-[#6a6a6a] mt-[5px]">
                ≈ 0.00 USD
              </p>
            </li>
            <li className="h-[160px] border-[1px] border-solid border-[#2c2c2c] rounded-[15px] hover:shadow-[0px_4px_8px_rgba(66,66,66,0.5)] p-[25px] flex-1">
              <CustomImage
                width={40}
                height={40}
                src="/pages/UserPage/margin.svg"
                alt="spot"
              ></CustomImage>
              <p className="text-[25px] font-nekstmedium mt-[3px]">Margin</p>
              <p className="text-[20px] font-nekstregular mt-[7px]">0.00 BTC</p>
              <p className="text-[14px] font-nekstregular text-[#6a6a6a] mt-[5px]">
                ≈ 0.00 USD
              </p>
            </li>
            <li className="h-[160px] border-[1px] border-solid border-[#2c2c2c] rounded-[15px] hover:shadow-[0px_4px_8px_rgba(66,66,66,0.5)] p-[25px] flex-1">
              <CustomImage
                width={40}
                height={40}
                src="/pages/UserPage/futures.svg"
                alt="spot"
              ></CustomImage>
              <p className="text-[25px] font-nekstmedium mt-[3px]">Futures</p>
              <p className="text-[20px] font-nekstregular mt-[7px]">0.00 BTC</p>
              <p className="text-[14px] font-nekstregular text-[#6a6a6a] mt-[5px]">
                ≈ 0.00 USD
              </p>
            </li>
            <li className="h-[160px] border-[1px] border-solid border-[#2c2c2c] rounded-[15px] hover:shadow-[0px_4px_8px_rgba(66,66,66,0.5)] p-[25px] flex-1 min-w-[10px]">
              <CustomImage
                width={40}
                height={40}
                src="/pages/UserPage/spot.svg"
                alt="spot"
              ></CustomImage>
              <p className="text-[25px] font-nekstmedium mt-[3px] truncate">
                Futures copy trading
              </p>
              <p className="text-[20px] font-nekstregular mt-[7px]">0.00 BTC</p>
              <p className="text-[14px] font-nekstregular text-[#6a6a6a] mt-[5px]">
                ≈ 0.00 USD
              </p>
            </li>
          </ul>
          <div className="mt-[50px] flex items-center justify-between gap-[10px]">
            <div className="flex-1 h-[350px] border-[1px] border-solid border-[#2c2c2c] rounded-[15px] ">
              <div className="p-[35px]">
                <p className="font-nekstmedium  text-[25px] mb-[20px]">
                  Asset allocation
                </p>
                <div className="w-full h-[200px] rounded-full bg-[#631919]">
                  <div className="flex w-full items-center justify-center bg-[#161616]">
                    <Chart data={portfolioData} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 h-[350px] border-[1px] border-solid border-[#2c2c2c] rounded-[15px]  ">
              <div className="p-[35px] w-full h-full ">
                <div className="w-full h-full ">
                  <p className="font-nekstmedium text-[25px]">
                    Recent activity
                  </p>
                  <div className="w-full h-full flex items-center justify-center ">
                    <p className="font-nekstmedium text-[25px]">
                      you have not performed any activities yet...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
