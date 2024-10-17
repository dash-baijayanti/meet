
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
// import mockData from './mock-data';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { getEvents,extractLocations } from './api';

import './App.css';

// jest.mock('./api'); 

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    const fetchData = async () => {

      const allEvents = await getEvents();

      setAllLocations(extractLocations(allEvents));

      const filteredEvents = currentCity === "See all cities" 
      
        ? allEvents 
        : allEvents.filter(event => event.location === currentCity);

        console.log('Filtered Events Count:', filteredEvents.length);
      setEvents(filteredEvents.slice(0, currentNOE));
    };
  
  fetchData();
  }, [currentCity, currentNOE]); // Now, currentNOE is included as a dependency

  
  return (
    <div className="App">
      {/* Pass props to CitySearch */}
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity}
      />

      {/* Pass currentNOE and setCurrentNOE to NumberOfEvents */}
      <NumberOfEvents 
        currentNOE={currentNOE}  // Display the current number of events
        setCurrentNOE={setCurrentNOE}  // Update the number of events
      />

      {/* Display the event list */}
      <EventList events={events} />
    </div>
  );
}

export default App;