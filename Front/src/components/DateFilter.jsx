import React, { useState, useEffect } from "react";
import Arrow from "../assets/SVG/ArrowSVG";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateFilter({
  value,
  setValue,
  name = "Date",
  onClick = null,
  isOpen = false,
}) {
  const [isClicked, setIsClicked] = useState(isOpen);

  useEffect(() => {
    setIsClicked(isOpen);
  }, [isOpen]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleDateChange = (date) => {
    setValue(date);
  };

  return (
    <div className="relative flex flex-col gap-1 justify-center items-center">
      <button
        onClick={handleClick}
        type="button"
        className="flex justify-center items-center sm:gap-1 gap-1"
      >
        {name}
        <Arrow degree={isClicked ? "180" : "0"} small={true}></Arrow>
      </button>
      <div className="text-gray-500 flex justify-center">
        {value instanceof Date && !isNaN(value)
          ? value.toLocaleDateString()
          : "Select a date"}
      </div>

      {isOpen && (
        <div
          className={`absolute left-0 right-0 top-[50px] shadow-sm z-50 rounded-lg  transition-opacity duration-200 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <DatePicker
            selected={value}
            onChange={(date) => {
              handleDateChange(date);
              onClick(); // Close the date picker
            }}
            inline
            className="p-2"
          />
        </div>
      )}
    </div>
  );
}
