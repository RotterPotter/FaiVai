import React from "react";
import { useState } from "react";
import Spinner from "../components/Spinner";
import ArrowSVG from "../assets/SVG/ArrowSVG";
import { useNavigate } from "react-router-dom";

export default function PostOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState(null);
  const [isCategorySelecting, setIsCategorySelecting] = useState(false);
  const [location, setLocation] = useState(null);
  const [isLocationSelecting, setIsLocationSelecting] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("EUR (€)");
  const [isCurrencySelecting, setIsCurrencySelecting] = useState(false);
  const [owner_id, setOwnerId] = useState("1");
  const navigate = useNavigate();

  const [datetime, setDatetime] = useState("");

  const handleInvalid = (e) => {
    e.preventDefault();
    const { name, validationMessage } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationMessage }));
  };

  const handleInput = (e) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!category) newErrors.category = "Category is required";
    if (!datetime) newErrors.datetime = "Date and time are required";
    if (!description) newErrors.description = "Description is required";
    if (!price) newErrors.price = "Price is required";
    if (!location) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createOffer = async () => {
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(async () => {
        const response = await fetch("http://localhost:8000/offers/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            owner_id,
            title,
            category,
            location,
            datetime,
            description,
            price,
          }),
        });

        if (response.ok) {
          console.log("Offer created");
          navigate("/");
        } else {
          console.error("Error");
        }

        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action="POST"
        onSubmit={(e) => {
          e.preventDefault();
          createOffer();
        }}
        className={`relative flex flex-col items-center w-full sm:max-w-[500px] space-y-3 border border-black/15 shadow-2xl px-20 py-9 rounded-3xl -mt-24 ${
          isLoading ? "opacity-100" : ""
        }`}
      >
        {isLoading && (
          <div className="absolute z-40 inset-0 m-auto flex shadow-xl justify-center items-center bg-white/70 rounded-3xl ">
            <Spinner></Spinner>
          </div>
        )}
        <span className="text-2xl font-medium pb-8">Post Offer</span>
        <div className="w-full">
          <input
            required
            type="text"
            name="title"
            placeholder="Title"
            className="input-reset w-full h-[50px] rounded-full p-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onInvalid={handleInvalid}
            onInput={handleInput}
          />
          {errors.title && (
            <span className="text-red-500 px-5">{errors.title}</span>
          )}
        </div>
        <div className="w-full">
          <button
            type="button"
            onClick={() => setIsCategorySelecting(!isCategorySelecting)}
            className={`" w-full h-[50px] relative rounded-full p-4  text-left flex justify-between items-center ${
              isCategorySelecting
                ? " border-2 border-green-500"
                : "border border-black/70 "
            }
            ${category ? "text-black" : "text-black/50"}
            `}
          >
            <span>{category || "Select category"}</span>
            <ArrowSVG></ArrowSVG>
            {isCategorySelecting && (
              <div className="absolute left-0 top-[50px] w-full max-h-[120px] shadow-2xl flex flex-col bg-white z-50 rounded-lg overflow-y-auto">
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setCategory("Option 1")}
                >
                  Option 1
                </button>
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setCategory("Option 2")}
                >
                  Option 2
                </button>
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setCategory("Option 3")}
                >
                  Option 3
                </button>
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setCategory("Option 4")}
                >
                  Option 4
                </button>
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setCategory("Option 5")}
                >
                  Option 5
                </button>
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setCategory("Option 1")}
                >
                  Option 6
                </button>
              </div>
            )}
          </button>

          {errors.category && (
            <span className="text-red-500 px-5">{errors.category}</span>
          )}
        </div>
        <div className="w-full">
          <button
            type="button"
            onClick={() => setIsLocationSelecting(!isLocationSelecting)}
            className={`" w-full h-[50px] relative rounded-full p-4  text-left flex justify-between items-center ${
              isLocationSelecting
                ? " border-2 border-green-500"
                : "border border-black/70 "
            }
            ${location ? "text-black" : "text-black/50"}
            `}
          >
            <span>{location ? location : "Location"}</span>
            <ArrowSVG></ArrowSVG>
            {isLocationSelecting && (
              <div className="absolute left-0 top-[50px] w-full max-h-[120px] shadow-2xl flex flex-col bg-white z-50 rounded-lg overflow-y-auto">
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setLocation("Option 1")}
                >
                  Option 1
                </button>
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setLocation("Option 2")}
                >
                  Option 2
                </button>
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setLocation("Option 3")}
                >
                  Option 3
                </button>
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setLocation("Option 4")}
                >
                  Option 4
                </button>
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setLocation("Option 5")}
                >
                  Option 5
                </button>
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setLocation("Option 1")}
                >
                  Option 6
                </button>
              </div>
            )}
          </button>

          {errors.location && (
            <span className="text-red-500 px-5">{errors.location}</span>
          )}
        </div>
        <div className="w-full">
          <input
            required
            type="datetime-local"
            name="datetime"
            className={`input-reset w-full h-[50px] rounded-full p-4 ${
              datetime ? "text-black" : "text-black/50"
            }`}
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            onInvalid={handleInvalid}
            onInput={handleInput}
          />
          {errors.datetime && (
            <span className="text-red-500 px-5">{errors.datetime}</span>
          )}
        </div>
        <div className="w-full">
          <textarea
            required
            placeholder="Description"
            className={`input-reset w-full h-[150px] rounded-3xl p-4 resize-none ${
              description ? "text-black" : "text-black/50"
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onInvalid={handleInvalid}
            onInput={handleInput}
          />
        </div>
        <div className="w-full flex gap-2">
          <input
            required
            type="number"
            name="price"
            placeholder="Price"
            className="input-reset w-full h-[50px] rounded-full p-4"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onInvalid={handleInvalid}
            onInput={handleInput}
            min="0"
            step="1"
          />
          <button
            type="button"
            onClick={() => setIsCurrencySelecting(!isCurrencySelecting)}
            className={`" w-full  h-[50px] relative rounded-full p-4 px-6 text-left flex justify-between items-center ${
              isCurrencySelecting
                ? " border-2 border-green-500"
                : "border border-black/70 "
            }`}
          >
            <div className="w-full flex justify-between items-center">
              <span className="">{currency}</span>
              <ArrowSVG></ArrowSVG>
            </div>

            {isCurrencySelecting && (
              <div className="absolute left-0 top-[50px] w-full max-h-[120px] shadow-2xl flex flex-col bg-white z-50 rounded-lg overflow-y-auto">
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setCurrency("EUR   €")}
                >
                  EUR (€)
                </button>
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setCurrency("USD ($)")}
                >
                  USD ($)
                </button>
              </div>
            )}
          </button>
        </div>
        {errors.price && (
          <span className="w-full text-left p-0 m-0  text-red-500 px-5">
            {errors.price}
          </span>
        )}

        <button
          type="submit"
          className={` shadow-xl active:shadow-none btn-primary w-full h-[50px] rounded-full p-4 text-white bg-green-500`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
