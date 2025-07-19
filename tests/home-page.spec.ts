import { Page, expect } from "@playwright/test";

class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://automationexercise.com");
  }

  async verifyHomePageIsVisible() {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
    await expect(this.page.locator("h1")).toHaveText("Automation Exercise");
  }
}

export default HomePage;
