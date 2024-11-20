import React, { useState, useEffect } from "react";
import NewServiceCard from "../components/NewServiceCard";
import "../index.css";
import FilterSVG from "../assets/SVG/FIlterSVG";
import CloseSVG from "../assets/SVG/CloseSVG";
import ArrowSVG from "../assets/SVG/ArrowSVG";

import Spinner from "../components/Spinner";

export default function ServicesCatalog() {
  
  const [services, setServices] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenSortBy, setIsOpenSortBy] = useState(false);
  const [sortType, setSortType] = useState("none");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const takeFilteredServices = async () => {
    setIsLoading(true);
    try {
      console.log(typeof availbaldeDaysAndHours);
      const response = await fetch("http://localhost:8000/services/find", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_type_id: parseInt(localStorage.getItem("service_type_id"), 10),
          location_type: localStorage.getItem("location_type"),
          location_or_zone: localStorage.getItem("location_or_zone"),
          unit: localStorage.getItem("unit"),
          work_quantity: localStorage.getItem("work_quantity"),
          year_month_day_hours_minutes: JSON.parse(localStorage.getItem("year_month_day_hours_minutes")),
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setServices(data);
      } else {
        const data = await response.json();
        setErrors(data.message);
      }
    } catch (error) {
      setErrors(error.message);
    }
    setIsLoading(false);
  };

  const handleFilterButtonClick = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const handleSortButtonClick = () => {
    setIsOpenSortBy(!isOpenSortBy);
  };

  const handleSortSelected = (e) => {
    setSortType(e);
    setIsOpenSortBy(false);
  };

  useEffect(() => {
    takeFilteredServices();
  }, [sortType]);

  return (
    <div
      className={`relative flex flex-col w-full justify-center items-center mt-[80px] gap-5
      }`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center z-50 w-full h-full bg-white/50">
          <Spinner></Spinner>
        </div>
      )}
      <div className="relative flex flex-col w-full max-w-[1300px] gap-3 justify-center items-center border border-black/15 bg-gray-200 rounded-2xl pt-4">
        <div className="w-full px-14 h-[50px] flex justify-between items-center">
          <button
            type="button"
            onClick={handleFilterButtonClick}
            className="p-1 hover:border-2 hover:shadow-none border-green-500 rounded-xl"
          >
            <FilterSVG />
          </button>
          <div className="relative w-[150px]">
            <button
              type="button"
              onClick={handleSortButtonClick}
              className="flex flex-col px-2 "
            >
              <div className="flex gap-2   justify-center items-center">
                Sorted by{" "}
                <ArrowSVG
                  small={true}
                  degree={isOpenSortBy ? "180" : "0"}
                ></ArrowSVG>
              </div>
              <p className="text-black/50">
                {sortType === "null"
                  ? ""
                  : sortType === "created_at_desc"
                  ? "newest"
                  : sortType === "created_at_asc"
                  ? "latest"
                  : sortType === "price_h"
                  ? "price (highest)"
                  : sortType === "price_l"
                  ? "price (lowest)"
                  : sortType === "rating_h"
                  ? "rating (highest)"
                  : sortType === "rating_l"
                  ? "rating (lowest)"
                  : sortType}
              </p>
            </button>
            <div
              className={`absolute text-black/50   top-6 border border-black/15 bg-gray-200 shadow-xl  text-nowrap rounded-xl z-50  flex flex-col justify-start transition-opacity duration-200 items-center ${
                isOpenSortBy ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <button
                className="text-left w-full hover:bg-gray-300 px-2 py-1 rounded-t-xl "
                onClick={() => handleSortSelected("created_at_desc")}
                type="button"
              >
                newest
              </button>
              <button
                className="text-left w-full hover:bg-gray-300 px-2 py-1  "
                onClick={() => handleSortSelected("created_at_asc")}
                type="button"
              >
                latest
              </button>
              <button
                className="text-left w-full hover:bg-gray-300 px-2 py-1  "
                onClick={() => handleSortSelected("price_h")}
                type="button"
              >
                price (highest)
              </button>
              <button
                className="text-left w-full hover:bg-gray-300 px-2 py-1  "
                onClick={() => handleSortSelected("price_l")}
                type="button"
              >
                price (lowest)
              </button>
              <button
                className="text-left w-full hover:bg-gray-300 px-2 py-1  "
                onClick={() => handleSortSelected("rating_h")}
                type="button"
              >
                rating (highest)
              </button>
              <button
                className="text-left w-full hover:bg-gray-300 px-2 py-1  "
                onClick={() => handleSortSelected("rating_l")}
                type="button"
              >
                rating (lowest)
              </button>
            </div>
          </div>
        </div>
        <div
          className={`absolute pl-5 flex flex-col w-[400px] inset-y-0 left-0  bg-white rounded-2xl z-50 border border-black/15 transition-transform duration-300
            ${
              isOpenFilter
                ? "transform translate-x-0 "
                : "transform -translate-x-[1000px] "
            }`}
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
        <div className="flex flex-wrap  justify-center items-start w-full max-w-[1300px] sm:h-[650px] p-10 py-3 gap-10 max-h-[650px] overflow-y-auto custom-scrollbar">
          {services.map((service) => (
            <NewServiceCard 
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
