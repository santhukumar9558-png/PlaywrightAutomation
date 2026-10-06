import {test, expect } from "@playwright/test";

import path from 'path';
import fs from 'fs';

test('Print the cell value', async ({ page }) => {

    await page.goto("https://www.nseindia.com/");

    await page.getByRole('combobox', { name: 'Search by Company name, Index or Symbol...' }).click();

    await page.waitForSelector('[class="line1"] span[class="rt"]');

    const allValues = await page.locator('[class="line1"] span[class="rt"]').allTextContents();

    console.log(allValues.length)

    for (const value of allValues) {
        console.log(value);
    }

    const allframes = page.frames();
    allframes.forEach((frame, index) => { console.log(`frame name: ${frame.name()}: url ${frame.url()}`) });
    console.log(`The total number of frames are ${allValues.length}`);
    const childFrames = allframes.filter(frame => frame !== page.mainFrame());
    console.log(`Child (iframe) frames only: ${childFrames.length}`);
})

test('Alert validation', async ({ page }) => {

    await page.goto("https://www.nseindia.com/");
    await page.locator('[title="WhatsApp"]').waitFor({ state: "visible" })
    page.on('dialog', dialog => {

        console.log(dialog.message());
        dialog.dismiss()

    })
    await page.locator('[title="WhatsApp"]').click({ force: true });
})

test('multiple window/tabs', async({page, context}) => {
   
    await page.goto("https://www.nseindia.com/");

    const [page2] = await Promise.all([

        context.waitForEvent('page'),
        await page.locator('.pt-md-2 .nifty_logo').click()
    ])

    await page2.waitForLoadState();

    await page2.getByRole('button', {name:'About'}).click();

    console.log(await page2.getByRole("link", {name:'About Us'}).textContent());

})

test('Download', async({page}) =>{

    const downloadPromis = await page.waitForEvent('download')

    await page.goto('');
    await page.click('text=Download File');

    const download = downloadPromis;


    const filePath = path.join(__dirname, 'download', download.suggestedFilename() )

    await download.saveAs(filePath);
})

test('Upload a file', async({page}) =>{


    const filePath = path.join(__dirname, 'Fixtures', 'sameple.pdf');

    await page.setInputFiles('input[type="File"]',filePath);

    await page.getByRole('button', {name:'SubmitButton'}).click();


    const choosfilePromis = await page.waitForEvent('filechooser');

    await page.click('text=Choose File')

    const filechoose = choosfilePromis
    filechoose.setFiles(path.join(__dirname, 'Fixtures', 'samepl.pdf'))

})
