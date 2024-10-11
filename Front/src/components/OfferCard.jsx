import React, { useState } from "react";
import JobIcon from "./JobIcon";
import Ava from "./Ava";
import Rating from "./Rating";
import OffersCardField from "./OffersCardField";
import { Link } from "react-router-dom";

export default function OfferCard({
  id,
  iconType,
  location,
  datetime,
  fullname,
  ratingScore,
  ratingQuantity,
  title,
  category,
  price,
}) {
  const date = new Date(datetime);
  const date_formated = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const time = date.toLocaleTimeString();
  const time_formated = time.slice(0, 4) + " " + time.slice(-2);

  const [isHidden, setIsHidden] = useState(true);

  return (
    <Link to={`/offers/detail/${id}`}>
      <div className="flex flex-col font-semibold justify-between border hover:shadow-green-500/30 border-green-500 text-sm hover:shadow-2xl  hover:-translate-y-1 shadow-lg w-[200px] h-[280px] rounded-3xl bg-white text-black/70">
        <div className="flex flex-col">
          <div className="w-full h-[60px] bg-green-500  rounded-t-3xl flex flex-col  justify-center items-center mb-2">
            <JobIcon iconType={iconType}></JobIcon>
            <p className="text-white ">{category}</p>
          </div>
          <OffersCardField name="Title" value={title}></OffersCardField>
          <OffersCardField name="Location" value={location}></OffersCardField>
          <OffersCardField name="Date" value={date_formated}></OffersCardField>
          <OffersCardField name="Time" value={time_formated}></OffersCardField>
          <OffersCardField name="Price" value={price}></OffersCardField>
        </div>
        <div className="flex flex-col mb-2">
          <div className="w-full flex px-2 gap-2 mb-1 text-xs text-bold">
            <Ava></Ava>
            <div className="w-full flex flex-col">
              <span className="text-left ">{fullname}</span>
              <Rating
                ratingScore={ratingScore}
                ratingQuantity={ratingQuantity}
              ></Rating>
            </div>
          </div>
          <span className="w-full text-right text-xs text-gray-500 px-2">
            2 hours ago
          </span>
        </div>
      </div>
    </Link>
  );
}
