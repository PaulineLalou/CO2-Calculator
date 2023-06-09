import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";
import { calculateDistanceInKilometers } from "./utils";
const CO2Calculator: React.FC = () => {
  const distance = useSelector((state: RootState) => state.distance.value);
  const transportationMode = useSelector(
    (state: RootState) => state.distance.transportationMode
  ) as "Car" | "Plane";

  const calculateCO2Emissions = () => {
    if (distance === null || isNaN(distance)) {
      return null;
    }

    const carCO2EmissionPerKm = 0.1; // in kg/km
    const planeCO2EmissionPerKm = 0.2; // in kg/km

    const distanceInKm = calculateDistanceInKilometers(distance);

    let co2Emission = 0;

    if (transportationMode === "Car") {
      co2Emission = distanceInKm * carCO2EmissionPerKm;
    } else if (transportationMode === "Plane") {
      co2Emission = distanceInKm * planeCO2EmissionPerKm;
    }

    return co2Emission.toFixed(2);
  };

  const co2Emission = calculateCO2Emissions();

  return (
    <div className="co2-calculator">
      {distance !== null ? (
        <>
          <p>Transportation Mode: {transportationMode}</p>
          {co2Emission !== null ? (
            <p>CO2 Emission: {co2Emission} kg</p>
          ) : (
            <p>Error calculating CO2 emission.</p>
          )}
        </>
      ) : (
        <p>Please calculate the distance first.</p>
      )}
    </div>
  );
};

export default CO2Calculator;
