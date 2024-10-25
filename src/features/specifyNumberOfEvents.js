import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor } from '@testing-library/react';
import App from '../App'; // Import your main App component

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  
  // Scenario: When user hasn’t specified a number, 32 events are shown by default
  test('When user hasn’t specified a number, 32 events are shown by default', ({
     given,
     when, 
     then }) => {
    let AppComponent;

    given('the user has opened the Meet app', () => {
     AppComponent = render(<App />); 
    });

    when('the user views the list of events', () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
    });

    then('the app should display 32 events by default', async() => {
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });  
  });

  // Scenario: User can change the number of events displayed
  test('User can change the number of events displayed', ({ given, when, then }) => {
    let AppComponent;
    given('the user is viewing the list of events', () => {
    AppComponent = render(<App />); 
    });

    when('the user selects a different number from the "Number of Events" dropdown', () => {
      const NumberOfEventComponent = render(<NumberOfEvents currentNOE={3} />);
    });

    then('the events displayed should be updated accordingly', async() => {
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(3);
      });  
    });
  });

});
});