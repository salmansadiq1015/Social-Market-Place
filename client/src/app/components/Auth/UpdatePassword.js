"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineAttachEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { BiLoaderCircle } from "react-icons/bi";
import { CommonStyle } from "@/app/utils/CommonStyle";
import { useTheme } from "next-themes";

export default function UpdatePassword({ setActive }) {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleUpdatePass = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/user/update/password`,
        { token, newPassword: password }
      );
      if (data) {
        setActive("login");
        toast.success(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-4 px-4">
      <form
        onSubmit={handleUpdatePass}
        className={`w-[30rem] py-4 px-2 sm:px-4  shadow-md ${
          theme === "dark"
            ? "bg-slate-950 text-white"
            : "bg-gray-100 text-black"
        } rounded-md`}
      >
        <div className="flex items-center justify-center flex-col gap-2 w-full">
          <Image src="/Sociallogo3.png" alt="Logo" width={60} height={60} />
          <h2 className=" text-2xl sm:text-3xl font-semibold text-center">
            Update Password
          </h2>
          <div className="flex flex-col gap-4 w-full mt-4 ">
            <div className="relative w-full">
              <MdOutlineAttachEmail className="absolute top-[.7rem] left-2 h-5 w-5  z-10  " />
              <input
                type="text"
                placeholder="Reset Password Token"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className={`${CommonStyle.input} pl-8`}
              />
            </div>

            <div className="relative w-full">
              <span
                className="absolute top-[.7rem] right-2   z-10  "
                onClick={() => setShow(!show)}
              >
                {!show ? (
                  <IoMdEyeOff className="h-6 w-6" />
                ) : (
                  <IoEye className="h-6 w-6" />
                )}
              </span>

              <TbPasswordUser className="absolute top-[.7rem] left-2 h-5 w-5 z-10 " />

              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
                className={`${CommonStyle.input} pl-8`}
              />
            </div>

            {/* Button */}
            <div className="flex items-center justify-center w-full py-4 px-2 sm:px-[2rem]">
              <button
                type="submit"
                className={`${CommonStyle.button2} w-full sm:w-[70%]`}
              >
                {loading ? (
                  <BiLoaderCircle className="h-5 w-5 text-white animate-spin" />
                ) : (
                  "Update Password"
                )}
              </button>
            </div>

            {/* No account */}
            <div className="flex items-center justify-center mt-1 gap-2">
              <span className="text-base ">Not have an account?</span>
              <span
                className="text-lg font-medium text-orange-500 hover:text-orange-600 cursor-pointer"
                onClick={() => setActive("register")}
              >
                Register
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
