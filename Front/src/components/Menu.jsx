import React, { useState } from "react";
import MenuItem from "./MenuItem";
import MenuSVG from "../assets/SVG/MenuSVG";
import ProfileSVG from "../assets/SVG/ProfileSVG";

export default function Menu({ menuItems = [] }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex justify-center relative">
      <button
        onClick={() => setIsActive(!isActive)}
        className="inline-flex gap-1 items-center  rounded-full px-3 py-1 border-[1.5px] border-black hover:bg-gray-50 hover:shadow-lg"
      >
        <MenuSVG></MenuSVG>
        <ProfileSVG></ProfileSVG>
      </button>

      {isActive && (
        <div className="absolute top-9 flex flex-col gap-1 bg-gray-100 rounded-xl px-5 py-2">
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} setIsActive={setIsActive} />
          ))}
        </div>
      )}
    </div>
  );
}
