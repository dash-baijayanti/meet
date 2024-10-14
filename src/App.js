import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import './App.css';

const App = () => {
 return (
   <div className="App">
    {/* <div id="event-list"></div> */}
    <CitySearch/>
    <EventList/>
   </div>
 );
}

export default App;


