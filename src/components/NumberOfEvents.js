import { useState } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert  }) => {
  const [eventCount, setEventCount] = useState(32);

  const handleInputChange = (e) => {
    let value = e.target.value;
    setEventCount(value);
    let errorText;
    if(isNaN(value) || value.trim() === '')  { 
      errorText = 'Please enter a valid number'
    } else {
      errorText = ''
    }
    setCurrentNOE(value);
    setErrorAlert(errorText);
  }
 
  return (
    <div className="number-of-events">
      <label htmlFor="numberOfEvents">Number of Events: </label>
      <input
        id="numberOfEvents"
        type="text"
        className="number-of-events-input"
        value={eventCount}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default NumberOfEvents;

