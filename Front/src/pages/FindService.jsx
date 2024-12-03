import React, { useEffect } from "react";
import ArrowSVG from "../assets/SVG/ArrowSVG";
import { useState, lazy, Suspense } from "react";
import { set } from "date-fns";
import LoadingUI from "../components/LoadingUI";
import GreenCircle from "../assets/SVG/GreenCircleSVG";
import { useNavigate } from "react-router-dom";

const CleaningSpecification = lazy(() =>
  import("../components/category_specifications/CleaningSpecification")
);

export default function FindService() {
  // page
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const navigate = useNavigate()

  // errors
  const [errors, setErrors] = useState();

  // unit and work quantity
  const [availableUnits, setAvailableUnits] = useState(null);
  const [unit, setUnit] = useState(null);
  const [workQuantity, setWorkQuantity] = useState(null);

  // category
  const [isCategorySelecting, setIsCategorySelecting] = useState(false);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  // Get categories
  const getCategories = async () => {
    try {
      const response = await fetch("http:/api/category/all");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setErrors(error.message);
    }
  };

  // service type
  const [isServiceTypeSelecting, setIsServiceTypeSelecting] = useState(false);
  const [serviceType, setServiceType] = useState(null);
  const [serviceTypes, setServiceTypes] = useState([]);
  // Get service types and available units
  const getServiceTypes = async () => {
    try {
      const response = await fetch("http://localhost:8000/service_type/all");
      const data = await response.json();
      setServiceTypes(data);
    } catch (error) {
      setErrors(error.message);
    }
  };
  // Handle service type selection
  const handleServiceTypeSelection = (serviceType) => {
    setServiceType(serviceType);
    setAvailableUnits(serviceType.available_units);
    setUnit(serviceType.available_units[0]);
    console.log(availableUnits);
  };

  // location
  const [selectingMode, setSelecingMode] = useState("address");
  const [address, setAddress] = useState(null);

  const handleModeChange = (e) => {
    if (e === "address") {
      setSelecingMode("address");
    } else if (e === "zone") {
      setSelecingMode("zone");
    }
  };

  // date
  const now = new Date();
  const [date, setDate] = useState(null);
  const [daysInCurrentMonth, setDaysInCurrentMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(null);

  function getDaysInMonth(year, month) {
    // Create a date object for the first day of the next month
    const nextMonth = new Date(year, month, 1);

    // Subtract one day to get the last day of the specified month
    const lastDayOfMonth = new Date(
      nextMonth.getFullYear(),
      nextMonth.getMonth(),
      0
    );

    // Extract the day, which is the number of days in the specified month
    return lastDayOfMonth.getDate();
  }

  function getMonthName(monthNumber) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[monthNumber - 1];
  }

  // time
  const timeFromRef = React.createRef();

  const handleMonthChange = (direction) => {
    if (direction === "left") {
      if (selectedMonth === 1) {
        setSelectedMonth(12);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else if (direction === "right") {
      if (selectedMonth === 12) {
        setSelectedMonth(1);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  // create range from number
  const createRange = (num) => {
    return Array.from({ length: num }, (_, i) => i + 1);
  };

  // button clicks
  const handleContinueButtonClick = () => {
    if (stage === 0 && !category) {
      setErrors("Please select a category");
      return;
    }
    if (stage === 1 && !serviceType) {
      setErrors("Please select a service type");
      return;
    }
    if (stage === 2 && !workQuantity) {
      setErrors("Please type work quantity");
      return;
    }
    if (stage === 3 && !address) {
      setErrors("Please type your location");
      return;
    }

    setStage(stage + 1);
    console.log(stage);
    setErrors(null);
  };
  const handleDaySelection = (day) => {
    setSelectedDay(day);
    handleContinueButtonClick();
  };

  // loading UI

  const handleBackButtonClick = () => {
    setStage(stage - 1);
    setErrors(null);
  };

  useEffect(() => {
    getCategories();
    getServiceTypes();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [stage]);

  const getFilteredServices = async () => {
    let hours = timeFromRef.current.value.split(":")[0];
    const minutes = timeFromRef.current.value.split(":")[1];
    if (hours[0] === "0") {
      hours = hours[1];
    }
    localStorage.setItem("service_type_id", serviceType.id);
    localStorage.setItem("location_type", selectingMode);
    localStorage.setItem("location_or_zone", address);
    localStorage.setItem("unit", unit);
    localStorage.setItem("work_quantity", workQuantity);
    localStorage.setItem(
      "year_month_day_hours_minutes",
      JSON.stringify([
        selectedYear,
        selectedMonth,
        selectedDay,
        hours,
        minutes,
      ])
    );
    navigate("/services/find/catalog")
  };

  return (
    <div className=" w-full h-screen -mt-[100px] flex justify-center items-center ">
      <form
        action="POST"
        className={`relative flex flex-col items-center w-full sm:max-w-[500px] space-y-3 border border-black/15 shadow-2xl px-20 py-9 rounded-3xl
          ${isLoading ? "opacity-100" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          getFilteredServices();
        }}
      >
        {isLoading && <LoadingUI></LoadingUI>}
        {stage >= 1 && (
          <div className="w-full -ml-20 h-[30px]">
            <button
              type="button"
              onClick={handleBackButtonClick}
              className="flex gap-1 justify-center items-center"
            >
              <ArrowSVG degree={90} /> Back
            </button>
          </div>
        )}
        {stage === 0 && (
          <div className="w-full flex flex-col justify-center items-center ">
            <span className="text-2xl font-medium pb-8">Select a category</span>
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
                <span>{category ? category.name : "Select category"}</span>
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
                      key={category.id}
                      type="button"
                      className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setCategory(category)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </button>
            </div>
          </div>
        )}
        {stage === 1 && (
          <div className="w-full flex flex-col justify-center items-center ">
            <span className="text-2xl font-medium pb-8">
              Select service type
            </span>
            <div className="w-full">
              <button
                type="button"
                name="service type"
                onClick={() =>
                  setIsServiceTypeSelecting(!isServiceTypeSelecting)
                }
                className={`w-full h-[50px] relative rounded-full p-4 text-left flex justify-between items-center ${
                  isServiceTypeSelecting
                    ? "border-2 border-green-500"
                    : "border border-black/70"
                } ${serviceType ? "text-black" : "text-black/50"}`}
              >
                <span>
                  {serviceType ? serviceType.name : "Select service type"}
                </span>
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
                      key={serviceType.id}
                      type="button"
                      className="text-left p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleServiceTypeSelection(serviceType)}
                    >
                      {serviceType.name}
                    </button>
                  ))}
                </div>
              </button>
            </div>
          </div>
        )}
        {stage === 2 && (
          <div className="w-full flex flex-col justify-center items-center ">
            {category.name === "Cleaning" && (
              <Suspense fallback={<div>Loading...</div>}>
                <CleaningSpecification
                  availableUnits={availableUnits}
                  unit={unit}
                  workQuantity={workQuantity}
                  setUnit={setUnit}
                  setWorkQuantity={setWorkQuantity}
                />
              </Suspense>
            )}
          </div>
        )}
        {stage === 3 && (
          <div className="w-full flex flex-col justify-center items-center gap-5 ">
            <span className="text-2xl font-medium pb-8">
              Type your location
            </span>
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
          </div>
        )}
        {stage === 4 && (
          <div className="w-full flex flex-col justify-center items-center gap-5 ">
            <span className="text-2xl font-medium pb-8">Select a date</span>
            <div className="w-full min-h-[250px]">
              <div className="w-full flex justify-center items-center gap-3 mb-5 text-lg">
                <button
                  type="button"
                  onClick={() => handleMonthChange("left")}
                  className=""
                >
                  <ArrowSVG degree={90}></ArrowSVG>
                </button>
                <div className="text-center w-[170px] flex items-center justify-center gap-2">
                  <span>{getMonthName(selectedMonth)}</span>
                  <span>{selectedYear}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleMonthChange("right")}
                  className=""
                >
                  <ArrowSVG degree={-90}></ArrowSVG>
                </button>
              </div>
              <div className="flex flex-wrap w-full jsutify-start items-start   ">
                {createRange(getDaysInMonth(selectedYear, selectedMonth)).map(
                  (day) => (
                    <button
                      className="rounded-full px-2 py-1 transition-colora duration-100  hover:bg-green-500  hover:text-white text-lg w-1/7"
                      type="button"
                      onClick={() => handleDaySelection(day)}
                    >
                      {day}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
        {stage === 5 && (
          <div className="w-full flex flex-col justify-center items-center gap-5 ">
            <span className="text-2xl font-medium pb-8">
              Select started time
            </span>
            <div className="flex justify-center items-center gap-4 border p-2 m-1 rounded-2xl border-green-500">
              <div className="flex flex-col items-center">
                <span className="mb-2 text-gray-600">From</span>
                <input
                  type="time"
                  ref={timeFromRef}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        )}

        {errors && (
          <span className="w-full text-left p-0 m-0 text-red-500 px-5">
            {errors}
          </span>
        )}
        {stage < 4 && (
          <button
            type="button"
            onClick={handleContinueButtonClick}
            className="shadow-xl active:shadow-none btn-primary w-full h-[50px] rounded-full p-4  text-white bg-green-500"
          >
            Continue
          </button>
        )}
        {stage == 5 && (
          <button
            type="submit"
            className="shadow-xl active:shadow-none btn-primary w-full h-[50px] rounded-full p-4  text-white bg-green-500"
          >
            Find
          </button>
        )}
      </form>
    </div>
  );
}
