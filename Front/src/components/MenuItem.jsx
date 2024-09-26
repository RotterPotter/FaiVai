import React from "react";
import { Link } from "react-router-dom";

export default function MenuItem({ linkTo, name, svg = null }) {
  return (
    <Link
      to={linkTo}
      className="text-black hover:text-green-600 flex justify-center gap-1 items-center"
    >
      {svg && svg}
      {name}
    </Link>
  );
}
