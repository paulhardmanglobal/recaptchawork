const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set headless: true for headless mode
  const page = await browser.newPage();

  // Replace with the URL where your QuickForm is hosted
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });

  // Wait for the ReCaptcha script to be available
  await page.waitForFunction(() => typeof window.grecaptcha !== "undefined", {
    timeout: 10000,
  });

  // Fill out the form
  await page.type('input[name="name"]', "John Doe");
  await page.type('input[name="email"]', "john.doe@example.com");
  await page.type('input[name="phone"]', "123-456-7890");
  await page.type('input[name="address"]', "123 Main St");
  await page.type('input[name="city"]', "Anytown");
  await page.type('input[name="state"]', "Stateville");
  await page.type('input[name="zip"]', "12345");
  await page.type('input[name="country"]', "Countryland");
  await page.type('input[name="company"]', "Example Corp");
  await page.type('input[name="jobTitle"]', "Software Engineer");
  await page.type('input[name="website"]', "https://example.com");
  await page.type('input[name="age"]', "30");
  await page.type('input[name="gender"]', "Male");
  await page.type('input[name="interests"]', "Coding, Music, Hiking");
  await page.type('input[name="favoriteColor"]', "Blue");
  await page.type('textarea[name="feedback"]', "Great experience!");
  await page.type(
    'textarea[name="additionalNotes"]',
    "Looking forward to the next steps."
  );
  await page.type('input[name="referral"]', "Friend");

  // Submit the form
  // Submit button
  await page.click("#submit");

  // Wait for 3 seconds
  //   await page.waitFor ( 3000);

  // Wait for the response to be displayed
  try {
    await page.waitForSelector("code", { timeout: 5000 });
    const response = await page.$eval("code", (el) => el.textContent);
    console.log("Form submission response:", response);
  } catch (error) {
    console.error("Response element not found or timeout exceeded");
  }

  //   await browser.close();
})();
