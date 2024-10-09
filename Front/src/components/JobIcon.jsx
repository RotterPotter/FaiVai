import React from "react";
import CleaningSVG from "../assets/SVG/icons/CleaningSVG";

export default function JobIcon({ iconType }) {
  return <div>{iconType === "cleaning" && <CleaningSVG />}</div>;
}
