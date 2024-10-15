import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import CitySearch from '../components/CitySearch';

describe('<EventList /> component', () => {
  
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList/>);
  })

  afterEach(() => {
   jest.clearAllTimers(); // Ensure everything is cleaned up after each test
  });

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });
  test('renders correct number of events', () => {
    EventListComponent.rerender(<EventList events = {[{id:1},{id:2},{id:3},{id:4}]}/>);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
  });
}); 