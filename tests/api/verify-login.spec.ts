import { test, expect, request } from "@playwright/test";

const BASE_URL = "https://automationexercise.com/api";
const HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded",
};

const user = {
  name: "Marcio",
  email: "testuser@example.com",
  password: "D3v3nv1r0m3nt",
};

test.describe("API Tests", () => {
  test("API 7: Verify login with valid details", async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.post(`${BASE_URL}/verifyLogin`, {
      headers: HEADERS,
      form: {
        email: user.email,
        password: user.password,
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.responseCode).toBe(200);
    expect(body.message).toContain("User exists!");
  });

  test("API 8: Verify login without email parameter", async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.post(`${BASE_URL}/verifyLogin`, {
      headers: HEADERS,
      form: {
        password: user.password,
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.responseCode).toBe(400);
    expect(body.message).toContain(
      "Bad request, email or password parameter is missing in POST request."
    );
  });

  test("API 9: DELETE to verifyLogin should return 200 with error message", async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.delete(`${BASE_URL}/verifyLogin`);
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("This request method is not supported.");
  });

  test("API 10: POST to Verify Login with invalid details", async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.post(`${BASE_URL}/verifyLogin`, {
      headers: HEADERS,
      form: {
        email: "invaliduser@example.com",
        password: "wrongPassword123",
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.responseCode).toBe(404);
    expect(body.message).toContain("User not found!");
  });
});
