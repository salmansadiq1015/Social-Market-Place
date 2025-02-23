"use client";
import { useState, createContext, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authShow, setAuthShow] = useState(false);
  const [activationToken, setActivationToken] = useState("");
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  // check token
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("socialmarket");
    const token = Cookies.get("socialmarket");

    if (data) {
      const parseData = JSON.parse(data);
      setAuth((prevAuth) => ({
        ...prevAuth,
        user: parseData?.user,
        token: token,
      }));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        authShow,
        setAuthShow,
        activationToken,
        setActivationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
