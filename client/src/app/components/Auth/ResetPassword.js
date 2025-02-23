"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineAttachEmail } from "react-icons/md";
import { BiLoaderCircle } from "react-icons/bi";
import { CommonStyle } from "@/app/utils/CommonStyle";
import { useTheme } from "next-themes";

export default function ResetPassword({ setActive }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleResetPass = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/user/reset/password`,
        { email }
      );
      if (data) {
        toast.success(data.message, { duration: 3000 });
        setActive("updatePassword");
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
        onSubmit={handleResetPass}
        className={`w-[30rem] py-4 px-2 sm:px-4  shadow-md ${
          theme === "dark"
            ? "bg-slate-950 text-white"
            : "bg-gray-100 text-black"
        } rounded-md`}
      >
        <div className="flex items-center justify-center flex-col gap-2 w-full">
          <Image src="/Sociallogo3.png" alt="Logo" width={60} height={60} />
          <h2 className=" text-2xl sm:text-3xl font-semibold text-center">
            Reset Password
          </h2>
          <div className="flex flex-col gap-4 w-full mt-4 ">
            <div className="relative w-full">
              <MdOutlineAttachEmail className="absolute top-[.7rem] left-2 h-5 w-5  z-10  " />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${CommonStyle.input} pl-8`}
              />
            </div>

            {/* Button */}
            <div className="flex items-center justify-center w-full py-4 px-2 sm:px-[2rem]">
              <button
                type="submit"
                className={`${CommonStyle.button2} w-full sm:w-[70%] `}
              >
                {loading ? (
                  <BiLoaderCircle className="h-5 w-5 text-white animate-spin" />
                ) : (
                  "Reset Password"
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
