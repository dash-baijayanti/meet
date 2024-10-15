
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import { mockData } from './mock-data';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { getEvents,extractLocations } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import './App.css';


const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [errorAlert, setErrorAlert] = useState('');
  const [infoAlert, setInfoAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are currently offline.")
    }
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} setWarningAlert={setWarningAlert}/>
      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} setWarningAlert={setWarningAlert}/>
      <EventList events={events} />
    </div>
  );
}

export default App;