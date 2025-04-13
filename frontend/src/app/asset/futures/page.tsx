import React from "react";

export default function Page() {
  return (
    <div className="w-full min-h-[1000px] pl-[50px]">
      <p className="font-nekstregular text-[14px]">
        Capico / Assets / Futures account
      </p>
      <div className="mt-[20px] flex items-center justify-between">
        <p className="font-nekstmedium text-[40px]">Futures account</p>
        <div className="space-x-[15px] pr-[30px]">
          <button className="text-[18px] font-nekstregular bg-white p-[13px] text-black rounded-[20px] hover:bg-[#e3e2e2]">
            Trade
          </button>
          <button className="text-[18px] font-nekstregular bg-[#1a1a1a] border-[1px] border-solid border-[#323131] hover:bg-[#252525] p-[13px]  rounded-[20px]">
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
