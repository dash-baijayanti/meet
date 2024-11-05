import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState, useCallback } from 'react';
import { getEvents,extractLocations } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchData =  useCallback(async () => {

    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }, [currentCity, currentNOE]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

 return (
    <div className="App">
      <div className="alerts-container">
          {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
      </div>
      <div className="alerts-container">
          {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
      </div>
      <div className="alerts-container">
          {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
      </div>
      {/* Pass props to CitySearch */}
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert} />
      

      {/* Pass currentNOE and setCurrentNOE to NumberOfEvents */}
      <NumberOfEvents 
        currentNOE={currentNOE}  // Display the current number of events
         setCurrentNOE={setCurrentNOE} 
         setErrorAlert={setErrorAlert} // Update the number of events
      />

      {/* Display the event list */}
      <EventList events={events} />
    </div>
  );
};

export default App;