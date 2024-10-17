import React from "react";
import { createContext, useState, useEffect } from "react";

export const UserContext = React.createContext();

export default function UserProvider(props) {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

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

      if (!response.ok) {
        localStorage.removeItem("access_token");
      } else {
        localStorage.setItem("access_token", token);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
}
