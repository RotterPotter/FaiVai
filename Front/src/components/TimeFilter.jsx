import React, { useState, useEffect } from "react";
import Arrow from "../assets/SVG/ArrowSVG";

export default function TimeFilter({
  timeFrom,
  setTimeFrom,
  timeTo,
  setTimeTo,
  name = "Time",
  onClick = null,
  isOpen = false,
}) {
  const [isClicked, setIsClicked] = useState(isOpen);
  const [timeToInFunc, setTimeToInFunc] = useState(null);
  const [timeFromInFunc, setTimeFromInFunc] = useState(null);

  useEffect(() => {
    setIsClicked(isOpen);
  }, [isOpen]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleTimeChange = (time, type) => {
    if (type === "from") {
      setTimeFromInFunc(time);
    } else if (type === "to") {
      setTimeToInFunc(time);
    }
  };

  const handleApplyButtonClick = () => {
    if (timeToInFunc && timeFromInFunc) {
      setTimeFrom(timeFromInFunc);
      setTimeTo(timeToInFunc);
      onClick();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        type="button"
        className="flex flex-col gap-1 justify-center items-center"
      >
        <div className="flex justify-center items-center sm:gap-1 gap-1">
          {name}
          <Arrow degree={isClicked ? "180" : "0"} small={true}></Arrow>
        </div>
        <div className="text-gray-500 flex justify-center ">
          {timeFrom && timeTo ? (
            <div className="flex gap-8 justify-center items-start">
              <div className="flex flex-col justify-center items-center">
                <span className="text-black/70  text-left w-full">From</span>
                {timeFrom}
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="text-black/70 text-left w-full ">To</span>
                {timeTo}
              </div>
            </div>
          ) : (
            <div>Any</div>
          )}
        </div>
      </button>
      <div
        className={`absolute  -left-16 top-[70px] w-[250px] p-3 max-h-[120px] shadow-2xl flex flex-col justify-center items-center gap-3 bg-white z-50 rounded-lg overflow-y-auto transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-1 items-center justify-center w-full">
            <p>From</p>
            <input
              type="time"
              value={timeFromInFunc}
              onChange={(e) => handleTimeChange(e.target.value, "from")}
              className="border border-black"
            />
          </div>
          <div className="flex flex-col gap-1 items-center justify-center w-full">
            <p>To</p>
            <input
              type="time"
              value={timeToInFunc}
              onChange={(e) => handleTimeChange(e.target.value, "to")}
              className="border border-black"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleApplyButtonClick}
          className="rounded-lg px-3 py-1 border border-black"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
