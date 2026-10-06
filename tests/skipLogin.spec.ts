import test from "@playwright/test";


test('skip login', async({page}) =>{

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
})