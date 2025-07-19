import { test, expect, chromium } from "@playwright/test";

test("homepage loads successfully", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://automationexercise.com");
  await expect(page).toHaveTitle(/Automation Exercise/);

  await browser.close();
});
