import { useState } from "react";
import PropTypes from 'prop-types';

const NumberOfEvents = ({ number, setNumber  }) => {
  const [eventCount, setEventCount] = useState(32);

  const handleInputChange = (e) => {
    let value = e.target.value;
    setNumber(value);
    number(value);

  //   let errorText;
  //   if (isNaN(value) || value < 0) { 
  //     errorText = 'Please enter a valid number'
  //   } else {
  //     errorText = '';
  //   }
  //   setCurrentNOE(value);
  //   setErrorAlert(errorText); 
    
  }
 
  return (
    <div className="number-of-events">
      <label htmlFor="numberOfEvents">Number of Events: </label>
      <input
        id="numberOfEvents"
        type="number"
        className="number-of-events-input"
        value={eventCount}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default NumberOfEvents;

