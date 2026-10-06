import { test as base, Page } from '@playwright/test';


type MyFixtures = {

    buyersPage: Page;
    sellersPage: Page;
}

export const test = base.extend<MyFixtures>({
    buyersPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(page);
        await page.close();
    },

    sellersPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(page);
        await page.close();
    }
})
