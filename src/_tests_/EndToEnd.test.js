import puppeteer from "puppeteer";

describe('show/hide an event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
  
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,
        timeout: 0, // Disable timeout
      });

      page = await browser.newPage();

      await page.goto('http://localhost:3000/');
      await page.waitForSelector('.eventSummary');
  });
  afterAll(() => {
   
      browser.close();
  
  });

test('An event element is collapsed by default', async () => {
 
  const eventDetails = await page.$('.eventSummary .show-details-btn');
  expect(eventDetails).toBeNull();
 
});

test('User can expand an event to see its details', async () => {

  await page.click('.show-details-btn');

  const eventDetails = await page.$('.eventDetails');
  expect(eventDetails).toBeDefined();
  
});

});

describe('Specify Number of Events', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // Set to true if you don't need a GUI
      slowMo: 250, // Slow down operations for better visibility
      timeout: 0, // Disable timeout for navigation
    });

    page = await browser.newPage();
    await page.goto('http://localhost:3000/'); // Change to your app's URL
    await page.waitForSelector('.number-of-events-input'); // Wait for the number selection element
  });

  afterAll(async () => {
    await browser.close(); // Ensure the browser closes after tests
  });

  test('When user hasn’t specified a number, 32 events are shown by default', async () => {
    // Check the number of displayed events
    const events = await page.$$('.eventSummary'); // Use the correct selector for your event elements
    expect(events.length).toBe(32); // Ensure 32 events are displayed by default
  });

  test('User can change the number of events displayed', async () => {
     // Clear the input and type a different number
     await page.click('#numberOfEvents'); // Click on the input to focus
     await page.click('#numberOfEvents', { clickCount: 3 }); // Select all text
     await page.type('#numberOfEvents', '10'); // Type the new number

    // Wait for the events to update
    await page.waitForFunction(() => {
      const events = document.querySelectorAll('.eventSummary'); // Use the correct selector for your event elements
      return events.length === 10; // Check for the number of events
    });

    // Check the number of displayed events
    const updatedEvents = await page.$$('.eventSummary'); // Use the correct selector for your event elements
    expect(updatedEvents.length).toBe(10); // Ensure 10 events are displayed
  });
});