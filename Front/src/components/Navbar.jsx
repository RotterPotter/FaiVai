import React, { useState, useEffect, useContext } from "react";

import LanguageSVG from "../assets/SVG/LanguageSVG.jsx";
import Menu from "./Menu.jsx";
import FindWJ from "./FindWJ.jsx";
import { Link } from "react-router-dom";

import Logout from "./Logout.jsx";
import { UserContext } from "../context/UserContext.jsx";


export default function Navbar() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [, , language, setLanguage] = useContext(UserContext);
  const [availableLanguages, setAvailableLanguages] = useState([
    "English",
    "Italiano",
    "Russian",
  ]);

  const [isScrolled, setIsScrolled] = useState(false);

  

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

  const handleLanguageSelect = (selectedLanguage) => {
    if (selectedLanguage === "English") {
      selectedLanguage = "en";
    } else if (selectedLanguage === "Italiano") {
      selectedLanguage = "it";
    } else if (selectedLanguage === "Russian") {
      selectedLanguage = "ru";
    }
    setLanguage(selectedLanguage);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 flex justify-between  items-center py-4 px-8 xl:px-12 2xl:px-48 h-[60px] shadow-md z-50 transition-colors duration-500 ${
        isScrolled ? "bg-navbarBG" : "bg-navbarBG"
      }`}
    >
      <Link to={"/"} className="text-2xl text-green-600 font-bold">
        Fai&Vai
      </Link>
      <FindWJ />
      <div className="hidden sm:inline-flex gap-4 items-center p-0 m-0 border-0">
        <button
          className="relative"
          type="button"
          onClick={() => setIsLanguageOpen(!isLanguageOpen)}
        >
          <LanguageSVG />
          {isLanguageOpen && (
            <div className="absolute top-7  z-50 rounded-lg shadow-xl border border-black/15">
              {availableLanguages.map((availableLanguage) => (
                <button
                  type="button"
                  className={`w-full first:rounded-t-lg last:rounded-b-lg  p-1 px-3 ${
                    (availableLanguage.startsWith(language[0].toUpperCase()) )
                      ? "bg-green-500  text-white"
                      : "bg-white hover:bg-gray-200  "
                  }`}
                  key={availableLanguage}
                  onClick={() => handleLanguageSelect(availableLanguage)}
                >
                  {availableLanguage}
                </button>
              ))}
            </div>
          )}
        </button>

        <Menu></Menu>
      </div>
      <div className="sm:hidden flex justify-center items-center"></div>
    </div>
  );
}
