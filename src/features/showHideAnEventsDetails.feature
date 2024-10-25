Feature: Show/Hide An Events Details

 Scenario: An event element is collapsed by default
    Given the user has opened the Meet app
    When the user views the list of events
    Then the event details should not be visible
       

 Scenario: User can expand an event to see details    
    Given the user is viewing a collapsed event element
    When the user clicks on the "Expand" button of the event
    Then the event details should be displayed
    

 Scenario: User can collapse an event to hide details  
    Given the user is viewing an expanded event element
    When the user clicks on the "Collapse" button of the event
    Then the event details should be hidden
  
