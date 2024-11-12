import React from "react";
import good from "../assets/good.png";
import default_avatar from "../assets/default_avatar.png";

export default function Ava() {
  return (
    <img
      src={default_avatar}
      alt="Description of image"
      className="w-10 h-10 rounded-full border border-black/70"
    />
  );
}
