
import { test, expect } from '@playwright/test'
import { toNamespacedPath } from 'node:path';


test('Radio Button validations', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.locator('[value="radio1"]').check();
    expect(page.locator('[value="radio1"]')).toBeChecked();
    await page.locator('[value="radio3"]').check();
    expect(page.locator('[value="radio3"]')).toBeChecked();
    expect(page.locator('[value="radio1"]')).not.toBeChecked();
})
test('Suggestion class example', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.getByPlaceholder('Type to Select Countries').fill('Aust')
    await page.waitForTimeout(500);
    const countryLocator = page.locator('[id="ui-id-1"] [class="ui-menu-item-wrapper"]');
    const countryList: any = await countryLocator.allTextContents();
    console.log(countryList.length);
    for (let i = 0; i < countryList.length; i++) {
        if (countryList[i].trim() === 'Australia') {
            await countryLocator.nth(i).click();
            break;
        }
    }
    const value = await page.locator('#autocomplete').inputValue();
    console.log(value)
    expect(value).toBe("Australia")
})
test('Drop down validations', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.locator('#dropdown-class-example').selectOption('Option1');
    const dropDownValue = await page.locator('#dropdown-class-example').inputValue();
    console.log(dropDownValue)
    expect(dropDownValue).toBe('option1')



})
