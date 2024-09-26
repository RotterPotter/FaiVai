import React from "react";
import Arrow from "../assets/SVG/ArrowSVG";

export default function Filter({ name = "" }) {
  return (
    <div className="flex flex-col  gap-1 justify-center items-center">
      <div className="flex justify-center items-center sm:gap-3 gap-1">
        {name}
        <Arrow></Arrow>
      </div>
      <div className="text-gray-500 flex justify-center">All</div>
    </div>
  );
}
