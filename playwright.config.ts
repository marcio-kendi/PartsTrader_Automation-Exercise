import { defineConfig } from "@playwright/test";

const env = process.env.ENV || "dev";

const baseURLs: Record<string, string> = {
  dev: "https://automationexercise.com/",
  test: "https://test.automationexercise.com/",
};

export default defineConfig({
  use: {
    baseURL: baseURLs[env],
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  timeout: 30000,
  retries: 1,
  testDir: "./src/tests",
});
