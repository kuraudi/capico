"use client";
import React, { useState } from "react";
import CustomImage from "../components/ui/CustomImage";
import HeaderNav from "../components/common/HeaderNav";
import Asset from "./Asset";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AssetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = usePathname();
  console.log("aaa", location);
  const [settingsButton, setSettingsButton] = useState(location);

  return (
    <div className="wrapper !bg-[#161616]">
      <div className="w-full bg-[#161616] overflow-hidden">
        <HeaderNav></HeaderNav>
        <div className="container">
          <div className="mt-[50px] px-[0%] text-white max-h-[10000px] flex">
            <div className="text-[20px] h-[600px] font-nekstregular border-r-[1px] border-opacity-0 border-solid inline-block border-[#393939] hover:border-opacity-100 pl-[30px]">
              <ul className="space-y-[10px] pr-[5px]">
                <li>
                  <Link href="/asset/">
                    <button
                      className={`flex items-center  border-[1px] border-opacity-0 hover:border-opacity-100 border-solid border-[#2b2b2b] w-[220px] h-[45px] rounded-[13px] bg-opacity-70 ${
                        settingsButton === "/asset" ? "bg-[#393939]" : ""
                      } pl-[20px]`}
                      onClick={() => setSettingsButton("/asset")}
                    >
                      <CustomImage
                        src="/pages/UserPage/flex-item-1.svg"
                        width={25}
                        height={25}
                        alt="spot"
                        className="invert mr-[7px]"
                      ></CustomImage>
                      <p className="w-full truncate text-start">Assets</p>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/asset/spot/">
                    <button
                      className={`flex items-center  border-[1px] border-opacity-0 hover:border-opacity-100 border-solid border-[#2b2b2b] w-[220px] h-[45px] rounded-[13px] bg-opacity-70 ${
                        settingsButton === "/asset/spot" ? "bg-[#393939]" : ""
                      } pl-[20px]`}
                      onClick={() => setSettingsButton("/asset/spot")}
                    >
                      <CustomImage
                        src="/pages/UserPage/flex-item-2.svg"
                        width={25}
                        height={25}
                        alt="spot"
                        className="invert mr-[7px]"
                      ></CustomImage>
                      <p className="w-full truncate text-start">Spot</p>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/asset/margin/">
                    <button
                      className={`flex items-center  border-[1px] border-opacity-0 hover:border-opacity-100 border-solid border-[#2b2b2b] w-[220px] h-[45px] rounded-[13px] bg-opacity-70 ${
                        settingsButton === "/asset/margin" ? "bg-[#393939]" : ""
                      } pl-[20px]`}
                      onClick={() => setSettingsButton("/asset/margin")}
                    >
                      <CustomImage
                        src="/pages/UserPage/flex-item-3.svg"
                        width={25}
                        height={25}
                        alt="spot"
                        className="invert mr-[7px]"
                      ></CustomImage>
                      <p className="w-full truncate text-start">Margin</p>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/asset/futures/">
                    <button
                      className={`flex items-center  border-[1px] border-opacity-0 hover:border-opacity-100 border-solid border-[#2b2b2b] w-[220px] h-[45px] rounded-[13px] bg-opacity-70 ${
                        settingsButton === "/asset/futures"
                          ? "bg-[#393939]"
                          : ""
                      } pl-[20px]`}
                      onClick={() => setSettingsButton("/asset/futures")}
                    >
                      <CustomImage
                        src="/pages/UserPage/flex-item-4.svg"
                        width={25}
                        height={25}
                        alt="spot"
                        className="invert mr-[7px]"
                      ></CustomImage>
                      <p className="w-full truncate text-start">Futures</p>
                    </button>
                  </Link>
                </li>
                <li>
                  <button
                    className={`flex items-center  border-[1px] border-opacity-0 hover:border-opacity-100 border-solid border-[#2b2b2b] w-[220px] h-[45px] rounded-[13px] bg-opacity-70 ${
                      settingsButton === 5 ? "bg-[#393939]" : ""
                    } pl-[20px]`}
                    onClick={() => setSettingsButton(5)}
                  >
                    <CustomImage
                      src="/pages/UserPage/flex-item-5.svg"
                      width={25}
                      height={25}
                      alt="spot"
                      className="invert mr-[7px]"
                    ></CustomImage>
                    <p className="w-full truncate text-start">
                      Futures copy trading
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center  border-[1px] border-opacity-0 hover:border-opacity-100 border-solid border-[#2b2b2b] w-[220px] h-[45px] rounded-[13px] bg-opacity-70 ${
                      settingsButton === 6 ? "bg-[#393939]" : ""
                    } pl-[20px]`}
                    onClick={() => setSettingsButton(6)}
                  >
                    <CustomImage
                      src="/pages/UserPage/flex-item-6.svg"
                      width={25}
                      height={25}
                      alt="spot"
                      className="invert mr-[7px]"
                    ></CustomImage>
                    <p className="w-full truncate text-start">Bots</p>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center  border-[1px] border-opacity-0 hover:border-opacity-100 border-solid border-[#2b2b2b] w-[220px] h-[45px] rounded-[13px] bg-opacity-70 ${
                      settingsButton === 7 ? "bg-[#393939]" : ""
                    } pl-[20px]`}
                    onClick={() => setSettingsButton(7)}
                  >
                    <CustomImage
                      src="/pages/UserPage/flex-item-7.svg"
                      width={25}
                      height={25}
                      alt="spot"
                      className="invert mr-[7px]"
                    ></CustomImage>
                    <p className="w-full truncate text-start">Earn</p>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center  border-[1px] border-opacity-0 hover:border-opacity-100 border-solid border-[#2b2b2b] w-[220px] h-[45px] rounded-[13px] bg-opacity-70 ${
                      settingsButton === 8 ? "bg-[#393939]" : ""
                    } pl-[20px]`}
                    onClick={() => setSettingsButton(8)}
                  >
                    <CustomImage
                      src="/pages/UserPage/flex-item-8.svg"
                      width={25}
                      height={25}
                      alt="spot"
                      className="invert mr-[7px]"
                    ></CustomImage>
                    <p className="w-full truncate text-start">OTC</p>
                  </button>
                </li>
              </ul>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
