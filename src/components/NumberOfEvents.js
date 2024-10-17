import { useState } from "react";
// import PropTypes from 'prop-types';

const NumberOfEvents = ({ currentNOE, setCurrentNOE  }) => {
  const [eventCount, setEventCount] = useState(32);

  const handleInputChange = (e) => {
    let value = e.target.value;
    setEventCount(value);
    setCurrentNOE(value);


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
        type="text"
        className="number-of-events-input"
        value={eventCount}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default NumberOfEvents;

