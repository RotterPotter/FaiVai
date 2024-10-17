import React, { useEffect, useState } from "react";
import OffersCardField from "../components/OffersCardField";
import { Link } from "react-router-dom";
import ArrowSVG from "../assets/SVG/ArrowSVG";

export default function OfferDetails() {
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [offer, setOffer] = useState("");
  const [datetime, setDatetime] = useState(null);
  const date = new Date(datetime);
  const date_formated = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const time = date.toLocaleTimeString();
  let time_formated = "";

  if (time.startsWith("1")) {
    time_formated = time.slice(0, 5) + " " + time.slice(-2);
  } else {
    time_formated = time.slice(0, 4) + " " + time.slice(-2);
  }

  const getOffer = async () => {
    try {
      const response = await fetch(`http://localhost:8000/offers/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setOffer(data);
      setDatetime(data.datetime);
    } catch (error) {
      console.error("Failed to fetch offer:", error);
    }
  };

  useEffect(() => {
    getOffer();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-start p-5 shadow-2xl border border-green-500 w-full max-w-[300px] rounded-2xl">
        <Link
          to="/offers/catalog"
          className="flex gap-1 justify-center items-center"
        >
          <ArrowSVG degree={90} /> Back
        </Link>
        <div className="flex flex-col p-5 gap-3">
          <h1 className="text-2xl font-bold">{offer.title}</h1>
          <p>{offer.description}</p>
          <p>{offer.location}</p>
          <p>{date_formated}</p>
          <p>{time_formated}</p>
          <p>{offer.price}</p>

          <button>take a job</button>
        </div>
      </div>
    </div>
  );
}
