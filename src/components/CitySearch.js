import { useState, useEffect } from "react";
import React from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Set default suggestions when allLocations change
  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);

    // Filter locations based on input value
    const filteredLocations = allLocations
      ? allLocations.filter((location) =>
          location.toUpperCase().includes(value.toUpperCase())
        )
      : [];

    // Update suggestions based on filter results
    setSuggestions(filteredLocations);

    // Set info text based on whether there are matching locations
    const infoText =
      filteredLocations.length === 0
        ? "We cannot find the city you are looking for. Please try another city."
        : "";
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setCurrentCity(value);
    setShowSuggestions(false);
    setInfoAlert("");
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        value={query}
        placeholder="Search for a City"
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li onClick={handleItemClicked} key={suggestion}>
              {suggestion}
            </li>
          ))}
          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;