// import React from "react";

// export default function Spinner() {
//   return (
//     <div className="flex justify-center items-center h-full">
//       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
//     </div>
//   );
// }

import React from "react";
import "./Spinner.css"; // Import the CSS file for spinner styles

export default function Spinner() {
  return (
    <div className="  flex justify-center items-center h-full space-x-2">
      <div className="dot-pulse"></div>
      <div className="dot-pulse"></div>
      <div className="dot-pulse"></div>
    </div>
  );
}

// import React from "react";
// import "./Spinner.css";

// export default function Spinner() {
//   return (
//     <div className="flex justify-center items-center h-full">
//       <div className="dual-ring"></div>
//     </div>
//   );
// }
