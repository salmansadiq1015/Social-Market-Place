"use client";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { BiLoaderCircle } from "react-icons/bi";
import { useTheme } from "next-themes";
import { CommonStyle } from "@/app/utils/CommonStyle";

export default function Verification({ setActive }) {
  const { activationToken } = useAuth();
  const [invalidError, setInvalidError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const [varifyNumber, setVarifyNumber] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  // Varification

  const handleInputChange = (index, value) => {
    setInvalidError(false);
    const newVarifyNumber = { ...varifyNumber, [index]: value };
    setVarifyNumber(newVarifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  //   Handle Varifiation
  const varificationHandler = async () => {
    const verificationNumber = Object.values(varifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/auth/verify`,
        {
          activation_code: verificationNumber,
          activation_token: activationToken,
        }
      );
      if (data) {
        setActive("login");
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center px-4 py-4 ">
      <div
        className={`w-[30rem] py-4 px-2 sm:px-4 ${
          theme === "dark"
            ? "bg-slate-950 text-white"
            : "bg-gray-100 text-black"
        } shadow-md  rounded-md`}
      >
        <h1 className={` text-2xl sm:text-3xl font-semibold text-center`}>
          Verify Your Account
        </h1>
        <br />
        <div className="mt-2 w-full flex items-center justify-center">
          <div
            className={`w-[80px] h-[80px] rounded-full ${
              invalidError ? "bg-red-600 animate-pulse" : "bg-sky-600"
            } flex items-center justify-center`}
          >
            <VscWorkspaceTrusted size={40} className="text-white " />
          </div>
        </div>
        <br />
        <br />
        <div className=" m-auto flex items-center justify-center gap-5">
          {Object.keys(varifyNumber).map((key, index) => (
            <input
              type="number"
              key={key}
              ref={inputRefs[index]}
              className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-md flex items-center  justify-center text-[18px]  font-Poppins outline-none text-center ${
                invalidError
                  ? " shake border-red-600"
                  : ` ${
                      theme === "dark" ? "border-gray-300" : "border-gray-800"
                    }`
              }`}
              placeholder=""
              maxLength={1}
              value={varifyNumber[key]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
        <br />
        <br />
        <div className="w-full flex justify-center px-2 sm:px-[2rem]">
          <button
            className={` ${
              loading && " w-full animate-pulse cursor-not-allowed"
            } ${
              CommonStyle.button2
            } w-full sm:w-[70%] flex items-center justify-center gap-1`}
            onClick={varificationHandler}
          >
            {loading ? (
              <BiLoaderCircle className="h-5 w-5 animate-spin text-white" />
            ) : (
              "Verify OTP"
            )}
          </button>
        </div>
        <br />
        <h5 className="text-center font-[16px]  mt-2 font-Poppins">
          Go back to sign in?{" "}
          <span
            className="text-orange-500 hover:text-orange-600 cursor-pointer pl-2 font-semibold"
            onClick={() => setActive("login")}
          >
            Sign In
          </span>
        </h5>
      </div>
    </div>
  );
}
