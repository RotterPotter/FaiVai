import React from "react";
import RatingStar from "./RatingStar";

export default function Rating({ ratingScore, ratingQuantity }) {
  return (
    <div className="flex gap-1 items-center">
      <RatingStar type="1"></RatingStar>
      <RatingStar type="1"></RatingStar>
      <RatingStar type="1"></RatingStar>
      <RatingStar type="0.5"></RatingStar>
      <RatingStar type="0"></RatingStar>
      <span className="text-black/70">({ratingQuantity})</span>
    </div>
  );
}
