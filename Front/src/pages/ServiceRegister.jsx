import { useEffect, useState } from "react";
import ArrowSVG from "../assets/SVG/ArrowSVG";
import Spinner from "../components/Spinner";
import GreenCircle from "../assets/SVG/GreenCircleSVG";
import { set } from "date-fns";

export default function ServiceRegister() {
  // page
  const [stage, setStage] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  // errors
  const [errors, setErrors] = useState(null);

  // category
  const categories = ["Cleaning", "Gardening", "Moving", "Painting", "Other"];
  const [category, setCategory] = useState(null);
  const [isCategorySelecting, setIsCategorySelecting] = useState(false);

  // service type
  const serviceTypes = ["One-time", "Recurring"];
  const [serviceType, setServiceType] = useState(null);
  const [isServiceTypeSelecting, setIsServiceTypeSelecting] = useState(false);

  // price
  const [price, setPrice] = useState(null);

  // units of measurement
  const units = ["m2", "hour"];
  const [unit, setUnit] = useState(units[0]);
  const [isUnitSelecting, setIsUnitSelecting] = useState(false);

  // address
  const [selectingMode, setSelecingMode] = useState("address");
  const [address, setAddress] = useState(null);

  // duration per unit
  const [duration, setDuration] = useState(null);
  const times = ["days", "hours", "minutes"];
  const [selectedTime, setSelectedTime] = useState("hours");
  const [isTimeSelecting, setIsTimeSelecting] = useState(false);

  // available days, hours
  const [availableDays, setAvailableDays] = useState([]);
  const [selectingDay, setSelectingDay] = useState(null);

  const handleDayClick = (day) => {
    if (availableDays.includes(day)) {
      setAvailableDays((prevDays) =>
        prevDays.filter((prevDay) => prevDay !== day)
      );
      if (selectingDay === day) {
        setSelectingDay(null);
      }
    } else {
      setAvailableDays((prevDays) =>
        prevDays.includes(day) ? prevDays : [...prevDays, day]
      );
      setSelectingDay(day);
    }
  };

  const handleContinueButtonClick = () => {
    if (stage === 0) {
      if (category === null) {
        setErrors("Please select a category");
      } else {
        setStage(stage + 1);
      }
    } else if (stage === 1) {
      if (serviceType === null) {
        setErrors("Please select a service type");
      } else {
        setStage(stage + 1);
      }
    } else if (stage === 2) {
      if (price === null) {
        setErrors("Please set a price");
      } else if (unit !== "hour" && duration === null) {
        setErrors("Type your speed of work");
      } else {
        setStage(stage + 1);
      }
    } else if (stage === 3) {
      if (address === null) {
        setErrors("Select location ");
      } else {
        setStage(stage + 1);
      }
    }
  };

  // handle selecting between address and zone location
  const handleModeChange = (e) => {
    if (e === "address") {
      setSelecingMode("address");
    } else if (e === "zone") {
      setSelecingMode("zone");
    }
  };

  // set errors to null when category changes
  useEffect(() => {
    setErrors(null);
  }, [category, serviceType, price]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [stage]);

  const registerService = async () => {};

  return (
    <div className="flex justify-center items-center h-screen pb-[160px]">
      <form
        action="POST"
        className={`relative flex flex-col items-center w-full sm:max-w-[500px] space-y-3 border border-black/15 shadow-2xl px-20 py-9 rounded-3xl
            ${isLoading ? "opacity-100" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          registerService();
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center z-50 w-full h-full bg-white/50">
            <Spinner></Spinner>
          </div>
        )}

        {stage >= 1 && (
          <div className="w-full -ml-20 h-[30px]">
            <button
              type="button"
              onClick={() => setStage(stage - 1)}
              className="flex gap-1 justify-center items-center"
            >
              <ArrowSVG degree={90} /> Back
            </button>
          </div>
        )}

        <span className="text-2xl font-medium pb-8 ">
          {stage === 0
            ? "Select category"
            : stage === 1
            ? "Select service type"
            : stage === 2
            ? "Set a price"
            : stage === 3
            ? "Select working location"
            : stage === 4
            ? "When are you available?"
            : ""}
        </span>
        {stage === 0 ? (
          <div className="w-full">
            <button
              type="button"
              name="category"
              onClick={() => setIsCategorySelecting(!isCategorySelecting)}
              className={`w-full h-[50px] relative rounded-full p-4 text-left flex justify-between items-center ${
                isCategorySelecting
                  ? "border-2 border-green-500"
                  : "border border-black/70"
              } ${category ? "text-black" : "text-black/50"}`}
            >
              <span>{category || "Select category"}</span>
              <ArrowSVG />
              <div
                className={`absolute left-0 top-[50px] w-full max-h-[120px] shadow-2xl flex flex-col bg-white z-50 rounded-lg overflow-y-auto transition-opacity duration-200 ${
                  isCategorySelecting
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </button>
          </div>
        ) : stage === 1 ? (
          <div className="w-full">
            <button
              type="button"
              name="service type"
              onClick={() => setIsServiceTypeSelecting(!isServiceTypeSelecting)}
              className={`w-full h-[50px] relative rounded-full p-4 text-left flex justify-between items-center ${
                isServiceTypeSelecting
                  ? "border-2 border-green-500"
                  : "border border-black/70"
              } ${serviceType ? "text-black" : "text-black/50"}`}
            >
              <span>{serviceType || "Select service type"}</span>
              <ArrowSVG />
              <div
                className={`absolute left-0 top-[50px] w-full max-h-[120px] shadow-2xl flex flex-col bg-white z-50 rounded-lg overflow-y-auto transition-opacity duration-200 ${
                  isServiceTypeSelecting
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                {serviceTypes.map((serviceType) => (
                  <button
                    key={serviceType}
                    type="button"
                    className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setServiceType(serviceType)}
                  >
                    {serviceType}
                  </button>
                ))}
              </div>
            </button>
          </div>
        ) : stage === 2 ? (
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex gap-2 items-center">
              <input
                required
                type="number"
                name="price"
                placeholder="Price in EUR"
                className="input-reset w-full h-[50px] rounded-full p-4"
                value={price === null ? "" : price}
                onChange={(e) =>
                  setPrice(e.target.value === "" ? null : e.target.value)
                }
                min="0"
                step="1"
              />
              <span className="">/</span>
              <button
                type="button"
                onClick={() => setIsUnitSelecting(!isUnitSelecting)}
                className={`w-full h-[50px] relative rounded-full p-4 px-6 text-left flex justify-between items-center ${
                  isUnitSelecting
                    ? "border-2 border-green-500"
                    : "border border-black/70"
                }`}
              >
                <div className="w-full flex justify-between items-center">
                  <span className="">{unit}</span>
                  <ArrowSVG />
                </div>

                {isUnitSelecting && (
                  <div className="absolute left-0 top-[50px] w-full max-h-[120px] shadow-2xl flex flex-col bg-white z-50 rounded-lg overflow-y-auto">
                    {units.map((selectedUnit) => (
                      <button
                        key={selectedUnit}
                        type="button"
                        className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setUnit(selectedUnit)}
                      >
                        {selectedUnit}
                      </button>
                    ))}
                  </div>
                )}
              </button>
            </div>
            {unit != "hour" && (
              <div className="w-full flex gap-2 items-center">
                <input
                  required
                  type="number"
                  name="duration"
                  placeholder={`Duration per ${unit}`}
                  className="input-reset w-2/3 h-[50px] rounded-full p-4"
                  value={duration === null ? "" : duration}
                  onChange={(e) =>
                    setDuration(e.target.value === "" ? null : e.target.value)
                  }
                  min="1"
                  max={60}
                  step="1"
                />

                <button
                  type="button"
                  onClick={() => setIsTimeSelecting(!isTimeSelecting)}
                  className={`w-1/3 h-[50px] relative rounded-full p-4 px-6 text-left flex justify-between items-center ${
                    isTimeSelecting
                      ? "border-2 border-green-500"
                      : "border border-black/70"
                  }`}
                >
                  <div className="w-full flex justify-between items-center">
                    <span className="">{selectedTime}</span>
                    <ArrowSVG />
                  </div>

                  {isTimeSelecting && (
                    <div className="absolute left-0 top-[50px] w-full max-h-[120px] shadow-2xl flex flex-col bg-white z-50 rounded-lg overflow-y-auto">
                      {times.map((selectedTime) => (
                        <button
                          key={selectedTime}
                          type="button"
                          className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setSelectedTime(selectedTime)}
                        >
                          {selectedTime}
                        </button>
                      ))}
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : stage === 3 ? (
          <div className="w-full">
            <div className="w-full flex items-center gap-10 justify-center -mt-8 pb-5 text-lg ">
              <button
                type="button"
                onClick={() => handleModeChange("address")}
                className={`flex flex-col justify-center items-center hover:text-green-600  ${
                  selectingMode === "address" ? "text-black" : "text-gray-500"
                }`}
              >
                Address
                <GreenCircle
                  active={selectingMode === "address" ? "true" : ""}
                ></GreenCircle>
              </button>
              <span className="text-xl">|</span>
              <button
                type="button"
                onClick={() => handleModeChange("zone")}
                className={`flex flex-col justify-center items-center hover:text-green-500  ${
                  selectingMode === "zone" ? "text-black" : "text-gray-500"
                }`}
              >
                Zone
                <GreenCircle
                  active={selectingMode === "zone" ? "true" : ""}
                ></GreenCircle>
              </button>
            </div>
            {selectingMode === "address" && (
              <input
                required
                type="text"
                name="address"
                placeholder="Type address"
                className="input-reset w-full h-[50px] rounded-full p-4"
                value={address === null ? "" : address}
                onChange={(y) =>
                  setAddress(y.target.value === "" ? null : y.target.value)
                }
              />
            )}

            {selectingMode === "zone" && (
              <div className="w-full flex justify-center items-center pb-5">
                <button
                  type="button"
                  className="border px-3 py-2 rounded-full shadow-lg hover:border-green-500 active:shadow-none"
                >
                  Draw your zone
                </button>
              </div>
            )}
          </div>
        ) : stage === 4 ? (
          <div className="w-full mb-10">
            <div>
              <span>Select available days in a week</span>
              <div className="flex flex-wrap w-full gap-2">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <div>
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayClick(day)}
                      className={`p-2 relative rounded border-2 ${
                        availableDays.includes(day)
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {day}
                    </button>
                    <div
                      className={` w-[300px] h-full  absolute bg-red-500 rounded-3xl z-50 ${
                        selectingDay === day ? "block" : "hidden"
                      }`}
                    >
                      skdjsjd
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {errors && (
          <span className="w-full text-left p-0 m-0 text-red-500 px-5">
            {errors}
          </span>
        )}
        <button
          type="button"
          onClick={handleContinueButtonClick}
          className="shadow-xl active:shadow-none btn-primary w-full h-[50px] rounded-full p-4 text-white bg-green-500"
        >
          Continue
        </button>
      </form>
    </div>
  );
}