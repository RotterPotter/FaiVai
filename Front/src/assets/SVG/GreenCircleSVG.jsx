import React from "react";

export default function GreenCircle({ active = false }) {
  const color = active ? "#38A700" : "transparent";

  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7.5" cy="7.5" r="7.5" fill={color} />
    </svg>
  );
}
