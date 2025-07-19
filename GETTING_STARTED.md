Getting Started

Purpose

This document provides setup and usage instructions for the AutomationExercise test suite. It is intended to help new team members quickly clone, run, and understand how to use and maintain the test framework.

The suite contains both UI and API test coverage for https://automationexercise.com, following the exercise specifications for Tests 14 and 15 (UI) and APIs 7–10 (API tests).

/// Getting the Latest Code

git clone https://github.com/marcio-kendi/PartsTrader_Automation-Exercise.git
cd PartsTrader_Automation-Exercise
git checkout main
git pull origin main
pnpm install
pnpm exec playwright install

/// Running the Tests

Before running the tests, make sure you have the following installed:

- Node.js (v18.x)
- npm (v9.x)
- pnpm (v10.x)

To run the tests, execute the following command:

pnpm test

/// Running the Tests in a Specific Environment

You can run the tests in a specific environment by setting the environment variable ENV to either dev or test. For example, to run the tests in the test environment, execute the following command:

ENV=test pnpm test

/// Running the Tests in a Specific Browser

You can run the tests in a specific browser by setting the environment variable BROWSER to either chromium or firefox. For example, to run the tests in the chromium browser, execute the following command:

BROWSER=chromium pnpm test

/// Running the Tests in a Specific Browser and Environment

You can run the tests in a specific browser and environment by setting the environment variables BROWSER and ENV to either chromium or firefox and dev or test, respectively. For example, to run the tests in the chromium browser in the test environment, execute the following command:

BROWSER=chromium ENV=test pnpm test

/// Running the Tests in a Specific Browser and Environment

You can run the tests in a specific browser and environment by setting the environment variables BROWSER and ENV to either chromium or firefox and dev or test, respectively. For example, to run the tests in the chromium browser in the test environment, execute the following command:

BROWSER=chromium ENV=test pnpm test
