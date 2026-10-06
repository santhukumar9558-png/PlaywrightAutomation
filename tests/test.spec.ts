import { test, expect } from '@playwright/test'

import fs from 'fs';
import path from 'path';

test.describe('This is playwright automation', async () => {

    test("Login validation", { tag: '@smoke' }, async ({ browser }) => {
        const content = await browser.newContext()
        const page = await content.newPage()
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        console.log(await page.title())
    }),

    test('Login with page @regression', async ({ page }) => {
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        console.log(await page.title());
        await expect(page).toHaveTitle("OrangeHRM");
        await page.getByRole('textbox', { name: 'username' }).fill("Admin");
        await page.getByRole('textbox', { name: 'password' }).fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
        console.log(await page.title())
        })

    test('read from json', async ({ page }) => {
        const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../user.json'), 'utf-8'));
        console.log(testData.username)
    })
})