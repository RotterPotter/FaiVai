import React from "react";

export default function Arrow({ small = false, degree = 0, color="#52525b" }) {
  const dimensions = small
    ? { width: "8px", height: "10px" }
    : { width: "12px", height: "20px" };

  return (
    <svg
      className={`transition-transform duration-200 `}
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 20 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${degree}deg)` }}
    >
      <path
        d="M0.443882 0.852457C-0.147959 1.52176 -0.147959 2.60701 0.443882 3.27629L7.85863 11.6529C9.04247 12.9904 10.9609 12.9899 12.1443 11.6519L19.5561 3.27012C20.148 2.60084 20.148 1.51559 19.5561 0.84627C18.9642 0.176935 18.0046 0.176935 17.4127 0.84627L11.069 8.02007C10.4771 8.68953 9.51745 8.68953 8.92561 8.02007L2.58724 0.852457C1.9954 0.183122 1.03587 0.183122 0.443882 0.852457Z"
        fill={color}
      />
    </svg>
  );
}
