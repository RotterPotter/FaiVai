import React from "react";
import { useState } from "react";
import ArrowSVG from "../../assets/SVG/ArrowSVG";

export default function CleaningSpecification({
  availableUnits,
  unit,
  setUnit,
  workQuantity,
  setWorkQuantity,
}) {
  const [isUnitSelecting, setIsUnitSelecting] = useState(false);

  return (
    <div className="w-full flex flex-col gap-3 justify-center items-center">
      <span className="text-2xl font-medium pb-8">
        What size of your house?
      </span>
      <div className="w-full flex gap-2 items-center">
        <input
          required
          type="number"
          name="workQuantity"
          placeholder={`Type quantity`}
          className="input-reset w-2/3 h-[50px] rounded-full p-4"
          value={workQuantity === null ? "" : workQuantity}
          onChange={(e) =>
            setWorkQuantity(e.target.value === "" ? null : e.target.value)
          }
          min="1"
          max={60}
          step="1"
        />

        <button
          type="button"
          onClick={() => setIsUnitSelecting(!isUnitSelecting)}
          className={`w-1/3 h-[50px] relative rounded-full p-4 px-6 text-left flex justify-between items-center ${
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
              {availableUnits.map((selectedUnit) => (
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
    </div>
  );
}
