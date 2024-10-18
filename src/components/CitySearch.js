import { useState, useEffect } from "react";

const CitySearch = ({allLocations, setCurrentCity}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);
  // Why use ${allLocations} and not just allLocations? Well, 
  // it’s important to always avoid directly putting complex data-type variables into useEffect’s dependency array.

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];
  
    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setCurrentCity(value);
    setShowSuggestions(false); // to hide the list
  };

  return(
    <div id="city-search">
    <input 
        type="text" 
        className="city" 
        value={query} 
        placeholder="Search for a City"  
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
    />
    {showSuggestions? <ul className="suggestions">
      {suggestions.map((suggestion) => {
            return <li
             onClick={handleItemClicked} 
             key={suggestion}>{suggestion}</li>
          })}
          <li key='See all cities' onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
    </ul>:null}
    </div>
  );
}


export default CitySearch;