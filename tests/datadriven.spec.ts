import { test, expect } from '@playwright/test';

import testData from '../user.json' with { type: 'json' };

test.describe('Data Driven Suite', () => {
    testData.forEach((data) => {
        test(`Data driven test for user: ${data.username}`, async ({ page }) => {
            await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
            await page.getByPlaceholder('email@example.com').fill(data.username);
            await page.getByPlaceholder('enter your passsword').fill(data.password);
            await page.getByRole('button', { name: 'login' }).click();
            const validation =await page.locator('#toast-container').textContent();
            expect(validation?.trim()).toEqual(data.expectedText);
        });
    });
});
