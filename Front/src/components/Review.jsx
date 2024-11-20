import React, { useState } from "react";
import Dote from "./Dote";
import Gloria from "../assets/Gloria.png";
import Rating from "./Rating";
import Arrow from "../assets/SVG/ArrowSVG";

export default function Review({ authorId, comment, authorName, authorImage, rating, createdAtString }) {
  const [isShowFullText, setIsShowFullText] = useState(false);
  const reviewText = comment;

  const handleSeeMoreCLick = () => {
    setIsShowFullText(!isShowFullText);
  };

  
  return (
    <div>
      <div className="flex gap-2 items-center">
        <div className="w-12 h-12 border border-black rounded-full">
          <img src={authorImage} alt="Gloria" />
        </div>

        <div className="flex flex-col ">
          <div className="flex gap-2 items-center">
            <span className="font-semibold ">{authorName}</span>
            <Dote></Dote>
            <div>{createdAtString}</div>
          </div>
          <div className="flex w-full items-center justify-start">
            <Rating starSize={"16px"} ratingScore={rating}></Rating>
          </div>
        </div>
      </div>

      <div className="p-2 ">
        {reviewText.length >= 200 ? (
          <p>
            {isShowFullText ? (
              <div>
                <p>{reviewText}</p>
                <div className="w-full flex justify-end px-5">
                  <button
                    onClick={handleSeeMoreCLick}
                    className="ml-2 inline-flex gap-2 items-center text-sm font-semibold"
                  >
                    Hide
                    <Arrow degree={isShowFullText ? "180" : "0"} />
                  </button>
                </div>
              </div>
            ) : (
              <span>
                {reviewText.slice(0, 200) + "..."}
                <button
                  onClick={handleSeeMoreCLick}
                  className="ml-2 inline-flex gap-2 items-center text-sm font-semibold "
                >
                  See more
                  <Arrow degree={isShowFullText ? "180" : "0"} />
                </button>
              </span>
            )}
          </p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
