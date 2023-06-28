import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
 await page.goto('https://sit.ada-soft.com/AdaStorebackSTD/login');
 await page.getByPlaceholder('ชื่อผู้ใช้').fill('0111');
 await page.getByPlaceholder('ชื่อผู้ใช้').press('Tab');
 await page.getByPlaceholder('รหัสผ่าน').fill('12345678');
 await page.getByPlaceholder('รหัสผ่าน').press('Enter');
 await page.getByTitle('สินค้า', { exact: true }).click();
 await page.getByRole('link', { name: ' สินค้า' }).click();
 await page.locator('#SKUSKU a').first().click();
await page.getByPlaceholder('กรอกคำค้นหา').click();
await page.getByPlaceholder('กรอกคำค้นหา').fill('00240');
await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
await page.getByRole('row', { name: '00240 SZ12 EA 00240 - -' }).getByRole('img').nth(2).click();
await page.waitForTimeout(3000);
//const numdoc = await page.getByRole('textbox', { name: 'oetpdtcode' });
//const numdoc = await page.$eval("#oetpdtcode", (element) => element.textContent);

//const numdoc = await page.getByTestId("#oetpdtcode");
const Evaluepd = await page.$('#oetPdtCode');
const valuepd = await page.evaluate((el) => el.value, Evaluepd);
// console.log ('รหัสสิน้ค้า:',valuepd);
await page.locator('#oliPdtTitle').click();
 await page.getByPlaceholder('กรอกคำค้นหา').click();
 await page.getByPlaceholder('กรอกคำค้นหา').fill(valuepd);
 await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
 await page.waitForTimeout(7000);
 /*await page.getByRole('button', { name: '+' }).click();
 await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).fill('S');
 await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).click();
 await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).fill('SZ13');
 //await page.getByRole('button', { name: ' เลือกรูป' }).click();
//เลือกรูป
 await page.setInputFiles("input[type='file']",["./picture/001.png"]);
 //await page.setInputFiles("input[type='file']",["./picture/j003.jpg"]);
  //await page.getByRole('button', { name: ' เลือกรูป' }).setInputFiles('001.png');
 await page.getByRole('button', { name: 'ตกลง' }).click();
 await page.getByRole('button', { name: 'บันทึก' }).click();
 await page.locator('#oliPdtTitle').click();
 await page.getByPlaceholder('กรอกคำค้นหา').click();
 await page.getByPlaceholder('กรอกคำค้นหา').fill('00241');
 await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');*/

});