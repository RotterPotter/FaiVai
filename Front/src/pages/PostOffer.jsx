import React from "react";
import { useState } from "react";
import Spinner from "../components/Spinner";
import ArrowSVG from "../assets/SVG/ArrowSVG";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PostOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState(null);
  const [isCategorySelecting, setIsCategorySelecting] = useState(false);
  const [location, setLocation] = useState(null);
  const [isLocationSelecting, setIsLocationSelecting] = useState(false);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [currency, setCurrency] = useState("$");
  const [isCurrencySelecting, setIsCurrencySelecting] = useState(false);
  const navigate = useNavigate();
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const categories = ["cleaning", "gardening", "moving", "painting", "other"];

  const [owner_id, setOwnerId] = useState("");
  const [owner_name, setOwnerName] = useState("");
  const [owner_rating, setOwnerRating] = useState("");
  const [reviews_count, setReviewsCount] = useState("");

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

  const getUser = async () => {
    const response = await fetch("http://localhost:8000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setOwnerId(data.id);
      setOwnerName(data.firstname + " " + data.lastname);
      setOwnerRating(data.rating);
      setReviewsCount(data.reviews_count);

      console.log(data);
      console.log(owner_id);
    } else {
      console.error("Error");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
    getUser();
  }, []);

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
            owner_name,
            owner_rating,
            reviews_count,
            title,
            category,
            location,
            datetime,
            description,
            price,
            currency,
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

  const suggestLocations = async (string) => {};

  const onChangeLocation = (e) => {
    setLocation(e.target.value);
    suggestLocations(e.target.value);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action="POST"
        onSubmit={(e) => {
          e.preventDefault();
          createOffer();
        }}
        className={`relative flex flex-col items-center w-full sm:max-w-[500px] space-y-3 border border-black/15 shadow-2xl px-20 py-9 rounded-3xl  ${
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
            name="category"
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
            <div
              className={`absolute left-0 top-[50px] w-full max-h-[120px] shadow-2xl flex flex-col bg-white z-50 rounded-lg overflow-y-auto transition-opacity duration-200 ${
                isCategorySelecting
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {categories.map((category) => (
                <button
                  type="button"
                  className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </button>

          {errors.category && (
            <span className="text-red-500 px-5">{errors.category}</span>
          )}
        </div>
        <div className="w-full relative">
          <input
            required
            type="text"
            name="location"
            placeholder="Location"
            className="input-reset w-full h-[50px] rounded-full p-4 "
            value={location}
            onChange={(e) => onChangeLocation(e)}
            onInvalid={handleInvalid}
            onInput={handleInput}
          />
          <div
            className={`absolute left-0 top-[50px] w-full max-h-[120px] custom-scrollbar shadow-2xl flex flex-col bg-white z-50 rounded-lg overflow-y-auto`}
          >
            {locationSuggestions.map((location) => (
              <button
                type="button"
                className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setLocationSuggestions(location)}
              >
                {location}
              </button>
            ))}
          </div>
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
            name="description"
            className={`input-reset w-full h-[150px] rounded-3xl p-4 resize-none ${
              description ? "text-black" : "text-black/50"
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onInvalid={handleInvalid}
            onInput={handleInput}
          />
          {errors.description && (
            <span className="text-red-500 px-5">{errors.description}</span>
          )}
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
