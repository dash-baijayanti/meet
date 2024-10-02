# Meet App
For my Meet App I will be using serverless functions and PWAs. This will allow me to ensure my app remains responsive due to the fact that real-time responsiveness is crucial for this app. Since serverless platforms autoscale based on demand, the app can handle heavy amounts of load on its server. Since the app events are dependent on where these events are being held, the serverless functions can easily integrate the geolocation service of the location of the user's interest as well as handling authentication with Google Calendar API. 

## Feature 1: Show/Hide Event Details
As a user, 
I should be able to click on a button
So that I can see the the details of the event.

Given: The user is viewing the event details page. <br />
When: The user clicks on a button for a specific function. <br />
Then: The event details section either expands or collapses, showing or hiding additional information about the events.

## Feature 2: Specify Number of Events
As a user,
I should be able to specify the number of events to be shown
So that I can view that specific number of events on the page.

Given: The user is on the events listing page. <br />
When: The user inputs a specific number from a drop-down menu to see the number of events displayed. <br />
Then: The events listing page refreshes, displaying the specified number of event options.

## Feature 3: Use the App When Offline
As a user,
I should be able to be lose internet connection while on app
So that I can still see previously viewed events and cached data.

Given: The user has accessed the app while on internet connection before <br />
When: The user loses the internet connection. <br />
Then: The event application displays a message that the user is offline and only  previously viewed events and cached data are still accessible.

## Feature 4: Add an App Shortcut to the Home Screen
As a user,
I should be able to have an option to add the app as a shortcut
So that the app icon appears on the home screen.

Given: The user has installed the app on their phone. <br />
When: The user presses add shortcut button to home screen <br />
Then: The app will be shown on the home screen.

## Feature 5: Display Charts Visualizing Event Details
As a user,
I should be able to click on a button
That shows the event details on a chart.

Given: The user is viewing the event list page. <br />
When: The user taps on a "View Charts" button. <br />
Then: A chart will render showing details of the event
