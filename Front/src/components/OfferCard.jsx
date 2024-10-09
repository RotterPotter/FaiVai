import React from "react";
import JobIcon from "./JobIcon";
import Ava from "./Ava";
import Rating from "./Rating";

export default function OfferCard({
  owner_id,
  iconType,
  description,
  location,
  datetime,
  fullname,
  ratingScore,
  ratingQuantity,
  title,
}) {
  return (
    <div className="flex flex-col justify-between text-sm items-center gap-1 p-3 w-[200px] h-[270px] bg-white border border-green-500 rounded-3xl ">
      <div className="flex justify-center items-center ">
        <JobIcon iconType={"cleaning"}></JobIcon>
      </div>
      <div></div>
      <p className="font-bold">{title}</p>
      <span className="text-sm w-full text-left ">{location}</span>
      <span className="text-sm w-full text-left">{datetime}</span>
      <div className="flex justify-start items-center gap-3 w-full ">
        <Ava></Ava>
        <span className="w-full text-left">{fullname}</span>
      </div>
      <div className="w-full flex justify-start ">
        <Rating
          ratingScore={ratingScore}
          ratingQuantity={ratingQuantity}
        ></Rating>
      </div>
    </div>
  );
}
