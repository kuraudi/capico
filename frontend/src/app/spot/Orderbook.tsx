import React from "react";
import { TypeCoinInfo } from "../GlobalContext";
import { InputFieldsType } from "./page";

export default function Orderbook({
  selectedCoin,
  orderbook,
  setInputFields,
}: {
  selectedCoin: [string, TypeCoinInfo];
  orderbook: {
    orderbook_buy: [string, string][];
    orderbook_sell: [string, string][];
  };
  setInputFields: React.Dispatch<React.SetStateAction<InputFieldsType>>;
}) {
  return (
    <div className="w-full h-full ">
      <div className="grid grid-cols-3 mb-[10px]">
        <div className="text-[#8a8888] text-[13px] font-nekstregular">
          Price(USDT)
        </div>
        <div className="text-[#8a8888] text-[13px] font-nekstregular">
          Quantity({selectedCoin?.[0] || "0"})
        </div>
        <div className="flex justify-end text-[#8a8888] text-[13px] font-nekstregular">
          Total
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="w-full h-[40%] overflow-hidden group-sell flex flex-col space-y-[2px]">
          <style>
            {`
.group-sell > div:hover,
.group-sell > div:hover ~ div {
background-color: rgba(255, 0, 0, 0.3);
}
`}
          </style>

          {orderbook.orderbook_sell.map((el, index) => (
            <div
              key={index}
              className="grid grid-cols-3 text-[15px] py-[5px] px-[3px] hover:bg-opacity-30 cursor-pointer"
              onClick={() =>
                setInputFields((prev) => ({
                  ...prev,
                  spot: {
                    ...prev.spot,
                    price: String(orderbook.orderbook_sell[index][0]),
                  },
                }))
              }
            >
              <div className=" text-red-500 font-nekstregular ">
                {Number(orderbook.orderbook_sell[index][0]).toFixed(4) || "0"}
              </div>
              <div className=" font-nekstregular ">
                {Number(orderbook.orderbook_sell[index][1]).toFixed(3) || "0"}
              </div>
              <div className="flex justify-end  font-nekstregular ">
                {(
                  Number(orderbook.orderbook_sell[index][0]) *
                  Number(orderbook.orderbook_sell[index][1])
                ).toFixed(4)}
              </div>
            </div>
          ))}
        </div>

        <span className="w-full h-[8%] flex j items-center pl-[3px] font-nekstmedium text-[20px]">
          <p
            className="cursor-pointer"
            onClick={() =>
              setInputFields((prev) => ({
                ...prev,
                spot: {
                  ...prev.spot,
                  price: String(selectedCoin?.[1]?.price),
                },
              }))
            }
          >
            {selectedCoin?.[1]?.price || "0"}
          </p>
        </span>
        <div className="w-full h-[40%] overflow-hidden group-buy space-y-[2px] ">
          <style>
            {`
.group-buy > div:hover,
.group-buy > div:hover ~ div {
  background-color: transparent;
}

.group-buy > div:hover,
.group-buy > div:nth-child(n):has(~ div:hover) {
  background-color: rgba(65, 189, 71, 0.3);
}
`}
          </style>

          {orderbook.orderbook_buy.map((el, index) => (
            <div
              key={index}
              className="grid grid-cols-3 text-[15px] py-[5px] px-[3px] hover:bg-opacity-30  cursor-pointer "
              onClick={() =>
                setInputFields((prev) => ({
                  ...prev,
                  spot: {
                    ...prev.spot,
                    price: String(orderbook.orderbook_buy[index][0]),
                  },
                }))
              }
            >
              <div className=" text-green-500 font-nekstregular ">
                {Number(orderbook.orderbook_buy[index][0]).toFixed(4) || "0"}
              </div>
              <div className=" font-nekstregular ">
                {Number(orderbook.orderbook_buy[index][1]).toFixed(4) || "0"}
              </div>
              <div className="flex justify-end  font-nekstregular ">
                {(
                  Number(orderbook.orderbook_buy[index][0]) *
                  Number(orderbook.orderbook_buy[index][1])
                ).toFixed(4)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
