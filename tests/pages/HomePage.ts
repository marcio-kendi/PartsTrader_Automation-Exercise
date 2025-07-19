// pages/HomePage.ts
import { Page, expect } from "@playwright/test";

class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://automationexercise.com");
  }

  async verifyHomePageIsVisible() {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
    await expect(
      this.page.locator('img[alt="Website for automation practice"]')
    ).toBeVisible();
  }

  async addProductsToCart(count: number = 5) {
    await this.page.locator('a[href="/products"]').click();
    await this.page.waitForSelector(".productinfo");

    const products = await this.page.locator(".productinfo").elementHandles();
    const shuffled = products.sort(() => Math.random() - 0.5).slice(0, count);

    for (let i = 0; i < shuffled.length; i++) {
      const product = shuffled[i];
      const addButton = await product.$("a[data-product-id]");
      if (addButton) {
        await addButton.click();

        const isLast = i === shuffled.length - 1;
        if (!isLast) {
          await this.page
            .getByRole("button", { name: "Continue Shopping" })
            .click();
        }
      }
    }
  }

  async goToCart() {
    await this.page.locator('.shop-menu a[href="/view_cart"]').click();
  }

  async verifyCartPageIsDisplayed() {
    await expect(this.page.getByText("Shopping Cart")).toBeVisible();
  }

  async proceedToCheckout() {
    await this.page.locator("a", { hasText: "Proceed to Checkout" }).click();
  }

  async clickRegisterLogin(name: string) {
    await this.page.getByRole("link", { name: name }).click();
  }
}

export default HomePage;
