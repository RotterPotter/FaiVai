import React from "react";
import LocationSVG from "../assets/SVG/LocationSVG";
import DateSVG from "../assets/SVG/DateSVG";
import ClockSVG from "../assets/SVG/ClockSVG";
import MoneySVG from "../assets/SVG/MoneySVG";

export default function ServiceCardField({
  name,
  value,
  className,
  shortify = true,
  additionnalValue = "",
  currency = "",
}) {
  const n = 17;
  const fullvalue = value;

  if (shortify) {
    if (value.length > n) {
      if (value[n - 1] === " ") {
        value = value.slice(0, n - 1) + "...";
      } else {
        value = value.slice(0, n) + "...";
      }
    }
  }

  return (
    <div className={`relative w-full px-4 ${className} text-black/70 `}>
      <p className="text-left">
        <span
          className={` flex w-full gap-1 ${
            name == "Location"
              ? "italic"
              : name == "Title"
              ? "text-black/90"
              : ""
          }`}
        >
          {name == "Location" ? (
            <LocationSVG></LocationSVG>
          ) : name == "Date" ? (
            <DateSVG />
          ) : name == "Time" ? (
            <ClockSVG />
          ) : name == "Price" ? (
            <MoneySVG />
          ) : (
            ""
          )}
          {value == "nullmin" ? (
            "Not specified"
          ) : (
            <span>
              {value}
              {currency} {additionnalValue ? "/" : ""} {additionnalValue}
            </span>
          )}
        </span>
      </p>
    </div>
  );
}
