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

    test('NumberOfEvents component is rendered', () => {
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

  test('User can type into NumberOfEvents input field', async () => {
    const inputElement = getByRole('textbox');
    
    // Simulate typing: backspace twice to remove '32', then type '10'
    await userEvent.type(inputElement, '{backspace}{backspace}10');
    
    // Expect the input's value to be 10
    expect(inputElement.value).toBe('10');
  });
  });