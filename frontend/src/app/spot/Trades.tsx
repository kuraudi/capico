import React from "react";
import { TypeCoinInfo } from "../GlobalContext";

type TypeOrderbookHistory = {
  price: string;
  size: string;
  side: string;
  time: string;
};

export default function Trades({
  selectedCoin,
  orderbookHistory,
}: {
  selectedCoin: [string, TypeCoinInfo] | null;
  orderbookHistory: TypeOrderbookHistory[];
}) {
  return (
    <div className="flex-1 flex w-full  overflow-hidden mb-[10px] ">
      <div className="w-full h-full ">
        <div className="grid grid-cols-3 mb-[10px]">
          <div className="text-[#8a8888] text-[13px] font-nekstregular">
            Price(USDT)
          </div>
          <div className="text-[#8a8888] text-[13px] font-nekstregular">
            Quantity({selectedCoin?.[0] || "0"})
          </div>
          <div className="flex justify-end text-[#8a8888] text-[13px] font-nekstregular">
            Time
          </div>
        </div>
        <div className="w-full h-full ">
          {orderbookHistory.map((el, index) => (
            <div
              key={index}
              className="grid grid-cols-3 text-[15px] py-[5px] px-[3px] hover:bg-opacity-30"
            >
              <div
                className={` ${
                  el?.side === "Buy" ? "text-green-500" : "text-red-500"
                } font-nekstregular `}
              >
                {el?.price || "0"}
              </div>
              <div className=" font-nekstregular ">{el?.size || "0"}</div>
              <div className="flex justify-end  font-nekstregular ">
                {" "}
                {new Date(Number(el?.time)).toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
