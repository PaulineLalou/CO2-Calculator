import React, { useState } from "react";
import "./DistanceInputForm.css";

interface DistanceInputFormProps {
  origin: string;
  destination: string;
  handleOriginChange: (address: string) => void;
  handleDestinationChange: (address: string) => void;
  handleTransportationModeChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleDistanceCalculation: () => void;
}

const DistanceInputForm: React.FC<DistanceInputFormProps> = ({
  origin,
  destination,
  handleOriginChange,
  handleDestinationChange,
  handleTransportationModeChange,
  handleDistanceCalculation,
}) => {
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    string[]
  >([]);

  const fetchAddressSuggestions = (
    address: string,
    setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: address,
        types: ["address"],
      },
      (predictions) => {
        if (predictions) {
          const suggestions = predictions.map(
            (prediction) => prediction.description
          );
          setSuggestions(suggestions);
        } else {
          setSuggestions([]);
        }
      }
    );
  };

  const handleOriginInputChange = (address: string) => {
    handleOriginChange(address);
    if (address) {
      fetchAddressSuggestions(address, setOriginSuggestions);
    } else {
      setOriginSuggestions([]);
    }
  };

  const handleDestinationInputChange = (address: string) => {
    handleDestinationChange(address);
    if (address) {
      fetchAddressSuggestions(address, setDestinationSuggestions);
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleOriginSuggestionClick = (address: string) => {
    handleOriginChange(address);
    setOriginSuggestions([]);
  };

  const handleDestinationSuggestionClick = (address: string) => {
    handleDestinationChange(address);
    setDestinationSuggestions([]);
  };

  return (
    <div className="distance-input-form">
      <div className="form-group">
        <label htmlFor="origin">Origin</label>
        <input
          type="text"
          id="origin"
          value={origin}
          onChange={(e) => handleOriginInputChange(e.target.value)}
        />
        {originSuggestions.length > 0 && (
          <ul className="suggestions">
            {originSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleOriginSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="destination">Destination</label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => handleDestinationInputChange(e.target.value)}
        />
        {destinationSuggestions.length > 0 && (
          <ul className="suggestions">
            {destinationSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleDestinationSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="transportation-mode">Transportation Mode</label>
        <select
          id="transportation-mode"
          onChange={handleTransportationModeChange}
        >
          <option value="Car">Car</option>
          <option value="Plane">Plane</option>
        </select>
      </div>
      <button onClick={handleDistanceCalculation}>Calculate Distance</button>
    </div>
  );
};

export default DistanceInputForm;
