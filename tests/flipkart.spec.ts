import { test, expect } from '@playwright/test'
import { assert } from 'node:console';

test.describe('Flipkart Items Validation', () => {

    test('Item price validation', async ({ page }) => {

        // await page.goto('https://www.nseindia.com/');
        //await page.getByRole('link', {name: 'Market Data'}).click();
        await page.goto("https://www.amazon.in/");
        await page.getByRole('link', { name: 'Mobiles' }).click()
        await page.getByAltText('oneplus nord CE6', { exact: true }).scrollIntoViewIfNeeded();
        await page.getByAltText('oneplus nord CE6', { exact: true }).click();
        const price = await page.locator('div[class="a-section apex-core-price-identifier"] span[class="a-price-whole"]').textContent();
        console.log(price);
        const expectedValue = "37999"
        const expectedValue1 = price?.replace(/[^0-9]/g, "");
        console.log(expectedValue1);
        expect(expectedValue).toEqual(expectedValue1);
    })
    test('click image', async ({ page }) => {

        await page.goto("https://www.amazon.in/");
        await page.getByText('New Releases', { exact: true }).click();
        await page.locator('a[href*="B0H9RLKZ6F"]').nth(1).click();
        const price = await page.locator('[class="a-section apex-core-price-identifier"]').nth(1).locator('span[class="a-price-whole"]').textContent();
        console.log(price);
    })

    test('Click on explorer', async ({ page }) => {

        await page.goto("https://www.amazon.in/");
        const hamburger = page.locator('a#nav-hamburger-menu');
        await hamburger.waitFor({ state: 'visible' });
        await hamburger.click(); // no force
        await page.waitForTimeout(1000);
        console.log('expanded:', await hamburger.getAttribute('aria-expanded'));
        await page.screenshot({ path: 'screenshots/after-click.png' });
        await page.locator('div[id="hmenu-content"] ul').getByRole('button', { name: 'Fire TV' }).click({force:true});
        await page.getByRole('button', { name: 'Back to main menu' }).nth(1).click();
        await expect(page.locator('div[id="hmenu-content"] ul').getByRole('button', { name: 'Fire TV' })).toBeVisible();
        await page.getByRole('button', { name: 'Close menu' }).click();
    })
})