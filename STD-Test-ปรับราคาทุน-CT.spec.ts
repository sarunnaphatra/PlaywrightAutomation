import { test, expect, chromium } from '@playwright/test';
import { Client } from 'pg';


test('test', async ({ page }) => {
  const browser = await chromium.launch();
  await chromium.launch({ headless: false, slowMo: 1000 })
  const productid = 'PP0005'
  const productid2 = 'PPX0005'
  const productname = 'สินค้าทดสอบระบบ 5 (ไม่อนุญาตลด)'
  const adname = 'STD-Sit-ProforPC '
  //const productid = 'PP0004X'
  const delay = 1000
  test.setTimeout(5000000);
  await test.slow();
  // Get screen dimensions manually
  const { width, height } = {
    width: 1280,
    height: 700,
  };
  // Set viewport size to screen dimensions
  await page.setViewportSize({ width, height });
  await page.goto('https://sit.ada-soft.com/AdaStorebackSTD/login');
  await page.getByPlaceholder('ชื่อผู้ใช้').fill('0111');
  await page.getByPlaceholder('ชื่อผู้ใช้').press('Tab');
  await page.getByPlaceholder('รหัสผ่าน').fill('1234');
  await page.getByPlaceholder('รหัสผ่าน').press('Tab');
  await page.getByRole('link', { name: 'ภาษาไทย' }).press('Tab');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).press('Enter');
  const Incor = page.locator("#ospUsrOrPwNotCorrect"); //01
  await Incor.waitFor({ state: "visible" });      //02 =01>02 รอจนกว่าจะแสดง Element
  await expect(page.locator("#ospUsrOrPwNotCorrect")).toHaveText('รหัสผ่านไม่ถูกต้อง'); //VerifyText
  await page.waitForTimeout(3000);
  await page.getByPlaceholder('รหัสผ่าน').fill('12345678');
  await page.getByPlaceholder('รหัสผ่าน').press('Tab');
  await page.getByRole('link', { name: 'ภาษาไทย' }).press('Tab');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).press('Enter');
  await page.waitForLoadState('networkidle');
  const Comname = page.locator("#spnCompanyName"); //01
  await Comname.waitFor({ state: "visible" });        //02 =01>02 รอจนกว่าจะแสดง Element
  await expect(page.locator("#spnCompanyName")).toHaveText(adname);  //VerifyText
  await page.waitForTimeout(3000);
  try {
    

  } catch (error) {
    console.error('Error :', error);
  } finally {
    console.log('Tested');
  }
});
