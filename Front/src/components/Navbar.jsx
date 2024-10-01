import React, { useState, useEffect } from "react";
import LanguageSVG from "../assets/SVG/LanguageSVG.jsx";
import Menu from "./Menu.jsx";
import FindWJ from "./FindWJ.jsx";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const menuItems = [
    { linkTo: "/", name: "Home" },
    { linkTo: "/", name: "About" },
    { linkTo: "/login", name: "Login"}
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 flex justify-between items-center py-4 px-8 xl:px-12 2xl:px-48 h-[60px] shadow-md z-50 transition-colors duration-500 ${
        isScrolled ? "bg-gray-200" : "bg-white"
      }`}
    >
      <Link to={'/'} className="text-2xl text-green-600 font-bold">Fai&Vai</Link>
      <FindWJ />
      <div className="hidden sm:inline-flex gap-4 items-center">
        <LanguageSVG />
        <Menu menuItems={menuItems} />
      </div>
      <div className="sm:hidden flex justify-center items-center">
        <Menu menuItems={menuItems} />
      </div>
    </div>
  );
}
