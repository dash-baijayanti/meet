import { useState } from "react";

const Event = ({event}) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <li className="event">
           <span className='eventSummary'>
            <p>{event.summary}</p>
           
            <p className="location">{event.location}</p>
        <p className="originalStartTime">{event && (new Date(event.originalStartTime.dateTime)).toUTCString()}</p>
      </span>
      {showDetails ? (
        <div className='details' id="details" >
          <p>{event.description}</p>
          <a href={event.htmlLink}>See details on Google Calendar</a>
        </div> 
      ) : null}
      <button 
        id="show-details-btn"
        className='details-btn'
        name="Show Details" 
        onClick={() => setShowDetails(!showDetails)}
      >
            {
                showDetails ?  <p role="description" className="details">{event.description}</p> : <></>
            }
            </button>
        </li>
    );
  }
  
  export default Event;

  