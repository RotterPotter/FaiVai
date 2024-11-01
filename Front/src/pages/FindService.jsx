import React, { useEffect } from "react";
import ArrowSVG from "../assets/SVG/ArrowSVG";
import { useState, lazy, Suspense } from "react";
import { set } from "date-fns";
import LoadingUI from "../components/LoadingUI";

const CleaningSpecification = lazy(() =>
  import("../components/category_specifications/CleaningSpecification")
);

export default function FindService() {
  // page
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState(0);

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
      const response = await fetch("http://localhost:8000/category/all");
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
    console.log(availableUnits);
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
    setStage(stage + 1);
    setErrors(null);
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

  return (
    <div className="flex justify-center items-center mt-[100px]">
      <form
        action="POST"
        className={`relative flex flex-col items-center w-full sm:max-w-[500px] space-y-3 border border-black/15 shadow-2xl px-20 py-9 rounded-3xl
            ${isLoading ? "opacity-100" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
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

        {errors && (
          <span className="w-full text-left p-0 m-0 text-red-500 px-5">
            {errors}
          </span>
        )}
        <button
          type="button"
          onClick={handleContinueButtonClick}
          className="shadow-xl active:shadow-none btn-primary w-full h-[50px] rounded-full p-4  text-white bg-green-500"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
