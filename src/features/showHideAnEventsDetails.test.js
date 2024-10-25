import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Event from '../components/Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  // Scenario: An event element is collapsed by default
  test('An event element is collapsed by default', ({
     given,
     when,
     then }) => {
      let AppComponent;

    given('the user has opened the Meet app', () => {
      
      AppComponent = render(<App />);
      });

    when('the user views the list of events', async() => {
      const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector('#event-list');

        await waitFor(() => {
         const EventListItems = within(EventListDOM).queryAllByRole('listitem');
         expect(EventListItems.length).toBe(32);
        });
    });

    then('the event details should not be visible', () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector('.event-details');
      expect(eventDetails).not.toBeInTheDocument();
      
    });

  // Scenario: User can expand an event to see details
  test('User can expand an event to see details', ({ given, when, then }) => {
    let AppComponent;
    // let eventDetails;
    given('the user is viewing a collapsed event element', async() => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
       await waitFor(() => {
         const EventListItems = within(EventListDOM).queryAllByRole('listitem');
         expect(EventListItems.length).toBe(32); 
        });
    });

    when('the user clicks on the "Expand" button of the event', () => {
      
    });

    then('the event details should be displayed', async() => {
      const AppDOM = AppComponent.container.firstChild;
      let eventDetails = AppDOM.querySelector('.show-details-btn');
          expect(eventDetails).toBeInTheDocument();
    });
  });

  // Scenario: User can collapse an event to hide details
  test('User can collapse an event to hide details', ({ given, when, then }) => {
    // let userEvent;
    // let EventComponent;
    // let allEvents;
    given('the user is viewing an expanded event element', async() => {
      const user = userEvent.setup();
        const allEvents = await getEvents();
        const EventComponent = render(<Event event={allEvents[0]} />)
        const showDetails = EventComponent.queryByText('Show details');
        await user.click(showDetails);
    });

    when('the user clicks on the "Collapse" button of the event', async() => {
      const user = userEvent.setup();
        const allEvents = await getEvents();
        const EventComponent = render(<Event event={allEvents[0]} />)
        const hideDetails = EventComponent.queryByText('Hide details');
        await user.click(hideDetails);
    });

    then('the event details should be hidden', () => {
      let AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
        const eventDetails = AppDOM.querySelector('.details');
        expect(eventDetails).not.toBeInTheDocument();
    });
  });
});   
});