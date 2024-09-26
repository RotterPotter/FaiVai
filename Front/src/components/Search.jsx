import React from "react";
import SearchSVG from "../assets/SVG/SearchSVG";

export default function Search({ searchFilters = [] }) {
  return (
    <div className="flex gap-3 justify-center items-center text-xs sm:text-base border border-green-600 rounded-full px-5 sm:px-10 py-1 w-full max-w-[1000px]">
      <SearchSVG className="hidden sm:flex mr-2" />
      <SearchSVG small={true} className="sm:hidden" />
      <p className="flex-grow w-auto border-r border-black text-gray-500 mr-2 sm:mr-4">
        Type location...
      </p>
      {searchFilters.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}
