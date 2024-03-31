import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  globalTimeout: 60000,
  timeout: 40000, //default 30sn
  expect: {
    timeout: 3000 //default 5sn
  },
  retries: 1,
  reporter: 'html',
  use: {

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://automationexercise.com',
    browserName: 'chromium',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 }
    },
    //actionTimeout:5000,
    //navigationTimeout:5000,

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
      viewport: { width: 1520, height: 860 },
     },
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        video: {
          mode: 'on-first-retry',
          size: { width: 1920, height: 1080 }
        },
      }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: { ...devices["iPhone 13 Pro"] },
    },
    {
      name: 'spesificTest',
      testMatch: 'testcase1.spec.ts',
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
        video: {
          mode: 'on',
          size: { width: 1920, height: 1080 }
        },
      }
    },

  ],


});
