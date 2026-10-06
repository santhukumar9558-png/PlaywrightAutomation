import { test } from '@playwright/test'

test('Print all links', async ({ page }) => {

    await page.goto('https://www.microsoft.com/')
    // Handle the "No thanks" popup if it appears
    const noThanksButton = page.getByRole('link', { name: 'No thanks' });
    // or if it's a button: page.getByRole('button', { name: 'No thanks' })

    try {
        await noThanksButton.waitFor({ state: 'visible', timeout: 5000 });
        await noThanksButton.click();
    } catch (e) {
        // Popup didn't appear, continue
        console.log('No popup found, continuing...');
    }

    const dropDown = page.getByRole('button', { name: 'All Microsoft' })

    await dropDown.waitFor({ state: 'visible' });
    await dropDown.click();

    const allLinks = await page.locator('a').allTextContents();

    for (const link of allLinks) {
        console.log(link)
    }

})

