import React from "react";

export default function Search({ small = false, className = "" }) {
  const dimensions = small
    ? { width: "12px", height: "18px" }
    : { width: "20px", height: "30px" };
  return (
    <svg
      className={className}
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 36 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.1464 22.929C8.06832 22.929 2.33049 18.2307 2.33049 12.4258C2.33049 6.62083 8.06832 1.91314 15.1464 1.91314C22.2245 1.91314 27.9635 6.62083 27.9635 12.4258C27.9635 18.2307 22.2245 22.929 15.1464 22.929ZM35.6582 28.3683L26.3644 20.744C28.7973 18.5402 30.2928 15.633 30.2928 12.4258C30.2928 5.56112 23.5118 0 15.1464 0C6.78099 0 0 5.56112 0 12.4258C0 19.2811 6.78099 24.8422 15.1464 24.8422C18.7608 24.8422 22.076 23.8013 24.6799 22.0663L34.0108 29.7187C34.4665 30.0938 35.2036 30.0938 35.6582 29.7187C36.1139 29.3529 36.1139 28.7434 35.6582 28.3683Z"
        fill="black"
      />
    </svg>
  );
}
