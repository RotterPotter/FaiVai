import React, { useDebugValue } from "react";
import SearchSVG from "../assets/SVG/SearchSVG";
import Filter from "./Filter";
import { useState, useEffect } from "react";

export default function Search({name}) {
  const [openFilter, setOpenFilter] = useState(null);
  const [location, setLocation] = useState("");

  return (
    <div className="flex flex-col gap-3 justify-center items-center w-full  max-w-[1000px]">
      <div className="flex gap-3 h-[54px] justify-center items-center text-xs sm:text-base border sm:px-10 px-3 border-green-600 rounded-full  w-full ">
        <SearchSVG className="hidden sm:flex mr-2" />
        <SearchSVG small={true} className="sm:hidden" />
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={name}
          className="w-full m-0 p-0 outline-none focus:placeholder-transparent"
        />
      </div>
    </div>
  );
}

// const handleFilterClick = (filterName) => {
//   setOpenFilter(openFilter === filterName ? null : filterName);
// };

/* <div className="flex flex-row-reverse justify-start gap-10 w-full px-5">
        <Filter
          name="Rating"
          isOpen={openFilter === "Filter 1"}
          onClick={() => handleFilterClick("Filter 1")}
          defaultFilter="All"
        />
        <Filter
          name="Category"
          isOpen={openFilter === "Filter 2"}
          onClick={() => handleFilterClick("Filter 2")}
          defaultFilter="All"
        />
        <Filter
          name="Price"
          isOpen={openFilter === "Filter 3"}
          onClick={() => handleFilterClick("Filter 3")}
          defaultFilter="All"
        />
        <Filter
          name="Distance"
          isOpen={openFilter === "Filter 4"}
          onClick={() => handleFilterClick("Filter 4")}
          defaultFilter="All"
        />
      </div> */
