import puppeteer from "puppeteer";

describe('show/hide an event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
   try {
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,
        timeout: 0, // Disable timeout
      });

      if (!browser) {
        throw new Error('Browser initialization failed.');
      }

      page = await browser.newPage();

      if (!page) {
        throw new Error('Page initialization failed.');
      }

      await page.goto('http://localhost:3000/');
      await page.waitForSelector('.event', { timeout: 1200000 });
    } catch (error) {
      console.error('Error initializing browser or navigating to localhost:', error);
    }
  });
  afterAll(() => {
    if (browser) {
      browser.close();
    }
  });

test('An event element is collapsed by default', async () => {
 
  const eventDetails = await page.$('.event .details');
  expect(eventDetails).toBeNull();
 
});

test('User can expand an event to see its details', async () => {

  await page.click('.event .details-btn');

  const eventDetails = await page.$('.event .details');
  expect(eventDetails).toBeDefined();
  
});

});