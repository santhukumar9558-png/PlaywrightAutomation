import { test, expect } from '@playwright/test'

test.describe('Azamon', async () => {

    test('Amazon price', async ({ page }) => {

        const productName = 'laptops';

        await page.goto("https://www.amazon.in/");

        const continueButton = page.getByRole('button', { name: 'Continue shopping' });
        if (await continueButton.isVisible({ timeout: 5000 }).catch(() => false)) {
            await continueButton.click();
        }
        await page.getByPlaceholder('Search Amazon.in').fill(productName);
        await page.locator('#nav-search-submit-button').click();


        // Wait for the results grid to actually render
        await page.waitForSelector('[data-cy="price-recipe"] span[class="a-price-whole"]', { timeout: 20000 });

        // Use a class-contains selector (CSS class selector), not exact attribute match
        const allPrices = await page.locator('[data-cy="price-recipe"] span[class="a-price-whole"]').allTextContents();

        console.log(`Found ${allPrices.length} prices`);
        for (const price of allPrices) {
            console.log(price);
        }

        // Convert "54,990" -> 54990 (strip commas, dots, trailing characters, etc.)
        const numericPrices = allPrices
            .map(price => parseInt(price.replace(/[^0-9]/g, ''), 10))
            .filter(price => !isNaN(price) && price > 0); // drop junk/empty matches

        // Ascending
        const sortedAsc = [...numericPrices].sort((a, b) => a - b);

        // Descending
        const sortedDesc = [...numericPrices].sort((a, b) => b - a);

        console.log('Ascending:', sortedAsc);
        console.log('Descending:', sortedDesc);



    })

    test('count iframes', async ({ page }) => {
        await page.goto("https://www.amazon.in/");

        const continueButton = page.getByRole('button', { name: 'Continue shopping' });
        if (await continueButton.isVisible({ timeout: 5000 }).catch(() => false)) {
            await continueButton.click();
        }
        const allframes = page.frames();
        console.log(`The total number of frames are ${allframes.length}`);
        const childFrames = allframes.filter(frame => frame !== page.mainFrame());
        console.log(`Child (iframe) frames only: ${childFrames.length}`);
    })

    test('select options', async ({ page }) => {


        await page.goto("https://www.amazon.in/");
        
        const continueButton = page.getByRole('button', { name: 'Continue shopping' });
        if (await continueButton.isVisible({ timeout: 10000 }).catch(() => false)) {
            await continueButton.click();
        }

        //await page.locator('.nav-progressive-search-dropdown').click();
        await page.locator('option').first().waitFor({state:'attached'});
        const dropDownOption = await page.locator('.nav-progressive-search-dropdown option').allTextContents();

        await page.waitForLoadState();

        console.log(`dropdown count is ${dropDownOption.length}`);


        for(const drop of dropDownOption){
            console.log(drop)
        }

        const selectOp =  page.locator('.nav-progressive-search-dropdown');

        await selectOp.selectOption('Alexa Skills')
       


    })

})