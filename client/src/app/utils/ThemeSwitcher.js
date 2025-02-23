"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export default function TheamSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <div className="flex item-center justify-center rounded-full">
      {currentTheme === "light" ? (
        <BiMoon
          className="cursor-pointer"
          onClick={() => setTheme("dark")}
          size={25}
          fill="black"
        />
      ) : (
        <BiSun
          className="cursor-pointer"
          fill="orange"
          onClick={() => setTheme("light")}
          size={25}
        />
      )}
    </div>
  );
}
