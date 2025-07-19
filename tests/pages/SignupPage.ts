import { Page, expect } from "@playwright/test";

class SignupPage {
  constructor(private page: Page) {}

  async fillSignupForm(name: string, email: string) {
    await this.page.locator('input[data-qa="signup-name"]').fill(name);
    await this.page.locator('input[data-qa="signup-email"]').fill(email);
    await this.page.locator('button:has-text("Signup")').click();
  }

  async completeAccountDetails(user: {
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
    birthDate: Date;
  }) {
    //Enter Account Information
    const isMale = Math.random() < 0.5;
    const genderSelector = isMale ? "#id_gender1" : "#id_gender2";
    await this.page.locator(genderSelector).check();

    await this.page.locator("#password").fill(user.password);
    await this.page
      .locator("#days")
      .selectOption(user.birthDate.getDate().toString());
    await this.page
      .locator("#months")
      .selectOption((user.birthDate.getMonth() + 1).toString());
    await this.page
      .locator("#years")
      .selectOption(user.birthDate.getFullYear().toString());

    await this.page.locator("#newsletter").check();
    await this.page.locator("#optin").check();

    //Address Information
    await this.page.locator('[data-qa="first_name"]').fill(user.firstName);
    await this.page.locator('[data-qa="last_name"]').fill(user.lastName);
    await this.page.locator('[data-qa="address"]').fill(user.address);
    await this.page.locator('[data-qa="country"]').selectOption(user.country);
    await this.page.locator('[data-qa="state"]').fill(user.state);
    await this.page.locator('[data-qa="city"]').fill(user.city);
    await this.page.locator('[data-qa="zipcode"]').fill(user.zipcode);
    await this.page.locator('[data-qa="mobile_number"]').fill(user.mobile);

    await this.page.locator('button:has-text("Create Account")').click();
  }

  async verifyAccountCreatedAndContinue() {
    await expect(
      this.page.locator('[data-qa="account-created"]')
    ).toContainText("Account Created!");
    await this.page.getByRole("link", { name: "Continue" }).click();
  }

  async verifyLoggedInAs(username: string) {
    await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();
  }

  async deleteAccountAndConfirm() {
    await this.page.locator('li a[href="/delete_account"]').click();
    await expect(this.page.getByText("ACCOUNT DELETED!")).toBeVisible();
    await this.page.getByRole("link", { name: "Continue" }).click();
  }
}

export default SignupPage;
