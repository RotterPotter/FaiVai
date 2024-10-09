import React from "react";
import { useNavigate } from "react-router-dom";

export default function FirstButton({
  name = "",
  className = "",
  navigateTo = null,
}) {
  const navigate = useNavigate();
  const oncClick = () => {
    if (navigateTo !== null) navigate(navigateTo);
  };
  return (
    <div>
      <button
        onClick={oncClick}
        className={`text-xs sm:text-base text-black/70 hover:text-black  hover:border-green-600 active:bg-green-500 active:text-white   hover:shadow-lg flex-inline border w-[80px] h-[30px] sm:w-[180px] sm:h-[50px] rounded-full justify-center items-center border-black ${className}`}
      >
        {name}
      </button>
    </div>
  );
}
