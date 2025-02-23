"use client";
import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Verification from "./Verification";
import ResetPassword from "./ResetPassword";
import UpdatePassword from "./UpdatePassword";

export default function Auth() {
  const [active, setActive] = useState("login");

  return (
    <div className="w-full h-full rounded-md">
      {active === "register" ? (
        <Register setActive={setActive} />
      ) : active === "verification" ? (
        <Verification setActive={setActive} />
      ) : active === "resetPassword" ? (
        <ResetPassword setActive={setActive} />
      ) : active === "updatePassword" ? (
        <UpdatePassword setActive={setActive} />
      ) : (
        <Login setActive={setActive} />
      )}
    </div>
  );
}
