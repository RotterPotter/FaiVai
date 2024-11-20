import React, { useState, useContext} from "react";
import GreenCircle from "../assets/SVG/GreenCircleSVG";
import { Link, useLocation } from "react-router-dom";

import { UserContext } from "../context/UserContext";

export default function FIndWJ(className = "") {
  const location = useLocation().pathname;
  const [, , language, setLanguage] = useContext(UserContext);

  const textes = {
    en: {1: "Find Jobs", 2: "Find Worker"},
    ru: {1: "Найти работу", 2: "Найти исполнителя"},
    it: {1: "Trova lavoro", 2: "Trova lavoratore"},
  }
  

  return (
    <div className={`hidden md:flex justify-center items-center  gap-20 `}>
      <Link to="/">
        <button className="text-xl ">
          <div className="flex flex-col items-center -mb-2 hover:text-green-600 text-black text-lg">
            {textes[language][1]}
            <GreenCircle
              active={location == "/" ? true : false}
              className="top-full"
            ></GreenCircle>
          </div>
        </button>
      </Link>
      <Link to="/findworker">
        <button className="text-xl">
          <div className="flex flex-col items-center -mb-2 hover:text-green-600 text-black text-lg">
            {textes[language][2]}
            <GreenCircle
              active={location == "/findworker" ? true : false}
              className="top-full "
            ></GreenCircle>
          </div>
        </button>
      </Link>
    </div>
  );
}
