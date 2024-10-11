import React from "react";
import OfferCard from "../components/OfferCard";
import { useState, useEffect } from "react";
import "../index.css";

export default function OffersCatalog() {
  const [offers, setOffers] = useState([]);

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

  useEffect(() => {
    takeAllOffers();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-[100px] gap-5">
      <p className="text-center text-xl sm:text-3xl">
        <div className="text-green-500">Catalog</div>
      </p>
      <div className="flex flex-wrap justify-center items-start w-full max-w-[1300px]  border-2 border-green-500 sm:h-[650px] p-10 gap-10 rounded-2xl max-h-[650px] overflow-y-auto custom-scrollbar">
        {offers.map((offer) => (
          <OfferCard
            owner_id={offer.owner_id}
            iconType={offer.category}
            // iconType={"cleaning"}
            description={offer.description}
            title={offer.title}
            location={offer.location}
            datetime={offer.datetime}
            fullname={offer.owner_name}
            ratingScore={offer.owner_rating}
            ratingQuantity={offer.reviews_count}
            category={offer.category}
            price={offer.price}
            created_at={offer.created_at}
          />
        ))}
      </div>
    </div>
  );
}
