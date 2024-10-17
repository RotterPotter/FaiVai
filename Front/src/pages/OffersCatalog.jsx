import React, { useState, useEffect } from "react";
import OfferCard from "../components/OfferCard";
import "../index.css";
import FilterSVG from "../assets/SVG/FIlterSVG";
import CloseSVG from "../assets/SVG/CloseSVG";

export default function OffersCatalog() {
  const [offers, setOffers] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const takeAllOffers = async () => {
    try {
      const response = await fetch("http://localhost:8000/offers/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    }
  };

  const handleFilterButtonClick = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  useEffect(() => {
    takeAllOffers();
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center mt-[80px] gap-5">
      <div className="relative flex flex-col w-full max-w-[1300px] gap-3 justify-center items-center border border-black/15 bg-gray-200 rounded-2xl pt-4">
        <div className="w-full px-14 h-[50px] flex justify-start items-center">
          <button
            type="button"
            onClick={handleFilterButtonClick}
            className="p-1 hover:border-2 hover:shadow-none border-green-500 bg-white rounded-xl shadow-xl"
          >
            <FilterSVG />
          </button>
        </div>
        <div
          className={`absolute pl-5 flex flex-col w-[400px] inset-y-0 left-0  bg-white rounded-2xl z-50 border border-black/15 transition-transform duration-300 
            ${
              isOpenFilter
                ? "transform translate-x-0 "
                : "transform -translate-x-full "
            } `}
          style={{ visibility: isOpenFilter ? "visible" : "hidden" }}
        >
          <div className="w-full flex justify-end items-center p-2">
            <button type="button" onClick={handleFilterButtonClick}>
              <CloseSVG></CloseSVG>
            </button>
          </div>
          <div>Filter1</div>
          <div>Filter1</div>
          <div>Filter1</div>
          <div>Filter1</div>
        </div>
        <div className="flex flex-wrap justify-center items-start w-full max-w-[1300px] sm:h-[650px] p-10 py-3 gap-10 max-h-[650px] overflow-y-auto custom-scrollbar">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              id={offer.id}
              owner_id={offer.owner_id}
              description={offer.description}
              title={offer.title}
              location={offer.location}
              datetime={offer.datetime}
              fullname={offer.owner_name}
              ratingScore={offer.owner_rating}
              ratingQuantity={offer.reviews_count}
              category={offer.category}
              price={offer.price}
              currency={offer.currency}
              createdAt={offer.created_at}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
