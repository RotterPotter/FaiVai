import React from "react";
import Spinner from "./Spinner";

export default function LoadingUI() {
  return (
    <div className="absolute inset-0 flex justify-center items-center z-50 w-full h-full bg-white rounded-3xl ">
      <Spinner></Spinner>
    </div>
  );
}
