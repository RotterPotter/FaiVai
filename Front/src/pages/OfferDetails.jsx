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
  console.log(time.length);

  if (time.length === 11) {
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
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-start  w-full  max-w-[1000px] h-screen mt-[100px] ">
        <Link
          to="/offers/catalog"
          className=" left-10 flex gap-1 justify-center items-center"
        >
          <ArrowSVG degree={90} /> Back
        </Link>
        <div className="flex w-full justify-between mt-[74px]">
          <div className=" flex flex-col p-5 gap-3 w-[400px] bg-gray-100 border border-black/15 rounded-2xl">
            <OffersCardField
              shortify={false}
              name={"ID"}
              value={offer.id}
            ></OffersCardField>
            <OffersCardField
              shortify={false}
              name={"Category"}
              value={offer.category}
            ></OffersCardField>
            <OffersCardField
              shortify={false}
              name={"Title"}
              value={offer.title}
            ></OffersCardField>
            <OffersCardField
              shortify={false}
              name={"Date"}
              value={date_formated}
            ></OffersCardField>
            <OffersCardField
              shortify={false}
              name={"Time"}
              value={time_formated}
            ></OffersCardField>

            <OffersCardField
              shortify={false}
              name={"Location"}
              value={offer.location}
            ></OffersCardField>
            <OffersCardField
              shortify={false}
              name={"Price"}
              value={offer.price + offer.currency}
            ></OffersCardField>
          </div>
          <div className=" mx-[50px] w-full flex flex-col justify-between items-center ">
            <div className="text-left p-5 rounded-2xl bg-gray-100 border border-black/15 flex flex-col gap-5">
              <span className="text-gray-500">Description</span>
              <div>{offer.description}</div>
            </div>
            <button className="text-white text-center bg-green-600 rounded-full w-[160px] h-[40px] mb-20">
              Take a job
            </button>
          </div>

          <div className="rounded-2xl w-[400px] h-[200px] bg-gray-100 border border-black/15 "></div>
        </div>
      </div>
    </div>
  );
}
