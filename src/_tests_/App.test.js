// src/__tests__/App.test.js

import { render, within, waitFor, screen } from '@testing-library/react';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  })

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });

  test('render number of events', () => {
    expect(AppDOM.querySelector('#numberOfEvents')).toBeInTheDocument();
    });

});

describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');   

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });

  test('number of events per page changes according to what user types', async () => {
    render(<App />);
  
  // Select the input field using screen.getByRole
  const NumberOfEventsInput = document.querySelector('input.number'); 

  // Clear the input field and type "10"
  await userEvent.clear(NumberOfEventsInput);
  await userEvent.type(NumberOfEventsInput, "10");

  // Wait for the number of events to update and then check the length of the event list
  const events = await screen.findAllByRole('listitem'); // Adjust role if necessary
  expect(events).toHaveLength(10); // Check that 10 events are rendered
  });
  });