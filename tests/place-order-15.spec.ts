import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";

test("Test 15 - Place Order: Register before checkout", async ({ page }) => {
  const home = new HomePage(page);
  const signup = new SignupPage(page);

  const countries = [
    "India",
    "United States",
    "Canada",
    "Australia",
    "Israel",
    "New Zealand",
    "Singapore",
  ];

  const firstName = faker.person.firstName();
  const user = {
    name: firstName,
    email: faker.internet.email(),
    password: "D3v3nv1r0m3nt",
    firstName,
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobile: faker.phone.number(),
    country: countries[Math.floor(Math.random() * countries.length)],
    birthDate: faker.date.birthdate({ min: 18, max: 85, mode: "age" }),
  };

  await test.step("Navigate to url", async () => {
    await home.goto();
  });

  await test.step("Verify home page is visible", async () => {
    await home.verifyHomePageIsVisible();
  });

  await test.step("Click on register / login button", async () => {
    await home.clickRegisterLogin("Signup / Login");
  });

  await test.step("Fill all details in Signup and create account", async () => {
    await signup.fillSignupForm(user.name, user.email);
    await signup.completeAccountDetails(user);
  });

  await test.step("Verify 'ACCOUNT CREATED!' and click 'Continue' button", async () => {
    await signup.verifyAccountCreatedAndContinue();
  });

  await test.step("Verify 'Logged in as username' at top", async () => {
    await signup.verifyLoggedInAs(user.name);
  });

  await test.step("Add products to cart", async () => {
    await home.addProductsToCart();
  });

  await test.step("Click Cart button", async () => {
    await home.goToCart();
  });

  await test.step("Verify cart page is displayed", async () => {
    await home.verifyCartPageIsDisplayed();
  });

  await test.step("Click 'Proceed To Checkout' button", async () => {
    await home.proceedToCheckout();
  });

  await test.step("Verify Address Details and Review Your Order", async () => {
    await expect(
      page.locator("#address_delivery").getByText(user.firstName)
    ).toBeVisible();
    await expect(
      page.locator("#address_delivery").getByText(user.address)
    ).toBeVisible();
    await expect(page.getByText("Review Your Order")).toBeVisible();
  });

  await test.step("Enter description in comment text area and click 'Place Order'", async () => {
    await page
      .locator('textarea[name="message"]')
      .fill("Please leave it in the back door if no one is home.");
    await page.locator('a:has-text("Place Order")').click();
  });

  await test.step("Enter payment details: Name on Card, Card Number, CVC, Expiration date", async () => {
    const fullName = `${user.firstName} ${user.lastName}`;
    await page.locator('form input[name="name_on_card"]').fill(fullName);
    await page
      .locator('form input[data-qa="card-number"]')
      .fill(faker.finance.creditCardNumber());
    await page
      .locator('form input[data-qa="cvc"]')
      .fill(faker.finance.creditCardCVV());
    await page.locator('form input[data-qa="expiry-month"]').fill("12");
    await page.locator('form input[data-qa="expiry-year"]').fill("2027");
  });

  await test.step("Click 'Pay and Confirm Order' button", async () => {
    await page.locator('button:has-text("Pay and Confirm Order")').click();
    await page.waitForTimeout(3000);
  });

  await test.step("Verify success message 'Your order has been placed successfully!'", async () => {
    await expect(page).toHaveURL(/payment_done/);
  });

  await test.step("Click 'Delete Account' button and Verify 'ACCOUNT DELETED!' and click 'Continue' button", async () => {
    await signup.deleteAccountAndConfirm();
  });
});
