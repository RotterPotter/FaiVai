import React from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function Logout() {
  const [token, setToken] = useContext(UserContext);

  const logoutUser = () => {
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   }
    // };

    // await fetch('http://localhost:8000/logout', requestOptions);

    console.log("logoutUser called");
    localStorage.removeItem("access_token");
    console.log("access_token removed from localStorage");
    setToken(null);
    console.log(token);
  };

  return <button onClick={logoutUser}>Logout</button>;
}
