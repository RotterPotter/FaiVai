import React from "react";

export default function CloseSVG(className) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16px"
      height="16px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <g id="Menu / Close_MD">
          {" "}
          <path
            id="Vector"
            d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
            stroke="#6b7280"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
