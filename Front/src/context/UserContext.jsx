import React from "react";
import { createContext, useState, useEffect } from "react";

export const UserContext = React.createContext();

export default function UserProvider(props) {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        "http://localhost:8000/users/me",
        requestOptions
      );

      const responseJson = await response.json();

      if (!response.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
      } else {
        localStorage.setItem("access_token", token);
        localStorage.setItem("user_id", responseJson.id);
      }
    };

    fetchUser();
  }, [token]);

  useEffect(() => {
    localStorage.setItem("language", language);
    console.log("refreshed");
  }),
    [language];

  return (
    <UserContext.Provider value={[token, setToken, language, setLanguage]}>
      {props.children}
    </UserContext.Provider>
  );
}
