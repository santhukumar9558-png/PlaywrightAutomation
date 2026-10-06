
import {test, expect} from '@playwright/test';

test('validate popups', async({page}) =>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //await page.goto("https:google.com");
    //await page.goBack();
   // await page.goForward();
   await expect(page.locator('#displayed-text')).toBeVisible();
   await page.locator('#hide-textbox').click();
   await expect(page.locator('#displayed-text')).toBeHidden();
   page.on('dialog', dialog =>{
    const expectedResult = 'Hello , Are you sure you want to confirm?';
    dialog.accept();
    console.log(dialog.message());
    expect(dialog.message()).toEqual(expectedResult);
   });
    await page.locator('#confirmbtn').click();
})
test('Frames', async({page}) =>{

     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

     const allFrames = await page.frames();
     console.log(allFrames.length);
     console.log(allFrames.forEach(frame => frame.name()));

})