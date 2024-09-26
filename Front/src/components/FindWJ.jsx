import React, { useState } from "react";
import GreenCircle from "../assets/SVG/GreenCircleSVG";
import { Link, useLocation } from "react-router-dom";

export default function FIndWJ(className = "") {
  const location = useLocation().pathname;

  return (
    <div className={`hidden md:flex justify-center items-center  gap-20`}>
      <Link to="/">
        <button className="text-xl ">
          <div className="flex flex-col items-center -mb-2 hover:text-green-600">
            Find Jobs
            <GreenCircle
              active={location == "/" ? true : false}
              className="top-full"
            ></GreenCircle>
          </div>
        </button>
      </Link>
      <Link to="/findworker">
        <button className="text-xl">
          <div className="flex flex-col items-center -mb-2 hover:text-green-600">
            Find Worker
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
