
import {test, expect} from '@playwright/test';

test('creating the storage state', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByPlaceholder('email@example.com').fill("santhu8788@gmail.com");
    await page.getByPlaceholder('enter your passsword').fill("Santhu.8788@");
    await page.getByRole('button', { name: 'login' }).click();
    const validation = await page.locator('#toast-container').textContent();
    expect(validation?.trim()).toEqual("Login Successfully");
    await page.context().storageState({path:'tests/Authentications.json'})

}
)