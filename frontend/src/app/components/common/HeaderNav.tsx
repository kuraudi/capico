"use client";
import React from "react";
import CustomImage from "../ui/CustomImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "@/app/GlobalContext";

export default function HeaderNav() {
  const { role, totalBalance, userInfo } = useGlobalContext();
  const location = usePathname();

  const userLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div
      className={`px-[20px] w-full relative ${
        location !== "/" && location !== "/signup" ? "bg-[#242424]" : "bg-black"
      } ${
        location !== "/" && location !== "/signup"
          ? "shadow-[0px_5px_20px_#424242]"
          : ""
      }`}
    >
      <div className="w-full h-[70px] text-white flex justify-between items-center ">
        <ul className="flex items-center">
          <li>
            <Link href="/">
              <CustomImage
                src="/common/brandLogo.svg"
                width={205}
                height={42}
                alt="logo"
              ></CustomImage>
            </Link>
          </li>
          <li className="font-nekstlight text-[23px] flex items-center ml-[97px]">
            <p className="mr-[8px]">en</p>
            <CustomImage
              src="/common/HeaderNav/arrow.svg"
              width={14}
              height={7}
              alt="arrow_down"
            ></CustomImage>
          </li>
        </ul>
        <ul
          className={`flex font-nekstmedium text-[24px] space-x-[15px] h-[50px]  items-center ${
            location === "/signup" ? "hidden" : ""
          }`}
        >
          <li className="h-full flex items-center ">
            <div className="mt-[5px] ml-[2px] h-full">
              <div className="relative group z-10 h-full">
                <button className="px-[5px] group transition-all duration-[0.3s] flex items-center group-hover:bg-[#4a4848] h-full rounded-[6px] group-hover:text-[#eca2ff]">
                  buy crypto
                  <CustomImage
                    src="/common/HeaderNav/arrow.svg"
                    width={14}
                    height={3}
                    alt="arrow_down"
                    className="mt-[5px] ml-[3px] group-hover:rotate-[180deg] duration-[0.3s]"
                  />
                </button>
                <div
                  className="absolute right-0 top-full w-[300px] max-h-[1200px] mt-[0px]  bg-opacity-30 border border-gray-200 shadow-lg backdrop-blur-md
    opacity-0 invisible transition-all duration-[0.3s] group-hover:opacity-100 group-hover:visible z-10 flex flex-col items-center  
    pointer-events-none group-hover:pointer-events-auto  rounded-lg scale-y-[50%] group-hover:scale-y-[100%] origin-top"
                  // invisible
                >
                  <div className="w-full h-full bg-[#474646] bg-opacity-30 backdrop-blur-md mt-[15px] flex flex-col items-center pb-[25px] ">
                    <div className="w-full max-h-[500px] mt-[13px]">
                      <div className="flex flex-col w-full h-full">
                        <ul>
                          <li>
                            <Link href="/p2p-trade">
                              <button className="w-full h-[70px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex  justify-center hover:text-[#e57cff]">
                                <div className="w-[90%] h-full flex bg-opacity-25 items-center">
                                  <div className="text-start font-nekstmedium text-[17px] ">
                                    <div className="flex items-center space-x-[5px]">
                                      <div>
                                        <CustomImage
                                          src="/common/HeaderNav/futures.png"
                                          alt="futures"
                                          width={25}
                                          height={25}
                                        ></CustomImage>
                                      </div>
                                      <p>P2P Trading</p>
                                    </div>
                                    <p className="text-start font-nekstmedium text-[12px] mt-[10px] text-[#939393] w-[90%] inline-block">
                                      60+ Fiat Currencies and Various popular
                                      local payment methods Best Prices
                                    </p>
                                  </div>
                                </div>
                              </button>
                            </Link>
                          </li>

                          <li>
                            <button className="w-full h-[70px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex  justify-center hover:text-[#e57cff]">
                              <div className="w-[90%] h-full flex bg-opacity-25 items-center">
                                <div className="text-start font-nekstmedium text-[17px] ">
                                  One-click buy
                                  <p className="text-start font-nekstmedium text-[12px] mt-[10px] text-[#939393] w-[90%] inline-block">
                                    Buy Crypto Within Seconds
                                  </p>
                                </div>
                              </div>
                            </button>
                          </li>
                          <li>
                            <button className="w-full h-[70px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex  justify-center hover:text-[#e57cff]">
                              <div className="w-[90%] h-full flex bg-opacity-25 items-center">
                                <div className="text-start font-nekstmedium text-[17px] ">
                                  Fiat Deposit
                                  <p className="text-start font-nekstmedium text-[12px] mt-[10px] text-[#939393] w-[90%] inline-block">
                                    Top up Balance via Bank Transfer or a Bank
                                    Card
                                  </p>
                                </div>
                              </div>
                            </button>
                          </li>
                          <li>
                            <button className="w-full h-[70px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex  justify-center hover:text-[#e57cff]">
                              <div className="w-[90%] h-full flex bg-opacity-25 items-center">
                                <div className="text-start font-nekstmedium text-[17px] ">
                                  Convert
                                  <p className="text-start font-nekstmedium text-[12px] mt-[10px] text-[#939393] w-[90%] inline-block">
                                    Quick conversion with zero fees and no
                                    slippage
                                  </p>
                                </div>
                              </div>
                            </button>
                          </li>
                          <li>
                            <button className="w-full h-[70px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex  justify-center hover:text-[#e57cff]">
                              <div className="w-[90%] h-full flex bg-opacity-25 items-center">
                                <div className="text-start font-nekstmedium text-[17px] ">
                                  Crypto Deposit
                                  <p className="text-start font-nekstmedium text-[12px] mt-[10px] text-[#939393] w-[90%] inline-block">
                                    Instant Crypto Deposits to Your Account
                                  </p>
                                </div>
                              </div>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="h-full flex items-center ">
            <div className="mt-[5px] ml-[2px] h-full">
              <div className="relative group z-10 h-full">
                <button className="px-[5px] group transition-all duration-[0.3s] flex items-center group-hover:bg-[#4a4848] h-full rounded-[6px] group-hover:text-[#eca2ff]">
                  markets
                  <CustomImage
                    src="/common/HeaderNav/arrow.svg"
                    width={14}
                    height={3}
                    alt="arrow_down"
                    className="mt-[5px] ml-[3px] group-hover:rotate-[180deg] duration-[0.3s]"
                  />
                </button>
                <div
                  className="absolute right-0 top-full w-[300px] max-h-[1200px] mt-[0px]  bg-opacity-30 border border-gray-200 shadow-lg backdrop-blur-md
    opacity-0 invisible transition-all duration-[0.3s] group-hover:opacity-100 group-hover:visible z-10 flex flex-col items-center  
    pointer-events-none group-hover:pointer-events-auto scale-y-[50%] group-hover:scale-y-[100%] origin-top"
                  // invisible
                >
                  <div className="w-full h-full bg-[#474646] bg-opacity-30 backdrop-blur-md mt-[15px] flex flex-col items-center pb-[25px]  rounded-lg">
                    <div className="w-full max-h-[500px] mt-[13px]">
                      <div className="flex flex-col w-full h-full ">
                        <p className="text-[#939393] px-[5%] inline-block font-nekstregular text-[12px] mt-[5px] mb-[3px]">
                          Trading
                        </p>
                        <ul>
                          <li>
                            <Link href={"/spot"}>
                              <button className="w-full h-[70px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex  justify-center hover:text-[#e57cff]">
                                <div className="w-[90%] h-full flex bg-opacity-25 items-center">
                                  <div className="text-start font-nekstmedium text-[17px] ">
                                    <div className="flex items-center space-x-[5px]">
                                      <div>
                                        <CustomImage
                                          src="/common/HeaderNav/spot.png"
                                          alt="spot"
                                          width={25}
                                          height={25}
                                        ></CustomImage>
                                      </div>
                                      <p>Spot</p>
                                    </div>
                                    <p className="text-start font-nekstmedium text-[12px] mt-[10px] text-[#939393] w-[90%] inline-block">
                                      Trade crypto seamlessly with real-time
                                      prices and deep liquidity
                                    </p>
                                  </div>
                                </div>
                              </button>
                            </Link>
                          </li>
                          <li>
                            <button className="w-full h-[70px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex  justify-center hover:text-[#e57cff]">
                              <div className="w-[90%] h-full flex bg-opacity-25 items-center">
                                <div className="text-start font-nekstmedium text-[17px] ">
                                  <div className="flex items-center space-x-[5px]">
                                    <div>
                                      <CustomImage
                                        src="/common/HeaderNav/futures.png"
                                        alt="futures"
                                        width={25}
                                        height={25}
                                      ></CustomImage>
                                    </div>
                                    <p>Futures</p>
                                  </div>
                                  <p className="text-start font-nekstmedium text-[12px] mt-[10px] text-[#939393] w-[90%] inline-block">
                                    Trade Perpetual and Futures contracts
                                    settled in USDT, USDC, ir other cryptos
                                  </p>
                                </div>
                              </div>
                            </button>
                          </li>
                          <li>
                            <button className="w-full h-[70px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex  justify-center hover:text-[#e57cff]">
                              <div className="w-[90%] h-full flex bg-opacity-25 items-center">
                                <div className="text-start font-nekstmedium text-[17px] ">
                                  Options
                                  <p className="text-start font-nekstmedium text-[12px] mt-[10px] text-[#939393] w-[90%] inline-block">
                                    Trade Options contracts, settled in USDT or
                                    USDC
                                  </p>
                                </div>
                              </div>
                            </button>
                          </li>
                          <p className="text-[#939393] inline-block px-[5%] font-nekstregular text-[12px] mb-[3px]">
                            Explore
                          </p>
                          <li>
                            <button className="w-full h-[70px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex  justify-center hover:text-[#e57cff]">
                              <div className="w-[90%] h-full flex bg-opacity-25 items-center">
                                <div className="text-start font-nekstmedium text-[17px] ">
                                  Gold & FX
                                  <p className="text-start font-nekstmedium text-[12px] mt-[10px] text-[#939393] w-[90%] inline-block">
                                    Maximize your traditional product trades
                                    using USDT on MT5 - now with 500x leverage
                                  </p>
                                </div>
                              </div>
                            </button>
                          </li>
                          <li>
                            <button className="w-full h-[70px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex  justify-center hover:text-[#e57cff]">
                              <div className="w-[90%] h-full flex bg-opacity-25 items-center">
                                <div className="text-start font-nekstmedium text-[17px] ">
                                  Spot X
                                  <p className="text-start font-nekstmedium text-[12px] mt-[10px] text-[#939393] w-[90%] inline-block">
                                    Launchpool, Token Splash, Puzzle Hunt,
                                    ByVotes, and more
                                  </p>
                                </div>
                              </div>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <button className="hover:text-purple-600 hover:scale-[0.9] transition-all duration-[0.3s]">
              partners
            </button>
          </li>
          <li>
            <button className="hover:text-purple-600 hover:scale-[0.9] transition-all duration-[0.3s]">
              knowledge
            </button>
          </li>
          <li>
            <button className="hover:text-purple-600 hover:scale-[0.95] duration-[0.3s]">
              academy
            </button>
          </li>
        </ul>
        <Link href={"/signup"}>
          <button
            className={`w-[144px] h-[52px] border-solid border-[3px] border-purple-600 rounded-[30px] font-nekstmedium text-[25px] hover:bg-purple-600 hover:scale-[1.1] duration-[0.2s] ${
              location === "/signup" || role === "user" ? "hidden" : ""
            } `}
          >
            sign up
          </button>
        </Link>
        {role !== "guest" && (
          <ul className="flex items-center space-x-[30px]">
            <li>
              <button
                className={`w-[110px] h-[35px] bg-purple-600 text-[20px] font-nekstmedium rounded-[8px] hover:scale-[1.1] duration-[0.2s] ${
                  location === "/" ? "" : "hidden"
                }`}
                onClick={() => console.log("click")}
              >
                Deposit
              </button>
            </li>
            <li className="">
              <div className="relative group ">
                <button className="w-[100px] h-[35px] text-[20px] font-nekstmedium rounded-[8px] hover:bg-[#5e5e5e]  duration-[0.2s] after:content-[''] ">
                  Assets
                </button>

                <div
                  className="absolute right-0 top-full w-[300px] max-h-[1200px] mt-[0px]  bg-opacity-30 border border-gray-200 shadow-lg backdrop-blur-md
    opacity-0 invisible transition-all duration-[0.3s] group-hover:opacity-100 group-hover:visible z-10 flex flex-col items-center  
    pointer-events-none group-hover:pointer-events-auto scale-y-[50%] group-hover:scale-y-[100%] origin-top"
                >
                  <div className="w-full h-full bg-[#474646] bg-opacity-30 backdrop-blur-md mt-[15px] flex flex-col items-center pb-[20px] rounded-lg">
                    <div className="w-[90%] max-h-[200px] mt-[15px]">
                      <div className="bg-[#1e1d1d] w-full h-full   rounded-[5px] p-[10px] bg-opacity-80">
                        <p className="text-[#d1cfcf] font-nekstregular mb-[20px]">
                          Assets Overview
                        </p>
                        <p className="inline-block font-nekstsemibold text-[35px]">
                          {totalBalance.totalBalanceUSD.toFixed(2)}
                        </p>
                        <p className="inline-block ml-[3px] font-nekstmedium text-[20px]">
                          USD
                        </p>
                        <p className="font-nekstregular text-[16px]">
                          ≈ {totalBalance.totalBalanceBTC.toFixed(8)} BTC
                        </p>
                      </div>
                      <p className="text-[#939393] font-nekstregular text-[12px] mt-[5px]">
                        *Data may be delayed.
                      </p>
                    </div>

                    <div className="flex gap-[10px] w-[90%] mt-[13px]">
                      <Link href="/deposit" className="flex-1 ">
                        <button className="w-full bg-purple-600 h-[45px] rounded-[10px] hover:scale-[0.94] duration-[0.2s] hover:bg-opacity-0 hover:border-[2px] hover:border-solid hover:border-purple-600 font-nekstmedium text-[18px]">
                          Deposit
                        </button>
                      </Link>
                      <button className="flex-1 border-[2px] border-solid border-purple-600 h-[45px] rounded-[10px] hover:scale-[0.94] duration-[0.2s] hover:bg-purple-600 font-nekstmedium text-[18px] text-[#ffffff]">
                        Withdraw
                      </button>
                    </div>
                    <div className="w-[90%]">
                      <p className="text-[#939393] font-nekstregular text-[12px] mt-[5px]">
                        Account
                      </p>
                    </div>

                    <div className="w-full max-h-[500px] border-b-[1px] border-[#565158] border-solid">
                      <div className="flex flex-col w-full h-full">
                        <button className="w-full h-[42px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex items-center justify-center hover:text-[#e57cff]">
                          <div className="w-[90%] h-full flex items-center justify-start bg-opacity-25">
                            <p className="inline-block font-nekstmedium text-[17px] ">
                              Funding Accound
                            </p>
                          </div>
                        </button>
                        <button className="w-full h-[42px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex items-center justify-center hover:text-[#e57cff]">
                          <div className="w-[90%] h-full flex items-center justify-start bg-opacity-25">
                            <p className="inline-block font-nekstmedium text-[17px] ">
                              Unified Trading Account
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="w-[90%]">
                      <p className="text-[#939393] font-nekstregular text-[12px] mt-[5px]">
                        Account
                      </p>
                    </div>
                    <div className="w-full max-h-[500px]">
                      <div className="flex flex-col w-full h-full">
                        <button className="w-full h-[42px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex items-center justify-center hover:text-[#e57cff]">
                          <div className="w-[90%] h-full flex items-center justify-start bg-opacity-25">
                            <p className="inline-block font-nekstmedium text-[17px] ">
                              Invested products
                            </p>
                          </div>
                        </button>
                        <button className="w-full h-[42px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] flex items-center justify-center hover:text-[#e57cff]">
                          <div className="w-[90%] h-full flex items-center justify-start bg-opacity-25">
                            <p className="inline-block font-nekstmedium text-[17px] ">
                              Copy trading
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="relative group">
                <button className="w-[40px] h-[40px] hover:bg-[#525151] bg-opacity-30 rounded-[10px]">
                  <CustomImage
                    width={40}
                    height={40}
                    src="/common/HeaderNav/user_icon.svg"
                    alt="user_icon"
                  ></CustomImage>
                </button>
                <div
                  className="invisible opacity-0 absolute right-0 w-[310px] max-h-[500px]  group-hover:opacity-100 group-hover:visible z-10 flex flex-col items-center  
    pointer-events-none group-hover:pointer-events-auto pt-[20px] backdrop-blur-md duration-[0.3s]  scale-y-[50%] group-hover:scale-y-[100%] origin-top"
                >
                  <div className="relative bg-[#474646] w-full h-[300px] bg-opacity-30 rounded-lg p-[5%] ">
                    <div className="flex">
                      <div className="flex w-[40px] h-[40px]  mr-[10px]">
                        <CustomImage
                          width={40}
                          height={40}
                          src="/common/HeaderNav/user_icon_profile.png"
                          alt="user_icon"
                          className="rounded-[20px]"
                        ></CustomImage>
                      </div>
                      <div className="">
                        <div className="flex items-center">
                          <div className="font-nekstmedium text-[16px]">
                            {userInfo.email.substring(0, 4)}***@***
                          </div>
                          <div className="font-nekstmedium text-[12px] bg-[#c1aa16] ml-[5px] bg-opacity-60 p-[5px] rounded-[5px] text-yellow-300">
                            Main Account
                          </div>
                        </div>
                        <div className="text-[#939393] font-nekstregular mt-[5px]">
                          UID:32823828
                        </div>
                      </div>
                    </div>
                    <ul className="mt-[30px] flex flex-col">
                      <p className="text-[#939393] inline-block font-nekstregular text-[12px]">
                        Recently Used
                      </p>
                      <li className="absolute left-0 w-full h-[50px]">
                        <Link href="/asset">
                          <button className="w-full h-[50px] hover:bg-[#494747] hover:bg-opacity-50 rounded-[5px] hover:text-[#e57cff]">
                            <div className="p-[5%] h-full bg-opacity-25 flex items-center">
                              <p className="font-nekstmedium text-[17px] text-start ">
                                Account
                              </p>
                            </div>
                          </button>
                        </Link>
                      </li>
                      <li className="absolute left-0 mt-[50px] w-full h-full">
                        <button
                          onClick={userLogout}
                          className="bg-gray-900 w-full h-[35px]"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
