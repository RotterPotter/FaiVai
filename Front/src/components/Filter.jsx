import React, { useState, useEffect } from "react";
import Arrow from "../assets/SVG/ArrowSVG";

export default function Filter({
  value,
  setValue,
  data = ["option1"],
  name = "",
  onClick = null,
  type = null,
  isOpen = false,
}) {
  const [isClicked, setIsClicked] = useState(isOpen);

  useEffect(() => {
    setIsClicked(isOpen);
    console.log(value);
  }, [isOpen]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleCheckboxChange = (v) => {
    if (Array.isArray(value) && value.includes(v)) {
      setValue(value.filter((item) => item !== v));
    } else {
      setValue([...value, v]);
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="relative flex flex-col gap-1 justify-center items-center"
    >
      <div className="flex justify-center items-center sm:gap-1 gap-1">
        {name}
        <Arrow degree={isClicked ? "180" : "0"} small={true}></Arrow>
      </div>
      <div className="text-gray-500 flex justify-center">
        {Array.isArray(value)
          ? value.length === 0
            ? "All"
            : value.join(", ")
          : value}
      </div>

      <div
        className={`absolute left-0 top-[50px] w-[300px] max-h-[120px] shadow-2xl flex flex-col bg-white z-50 rounded-lg overflow-y-auto transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {data.map((v) =>
          type === "checkbox" ? (
            <label
              key={v}
              className="text-left p-2 hover:bg-gray-100 cursor-pointer flex items-center"
            >
              <input
                type="checkbox"
                checked={Array.isArray(value) && value.includes(v)}
                onChange={() => handleCheckboxChange(v)}
                className="mr-2"
              />
              {v}
            </label>
          ) : (
            <button
              type="button"
              key={v}
              className="text-left p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setValue(v)}
            >
              {v}
            </button>
          )
        )}
      </div>
    </button>
  );
}
