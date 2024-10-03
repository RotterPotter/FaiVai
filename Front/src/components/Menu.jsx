import MenuSVG from "../assets/SVG/MenuSVG";
import ProfileSVG from "../assets/SVG/ProfileSVG";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { UserContext } from "../context/UserContext";

export default function Menu() {
  const [active, setActive] = useState(false);
  const [token, setToken] = useContext(UserContext);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleClick}
        className="relative flex justify-center items-center gap-2 rounded-full border border-black px-2 py-1"
      >
        <MenuSVG />
        <ProfileSVG />
      </button>
      {active && (
        <div className="absolute top-[60px] border border-black/30 shadow-xl flex flex-col p-2 gap-2 rounded-xl items-center justify-center w-[100px]">
          <Link onClick={handleClick} to={"/"}>
            Home
          </Link>
          {token ? (
            <Logout onClick={handleClick} />
          ) : (
            <Link onClick={handleClick} to={"/login"}>
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
