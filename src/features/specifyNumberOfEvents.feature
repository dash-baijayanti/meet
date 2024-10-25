Feature: Specify Number of Events

  Scenario: When user hasn’t specified a number, 32 events are shown by default
      Given the user has opened the Meet app
      When the user views the list of events
      Then the app should display 32 events by default

  Scenario: User can change the number of events displayed
      Given the user is viewing the list of events
      When the user selects a different number from the "Number of Events" dropdown
      Then the events displayed should be updated accordingly
      
    