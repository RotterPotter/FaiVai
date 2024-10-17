import React from "react";
import RatingStar from "./RatingStar";

export default function Rating({ ratingScore, ratingQuantity }) {
  let stars = [];

  for (let i = 0; i < 5; i++) {
    if (ratingScore > 1) {
      stars.push(1);
    } else if (ratingScore === 0.5) {
      stars.push(0.5);
    } else {
      stars.push(0);
    }
    ratingScore -= 1;
  }

  return (
    <div className="flex gap-1 items-center">
      {stars.map((star) => {
        return <RatingStar type={star}></RatingStar>;
      })}
      <span className="text-black/70">({ratingQuantity})</span>
    </div>
  );
}
