import { useState } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE  }) => {
  const [eventCount, setEventCount] = useState(32);

  const handleInputChange = (e) => {
    let value = e.target.value;
    setEventCount(value);
    setCurrentNOE(value);
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

