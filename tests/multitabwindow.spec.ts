import {test, expect, chromium, firefox} from '@playwright/test';


test.describe.serial('Serical mode', ()=>{

//test.describe.configure({mode:'serial'});
test('Open mult tabs', async({ context}) =>{
    const page1 = await context.newPage();
    await page1.goto('https://www.nseindia.com/');
    const page2 = await context.newPage();
    await page2.goto('https://opensource-demo.orangehrmlive.com/');
})

test('Open mult windows', async({ browser}) =>{
    const browser1 = await firefox.launch();
    const firfoxpage = await browser1.newContext();
    const firpa= await firfoxpage.newPage();
    await firpa.goto('https://www.nseindia.com/')
    const buyerContext = await browser.newContext();
    const buyerPage= await buyerContext.newPage();
    await buyerPage.goto('https://www.nseindia.com/');
    const sellerContext = await browser.newContext();
    const sellerPage= await sellerContext.newPage();
    await sellerPage.goto('https://opensource-demo.orangehrmlive.com/');
})

})