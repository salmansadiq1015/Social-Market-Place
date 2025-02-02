"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Header from "./components/Layout/Header";

export default function Home() {
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
    <div className=" flex flex-col overflow-x-hidden">
      {" "}
      <Header />
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-pulse bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20 rounded-full blur-3xl w-[210px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] absolute top-1/4 left-1/4"></div>
          <div className="animate-pulse bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 opacity-20 rounded-full blur-3xl w-[210px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] absolute bottom-1/4 right-1/4"></div>
        </div>

        {/* Main Content */}
        <div className="z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 md:gap-8 px-4 md:px-8 mt-[4rem] sm:mt-0 pb-4 sm:pb-1">
          {/* Introduction */}
          <div className="order-2 md:order-1 text-center md:text-left flex flex-col justify-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6">
              Discover. Connect. Thrive.
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Experience the best social media marketplace tailored for you.
            </p>
            <div className="mt-8 flex justify-center md:justify-start gap-6">
              <a
                href="#buy"
                className="px-5 sm:px-8 py-2 sm:py-2 font-semibold text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Buy Now
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 md:order-2 flex items-center justify-center">
            <div className="relative w-[17rem] h-[17rem] sm:w-[26rem] sm:h-[26rem] rounded-md overflow-hidden shadow-lg">
              <Image
                src="/sb1.png"
                alt="Profile"
                layout="fill"
                className="w-full h-full object-cover z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-pink-500 to-yellow-500 opacity-30 animate-pulse"></div>
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
            className="animate-cursor w-4 h-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full fixed"
            id="cursor"
          ></div>
        </div>
      </div>
    </div>
  );
}
