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