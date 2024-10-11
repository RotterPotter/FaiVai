import React from "react";

export default function OffersCardField({ name, value }) {
  const n = 14;
  if (value.length > n) {
    if (value[n - 1] === " ") {
      value = value.slice(0, n - 1) + "...";
    } else {
      value = value.slice(0, n) + "...";
    }
  }

  return (
    <div className="w-full px-2">
      <p className="px-1 text-left">
        <span className="text-gray-500 ">{name}: </span>
        {value}
      </p>
    </div>
  );
}
