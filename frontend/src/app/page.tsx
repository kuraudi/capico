"use client";
import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import HeaderNav from "./components/common/HeaderNav";
import CustomImage from "./components/ui/CustomImage";
import Link from "next/link";
import { useGlobalContext } from "./GlobalContext";

export default function Page() {
  const { coinPrices } = useGlobalContext();

  return (
    <div className="wrapper">
      <HeaderNav></HeaderNav>
      <header className=" m-auto h-[890px] relative ">
        <div className="relative mt-[0px] w-[1600px] h-[1100px] bg-[url('/pages/mainPage/decorations/bg_mainpage.png')] bg-cover bg-center m-auto ">
          <div className="container">
            <div className="pl-[130px] pr-[130px] text-white">
              <div className="w-[765px] h-[300px] mt-[116px]">
                <p className="text-[102px]  inline-block font-nekstmedium">
                  Crypto trading
                </p>
                <p className="text-[102px] bg-gradient-to-bl from-white/90 to-[#5F29B7] bg-clip-text text-transparent inline-block font-nekstregular tracking-[-2%]">
                  with bots and smart seals
                </p>
                <div className="w-[397px] h-[68px] flex flex-wrap items-center mt-[37px]">
                  <p className="h-[37px] w-[210px] items-center justify-center flex font-nekstregular text-[30px]  rounded-[10px] text-white bg-purple-600">
                    Trade for free
                  </p>
                  <span className="text-[30px] ml-2 font-nekstregular">
                    on your
                  </span>
                  <span className="text-[30px] w-full font-nekstregular after:content-[' '] after:w-[50px] after:h-[15px] after:bg-[url('/pages/SignUpPage/arrow.svg')] after:bg-no-repeat after:inline-block after:ml-[8px]">
                    favorite exchanges
                  </span>
                </div>
              </div>
              <ul className="w-full flex justify-between items-center z-100 mt-[278px] relative">
                <li className="w-[256px] h-[100px] rounded-[30px] bg-[#0E0915] flex justify-center z-20 hover:bg-zinc-900 hover:scale-[1.08] duration-[0.2s]">
                  <CustomImage
                    className=""
                    src="pages/MainPage/exchanges/binance.svg"
                    alt=""
                    width={117}
                    height={24}
                  ></CustomImage>
                </li>
                <li className="w-[256px] h-[100px] rounded-[30px] bg-[#0E0915] flex justify-center z-20 hover:bg-zinc-900 hover:scale-[1.08] duration-[0.2s]">
                  <CustomImage
                    src="pages/MainPage/exchanges/ftx.svg"
                    alt=""
                    width={81}
                    height={20}
                  ></CustomImage>
                </li>
                <li className="w-[256px] h-[100px] rounded-[30px] bg-[#0E0915] flex justify-center z-20 hover:bg-zinc-900 hover:scale-[1.08] duration-[0.2s]">
                  <CustomImage
                    src="pages/MainPage/exchanges/huobi.svg"
                    alt=""
                    width={83}
                    height={25}
                  ></CustomImage>
                </li>
                <li className="w-[256px] h-[100px] rounded-[30px] bg-[#0E0915] flex justify-center z-20 hover:bg-zinc-900 hover:scale-[1.08] duration-[0.2s]">
                  <CustomImage
                    src="pages/MainPage/exchanges/okx.svg"
                    alt=""
                    width={69}
                    height={29}
                  ></CustomImage>
                </li>
                <li className="w-[256px] h-[100px] rounded-[30px] bg-[#0E0915] flex justify-center z-20 hover:bg-zinc-900 hover:scale-[1.08] duration-[0.2s]">
                  <CustomImage
                    src="pages/MainPage/exchanges/bybit.svg"
                    alt=""
                    width={69}
                    height={23}
                  ></CustomImage>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative w-[2500px] h-[100px] m-auto opacity-50 z-1 ">
          <div className="absolute inset-0 top-[-1200px] right-0  bg-[url('/pages/mainPage/decorations/bg_mainpage_light.png')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-black/0 via-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-black/0 via-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-transparent"></div>
        </div>
      </header>
      <main className="w-full min-h-[900px] text-white">
        <div className="container">
          <ul className="w-full h-full">
            <li className="relative mt-[-20px] z-1000 bg-black w-full  h-full rounded-[50px]">
              <div className="flex justify-center items-center">
                <p className="w-[1000px] h-[237px] mt-[93px] text-[70px] bg-gradient-to-r from-white/90 to-[#5F29B7] bg-clip-text text-transparent inline-block font-nekstlight">
                  Manage positions on different exchanges from one window
                </p>
              </div>
              <CustomImage
                className="m-auto"
                alt="slide_1"
                width={1208}
                height={679}
                src="/pages/MainPage/slide1_gadgets.png"
              ></CustomImage>
            </li>
            <li className="w-full h-full ">
              <div className="w-[100%] h-[100%] bg-[url('/pages/mainPage/decorations/bg_mainpage_2.png')] bg-contain bg-no-repeat">
                <div className="relative w-[100%] h-[50px]">
                  <CustomImage
                    width={1550}
                    height={50}
                    alt="slide_line"
                    src="/pages/MainPage/slide_line_bg.svg"
                  ></CustomImage>
                  <p className="absolute top-[14px] left-[17px] font-nekstmedium text-[60px]">
                    numbers
                  </p>
                  <p className="absolute right-[3vw] top-[25px] font-nekstregular text-[15px] text-gray-600">
                    Manage positions on
                  </p>
                </div>
                <p className="font-nekstlight text-[250px] mt-[74px]">
                  $18.5 B+
                </p>
                <p className="font-nekstregular text-[40px] mt-[21px]">
                  Total trading
                </p>
                <p className="font-nekstregular text-[40px]">volume</p>
                <p className="font-nekstregular text-[15px] mt-[281px] text-[#6E647D] w-[120px]">
                  Actual statistic on 19.07.2024
                </p>
                <div className="flex justify-end mt-[120px]">
                  <div className="w-[376px] h-[292px] rounded-[40px] mr-[23px] border-[2px] border-solid border-purple-600 pt-[42px] pl-[30px] pb-[31px]">
                    <p className="font-nekstlight text-[80px]">21.5 K+</p>
                    <p className="inline-block w-[110px]  font-nekstregular text-[20px] mt-[103px]">
                      Traiders in platform
                    </p>
                  </div>
                  <div className="w-[376px] h-[292px] rounded-[40px] mr-[23px] border-[2px] border-solid border-purple-600 pt-[42px] pl-[30px] pb-[31px]">
                    <p className="font-nekstlight text-[80px]">325 M+</p>
                    <p className="inline-block w-[120px]  font-nekstregular text-[20px] mt-[103px]">
                      Total deals in platform
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div>
                <p className="font-nekstmedium text-[80px] ml-[30px] mt-[50px] mb-[15px]">
                  Market Update
                </p>
                <div>
                  <div>
                    <div>
                      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] items-center w-full border-b border-[#272626] py-2">
                        <p className="font-nekstlight text-[20px] pl-[30px]">
                          #
                        </p>
                        <p className="font-nekstlight text-[20px]">Name</p>
                        <p className="font-nekstlight text-[20px]">
                          Last price
                        </p>
                        <p className="font-nekstlight text-[20px]">24h %</p>
                        <p className="font-nekstlight text-[20px]">
                          Turn over 24h
                        </p>
                        <p className="font-nekstlight text-[20px]">Last 24hr</p>
                      </div>
                      <div className="w-full h-[2px] bg-[#6d6d6d]"></div>
                      <ul>
                        {coinPrices.map((coin, index) => (
                          <Link key={index} href={`/market/${coin[0]}`}>
                            <li
                              key={index}
                              className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] items-center w-full border-b-[1px] h-[80px] border-[#1b1b1b] py-4 border-solid hover:bg-[#262626] hover:cursor-pointer"
                            >
                              <p className="font-nekstlight text-[20px] pl-[30px]">
                                {index + 1}
                              </p>
                              <div className="flex items-center">
                                <CustomImage
                                  src={coin[1]?.url_logo}
                                  width={40}
                                  height={40}
                                  alt="coin"
                                ></CustomImage>
                                <p className="font-nekstlight text-[20px] ml-[5px]">
                                  {coin[1]?.name || "0"}
                                </p>
                              </div>
                              <p className="font-nekstlight text-[20px]">
                                ${coin[1]?.price || "0"}
                              </p>
                              <p
                                className={`font-nekstlight text-[20px]
                                ${
                                  (coin[1]?.price24hPcnt ?? 0) >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                }
                              `}
                              >
                                {(coin[1]?.price24hPcnt ?? 0) >= 0 ? "+" : "-"}
                                {((coin[1]?.price24hPcnt ?? 0) > 0 &&
                                  coin[1]?.price24hPcnt) ||
                                  "0"}
                                %
                              </p>
                              <p className="font-nekstlight text-[20px]">
                                ${coin[1]?.turnover24h || "0"}
                              </p>
                              <div className="w-[150px] h-[30px] flex items-center">
                                <CustomImage
                                  width={200}
                                  height={20}
                                  alt="price"
                                  src={`/pages/MainPage/coins/to${
                                    (coin[1]?.price24hPcnt ?? 0) > 0
                                      ? "up"
                                      : "down"
                                  }.svg`}
                                ></CustomImage>
                              </div>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
