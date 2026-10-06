import { test } from '../fixtures/broswerFixture.js'

test('using fixutres', async({buyersPage, sellersPage}) =>{

    await buyersPage.goto('https://www.nseindia.com/');

    await sellersPage.goto('https://opensource-demo.orangehrmlive.com/');

})