import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DistanceInputForm from "./DistanceInputForm";
import CO2Calculator from "./CO2Calculator";
import { setDistance, setTransportationMode } from "./reducers/distanceSlice";
import { RootState } from "./reducers";
import { calculateDistanceInKilometers } from "./utils";
import "./DistanceCalculator.css";

const DistanceCalculator: React.FC = () => {
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
  const [destination, setDestination] =
    useState<google.maps.LatLngLiteral | null>(null);
  const dispatch = useDispatch();
  const transportationMode = useSelector(
    (state: RootState) => state.distance.transportationMode
  ) as "Car" | "Plane";
  const distanceInMeters = useSelector(
    (state: RootState) => state.distance.value
  );

  const handleOriginChange = (address: string) => {
    setOriginInput(address);
  };

  const handleDestinationChange = (address: string) => {
    setDestinationInput(address);
  };

  const handleTransportationModeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const mode = e.target.value as "Car" | "Plane";
    dispatch(setTransportationMode(mode));
  };

  const [error, setError] = useState<string | null>(null);

  const handleDistanceCalculation = () => {
    if (originInput && destinationInput) {
      if (origin && destination) {
        const service = new window.google.maps.DistanceMatrixService();

        const travelMode = transportationMode === "Car" ? "DRIVING" : "TRANSIT";

        const request: google.maps.DistanceMatrixRequest = {
          origins: [origin],
          destinations: [destination],
          travelMode: travelMode as google.maps.TravelMode,
          unitSystem: google.maps.UnitSystem.METRIC,
        };

        service.getDistanceMatrix(request, (response, status) => {
          if (
            status === "OK" &&
            response?.rows?.[0]?.elements?.[0]?.distance?.value
          ) {
            const distanceInMeters =
              response.rows[0].elements[0].distance.value;
            dispatch(setDistance(distanceInMeters));
            setError(null); // Reset error state if successful
          } else {
            setError("Error calculating distance. Please try again.");
            dispatch(setDistance(null));
          }
        });
      } else {
        setError("Invalid origin or destination address.");
        dispatch(setDistance(null));
      }
    } else {
      setError("Please enter both origin and destination addresses.");
      dispatch(setDistance(null));
    }
  };

  const geocodeAddress = (
    address: string,
    callback: (result: google.maps.LatLngLiteral | null) => void
  ) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results?.[0]?.geometry?.location) {
        const location = results[0].geometry.location.toJSON();
        callback(location);
      } else {
        callback(null);
      }
    });
  };

  useEffect(() => {
    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.body.appendChild(googleMapsScript);

    googleMapsScript.onload = () => {
      handleDistanceCalculation();
    };
  }, []);

  useEffect(() => {
    if (originInput) {
      geocodeAddress(originInput, (result) => {
        if (result) {
          setOrigin(result);
        }
      });
    }
  }, [originInput]);

  useEffect(() => {
    if (destinationInput) {
      geocodeAddress(destinationInput, (result) => {
        if (result) {
          setDestination(result);
        }
      });
    }
  }, [destinationInput]);

  return (
    <div className="distance-calculator">
      <h2>CO2 Calculator</h2>
      <DistanceInputForm
        origin={originInput}
        destination={destinationInput}
        handleOriginChange={handleOriginChange}
        handleDestinationChange={handleDestinationChange}
        handleTransportationModeChange={handleTransportationModeChange}
        handleDistanceCalculation={handleDistanceCalculation}
      />
      {error && <div className="error-message">{error}</div>}
      <div className="distance-in-km">{`Distance: ${calculateDistanceInKilometers(
        distanceInMeters
      )} km`}</div>
      <CO2Calculator />
    </div>
  );
};

export default DistanceCalculator;
