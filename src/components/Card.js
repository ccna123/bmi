import React, { useState } from "react";

export const Card = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  function BMI(height, weight) {
    let heightInCentimeter = height / 100;
    return weight / (heightInCentimeter * heightInCentimeter);
  }

  const bmi = BMI(height, weight);
  function getBmiStatus() {
    if (bmi <= 18.4) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "Normal";
    } else if (bmi >= 25 && bmi <= 39.9) {
      return "Overweight";
    } else if (bmi >= 40.0) {
      return "Obese";
    }
  }

  return (
    <div className="bg-white w-[50%] rounded-lg p-4">
      <div className="flex justify-between gap-4">
        <label htmlFor="height">Height</label>
        <input
          className="w-full"
          type="range"
          min={1}
          max={300}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <p className="font-bold">Height {height}</p>
      <div className="flex justify-between gap-4">
        <label htmlFor="weight">Weight</label>
        <input
          className="w-full"
          type="range"
          min={1}
          max={300}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <p className="font-bold">Weight {weight}</p>
      <div className="bg-slate-300 rounded-md">
        BMI: {height === 0 ? 0 : bmi.toFixed(2)}
      </div>
      <div
        className={`rounded-md mt-4 
        ${
          getBmiStatus() === "Underweight"
            ? "bg-orange-200"
            : getBmiStatus() === "Normal"
            ? "bg-green-400"
            : getBmiStatus() === "Overweight"
            ? "bg-orange-400"
            : getBmiStatus() === "Obese"
            ? "bg-red-400"
            : ""
        }
      `}
      >
        {getBmiStatus()}
      </div>
    </div>
  );
};
