import {expect, test} from '@playwright/test';

test('web table', async({page}) =>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const allRows = page.locator('.tableFixHead table tr');

    const cell = await allRows.locator('td').allTextContents();

    for(const ce of cell){
        console.log(ce);
    }

    const ceValue = await page.locator('.tableFixHead table tbody tr:nth-child(1) td:nth-child(1)').textContent();
    expect(ceValue).toEqual("Alex")

})