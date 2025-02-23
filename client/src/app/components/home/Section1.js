"use client";
import React, { useEffect } from "react";
import { FaYoutube } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

export default function Section1({
  active,
  setActive,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minfollowers,
  maxfollowers,
  setMinFollowers,
  setMaxFollowers,
  searh,
  setSearch,
  monotized,
  setMonotized,
  type,
  setType,
  types,
  verified,
  setVerified,
}) {
  useEffect(() => {
    const cursor = document.getElementById("cursor");

    const handleMouseMove = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div className="flex flex-col overflow-hidden bg-gray-950 dark:text-white">
      {" "}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen flex items-center justify-start overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden w-full min-h-screen">
          <div className="animate-pulse bg-gradient-to-r from-purple-700 via-pink-500 to-orange-700 opacity-20 rounded-full blur-3xl w-[210px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] absolute top-1/4 left-1/4"></div>
          <div className="animate-pulse bg-gradient-to-r from-orange-700 via-teal-700 to-green-500 opacity-20 rounded-full blur-3xl w-[210px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] absolute bottom-1/4 right-1/4"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-4 w-full items-center justify-center">
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <h3 className="text2xl sm:text-4xl font-extrabold text-white mb-4 text-center">
              Fast & Reliable Social Media Marketplace
            </h3>
            <p className="text-[14px] text-center text-gray-100 font-medium max-w-xl leading-relaxed">
              Safely Buy & Sell Social Media Accounts, Pages & Channels across
              Instagram, YouTube, TikTok, Facebook, and more with ease on our
              trusted, secure, and reliable platform.
            </p>
          </div>
          {/* ------------------Filters---------------- */}
          <div className="flex flex-col gap-4 p-4  bg-black/50  rounded-lg shadow-md border-2 border-orange-600 drop-shadow-md ">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3">
              <button
                className={`flex items-center gap-1 text-[14px] font-medium cursor-pointer text-white ${
                  active === "youtube"
                    ? "px-5 sm:px-8 py-2 sm:py-2 text-[14px]  font-semibold text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    : "border-2 border-red-500 px-5 sm:px-8 py-2 sm:py-2 text-[14px]  font-semibold text-white bg-transparent  rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                }`}
                onClick={() => setActive("youtube")}
              >
                <FaYoutube
                  className={`${
                    active === "youtube" ? "text-white" : "text-red-600"
                  }`}
                  size={25}
                />{" "}
                YouTube
              </button>
              <button
                className={`flex items-center gap-1 text-[14px] font-medium cursor-pointer text-white ${
                  active === "facebook"
                    ? "px-5 sm:px-8 py-2 sm:py-2 text-[14px]  font-semibold text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    : "border-2 border-blue-500 px-5 sm:px-8 py-2 sm:py-2 text-[14px]  font-semibold text-white bg-transparent  rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                }`}
                onClick={() => setActive("facebook")}
              >
                <FaFacebookSquare
                  className={`${
                    active === "facebook" ? "text-white" : "text-blue-600"
                  }`}
                  size={25}
                />{" "}
                Facebook
              </button>
              <button
                className={`flex items-center gap-1 text-[14px] font-medium cursor-pointer text-white ${
                  active === "insta"
                    ? "px-5 sm:px-8 py-2 sm:py-2 text-[14px]  font-semibold text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    : "border-2 border-pink-500 px-5 sm:px-8 py-2 sm:py-2 text-[14px]  font-semibold text-white bg-transparent  rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                }`}
                onClick={() => setActive("insta")}
              >
                <FaInstagramSquare
                  className={`${
                    active === "insta" ? "text-white" : "text-pink-600"
                  }`}
                  size={25}
                />{" "}
                Instagram
              </button>
              <button
                className={`flex items-center gap-2 text-[14px] font-medium cursor-pointer text-white ${
                  active === "tiktok"
                    ? "px-5 sm:px-8 py-2 sm:py-2 text-[14px] font-semibold text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    : "border-2 border-gray-500 px-5 sm:px-8 py-2 sm:py-2 text-[14px] font-semibold text-white bg-transparent rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                }`}
                onClick={() => setActive("tiktok")}
              >
                <AiFillTikTok
                  className={`${
                    active === "tiktok" ? "text-white" : "text-gray-600"
                  }`}
                  size={25}
                />
                TikTok
              </button>
            </div>
            {/* Filter By Price */}
            <div className="flex flex-col w-full gap-1 mt-2">
              <h3 className="text-sm font-medium text-white ">Price</h3>
              <div className="flex items-center gap-4 w-full">
                <input
                  type="number"
                  value={minPrice}
                  min="0"
                  placeholder="Min Price"
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-4 py-2 text-sm text-white bg-transparent border-2 border-white rounded-lg focus:outline-none focus:border-orange-500 transition-all duration-300"
                />
                <input
                  type="number"
                  value={maxPrice}
                  min="0"
                  placeholder="Max Price"
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-4 py-2 text-sm text-white bg-transparent border-2 border-white rounded-lg focus:outline-none focus:border-orange-500 transition-all duration-300"
                />
              </div>
            </div>
            {/* FIlter By Followers */}
            <div className="flex flex-col gap-1 w-full mt-2">
              <h3 className="text-sm font-medium text-white ">Followers</h3>
              <div className="flex items-center gap-4 w-full">
                <input
                  type="number"
                  value={minfollowers}
                  min="0"
                  placeholder="Min Followers"
                  onChange={(e) => setMinFollowers(e.target.value)}
                  className="w-full px-4 py-2 text-sm text-white bg-transparent border-2 border-white rounded-lg focus:outline-none focus:border-orange-500 transition-all duration-300"
                />
                <input
                  type="number"
                  value={maxfollowers}
                  min="0"
                  placeholder="Max Followers"
                  onChange={(e) => setMaxFollowers(e.target.value)}
                  className="w-full px-4 py-2 text-sm text-white bg-transparent border-2 border-white rounded-lg focus:outline-none focus:border-orange-500 transition-all duration-300"
                />
              </div>
            </div>
            {/* Search */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3 w-full">
              <input
                type="text"
                value={searh}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 text-sm text-white bg-transparent border-2 border-white rounded-[3rem] focus:outline-none focus:border-orange-500 transition-all duration-300"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 text-sm text-white  bg-transparent border-2 border-white rounded-[3rem] focus:outline-none focus:border-orange-500 transition-all duration-300"
              >
                <option value="" style={{ color: "black" }}>
                  All
                </option>
                {types?.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    style={{ color: "black" }}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center w-full justify-center gap-2 sm:gap-4">
              <button
                onClick={() => setMonotized(!monotized)}
                className={`flex items-center gap-2 text-[14px] font-medium cursor-pointer text-white px-5 sm:px-8 py-2 sm:py-2  bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500`}
              >
                Mototized
              </button>
              <button
                onClick={() => setVerified(!verified)}
                className={`flex items-center gap-2 text-[14px] font-medium cursor-pointer text-white px-5 sm:px-8 py-2 sm:py-2  bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500`}
              >
                Verified
              </button>
            </div>
          </div>
        </div>

        {/* Floating Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 4 + 2}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Cursor Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="animate-cursor w-4 h-4 bg-gradient-to-r from-pink-500 via-yellow-500 to-orange-500 rounded-full fixed"
            id="cursor"
          ></div>
        </div>
      </div>
    </div>
  );
}
