import { chromium, defineConfig, devices, firefox } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 2 : 1, // set to 2 when running on CI
  workers:20,
  fullyParallel:false,
  
  use: {
    browserName: 'chromium',
    headless: false,
    trace: 'on-first-retry',
     viewport: null,
     //storageState: 'tests/Authentications.json',
    
    // 2. Pass the maximize flag to Chromium-based browsers
    launchOptions: {
      args: ['--start-maximized'],
    },
  },

  
  projects: [
    // 1. Runs first and creates the auth file
    {
      name: 'setup',
      testMatch: 'tests/storagestate.spec.ts',
    },

    // 2. Runs only after setup succeeds
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tests/Authentications.json',
      },
      dependencies: ['setup'],
    },
  ],
  
});
