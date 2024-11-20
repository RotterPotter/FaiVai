import React from "react";
import RatingStar from "./RatingStar";

export default function Rating({ ratingScore, ratingQuantity, starSize }) {
  let stars = [];

  for (let i = 0; i < 5; i++) {
    if (ratingScore >= 1) {
      stars.push(1);
      ratingScore -= 1;
    } else if (!Number.isInteger(ratingScore) && ratingScore >= 0.5) {
      stars.push(0.5);
      ratingScore -= 0.5;
    } else {
      stars.push(0);
    }
  }

  return (
    <div className="flex gap-1 items-center justify-center text-center">
      {stars.map((star) => {
        return <RatingStar type={star} starSize={starSize}></RatingStar>;
      })}
        
      {ratingQuantity && (
        <span className={`text-black/70 text-[${starSize}] text-center`}>({ratingQuantity})</span>
      )}
      
    </div>
  );
}
