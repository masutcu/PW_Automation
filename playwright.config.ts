import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  globalTimeout: 60000,
  timeout: 40000, //default 30sn
  expect: {
    timeout: 10000 //default 5sn
  },
   /*Run tests in files in parallel */
   fullyParallel:false, //true:spec dosyasının içinde de 1 den fazla worker çalıştırır
   /* Retry on CI only */
   retries: process.env.CI ? 2 : 1,
   /* Opt out of parallel tests on CI. */
   workers: process.env.CI ? 1 : undefined, //playwright nekadar worker'a ihtiyacı varsa çalıştırır max:8
  reporter: 'html',
  use: {

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://automationexercise.com',
    
    
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
      use: { browserName: 'chromium',
      video: {
        mode: 'on-first-retry',
        size: { width: 1920, height: 1080 }
        },
      }
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
      use: {
        browserName: 'webkit',
        video: {
          mode: 'on-first-retry',
          size: { width: 1920, height: 1080 }
        },
      }
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
