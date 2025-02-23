"use client";
import React, { useState } from "react";
import MainLayout from "./components/Layout/MainLayout";
import Section1 from "./components/home/Section1";

const types = [
  { id: 1, name: "Entertainment" },
  { id: 2, name: "Gaming" },
  { id: 3, name: "Music" },
  { id: 4, name: "News" },
  { id: 5, name: "Photography" },
  { id: 6, name: "Productivity" },
  { id: 7, name: "Sports" },
  { id: 8, name: "Travel" },
  { id: 9, name: "Video" },
];
export default function Home() {
  const [active, setActive] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minfollowers, setMinFollowers] = useState("");
  const [maxfollowers, setMaxFollowers] = useState("");
  const [searh, setSearch] = useState("");
  const [monotized, setMonotized] = useState(false);
  const [type, setType] = useState("");
  const [verified, setVerified] = useState(false);

  return (
    <MainLayout>
      <div className="flex flex-col overflow-x-hidden  bg-gray-950  dark:text-white">
        <Section1
          active={active}
          setActive={setActive}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minfollowers={minfollowers}
          maxfollowers={maxfollowers}
          setMinFollowers={setMinFollowers}
          setMaxFollowers={setMaxFollowers}
          searh={searh}
          setSearch={setSearch}
          monotized={monotized}
          setMonotized={setMonotized}
          type={type}
          setType={setType}
          types={types}
          verified={verified}
          setVerified={setVerified}
        />
      </div>
    </MainLayout>
  );
}
