"use client";
import React, { useState } from "react";
import HeaderNav from "../components/common/HeaderNav";
import axios from "axios";
import { JwtPayload } from "jwt-decode";
import { useGlobalContext } from "../GlobalContext";
import { useRouter } from "next/navigation";

axios.defaults.withCredentials = true;

export interface CustomJwtPayload extends JwtPayload {
  role: string;
}

export default function Page() {
  const [formData, setFormData] = useState({ email: "", pass: "" });
  const { setRole } = useGlobalContext();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement; // Явно указываем, что e.target — это форма
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/userauth/register/",
        { email, password },
        { withCredentials: true }
      );

      setRole(response.data["role"]); // Обновляем роль пользователя
      localStorage.setItem("role", response.data["role"]);
      localStorage.setItem("access", response.data["access"]);
      localStorage.setItem("email", response.data["email"]);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://127.0.0.1:8000/userauth/", {
        withCredentials: true,
      });
      const { access, role } = response.data;
      localStorage.setItem("access", access);
      console.log("Роль пользователя:", role, access);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <HeaderNav></HeaderNav>
      <div className="relative z-100 min-w-[500px] max-w-[1600px] h-[900px] bg-[url('/pages/AuthPage/bg.png')] bg-cover bg-no-repeat m-auto bg-[40px_-80px] z-1000">
        <div className="container overflow-hidden h-full w-full text-white">
          <div className="w-[550px] h-[600px] bg-black  ml-auto mr-[5vw] rounded-[30px] ">
            <div className="flex flex-col w-[80%] m-auto h-[90%] z-1000">
              <div>
                <p className="font-nekstmedium text-[72px] mb-[34px]">
                  Sign in
                </p>
                <form onSubmit={handleSubmit}>
                  <label
                    htmlFor=""
                    className="font-nekstregular text-[#8C74B4] text-[16px] ml-[5px]"
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(event) => {
                      setFormData({ ...formData, email: event.target.value });
                    }}
                    className="placeholder-[#685C7B] placeholder-opacity-50 w-[100%] h-[43px] bg-black border-b-[2px] border-solid border-[#685C7B] font-nekstmedium text-[29px] p-[5px] focus:border-[#9B65FF] mb-[16px] placeholder:text-[26px] mt-[10px] focus:placeholder-opacity-0 "
                  />
                  <label
                    htmlFor=""
                    className="font-nekstregular text-[#8C74B4] text-[16px] ml-[5px]"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={formData.pass}
                    onChange={(event) => {
                      setFormData({ ...formData, pass: event.target.value });
                    }}
                    className="placeholder-[#685C7B] placeholder-opacity-50 w-[100%] h-[43px] bg-black border-b-[2px] border-solid border-[#685C7B] font-nekstmedium text-[29px] p-[5px] focus:border-[#9B65FF] mb-[16px] placeholder:text-[26px] mt-[10px] focus:placeholder-opacity-0"
                  />
                  <button
                    type="submit"
                    className="block w-[100%] h-[45px] rounded-[30px] m-auto bg-[#5F29B7] mt-[52px] font-nekstsemibold text-[20px]"
                  >
                    Sign in
                  </button>
                </form>
              </div>
              <div className="mt-auto">
                <p className="font-nekstregular text-[#7A6E8C] text-[20px] mb-[10px]">
                  Have already account?
                </p>
                <button
                  className="w-full h-[45px] border-[1px] rounded-[30px] border-solid border-[#5F29B7] font-nekstsemibold text-[16px]"
                  onClick={handleGo}
                >
                  Log in an account
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute w-[800px] h-[1000px] bg-[url('/pages/mainPage/decorations/bg_mainpage_light.png')] bg-cover bg-no-repeat m-auto opacity-100 top-[-100px] right-[-200px] z-0 pointer-events-none"></div>
        <div className="absolute w-[800px] h-[1000px] bg-[url('/pages/mainPage/decorations/bg_mainpage_light.png')] bg-cover bg-no-repeat m-auto opacity-560 top-[0] right-[-900px] z-0 pointer-events-none rotate-90"></div>
        <div className="absolute w-[800px] h-[1000px] bg-[url('/pages/mainPage/decorations/bg_mainpage_light.png')] bg-cover bg-no-repeat m-auto opacity-560 top-[0] left-[-100px] z-0 pointer-events-none rotate-90"></div>
        <div className="absolute w-[800px] h-[1000px] bg-[url('/pages/mainPage/decorations/bg_mainpage_light.png')] bg-cover bg-no-repeat m-auto opacity-560 top-[-100px] left-[-999px] z-0 pointer-events-none rotate-0"></div>
      </div>

      {/* <div className="w-[100vw] h-[100vh] text-white relative">
        
          <div className="w-full h-full  bg-[url('/pages/AuthPage/bg.png')] bg-cover  bg-no-repeat bg-[50px_-100px]"></div>
        </div>

        
      {/* </div> */}
    </div>
  );
}
