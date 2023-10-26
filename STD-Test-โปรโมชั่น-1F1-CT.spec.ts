import { test, expect, chromium } from '@playwright/test';
import { Client } from 'pg';


test('test', async ({ page }) => {
  const browser = await chromium.launch();
  await chromium.launch({ headless: false, slowMo: 1000 })
  const PromotionName = 'Buy 2 Get 1 Free'
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

    await page.getByTitle('สินค้า', { exact: true }).click();
    await page.waitForTimeout(delay);
    await page.getByRole('link', { name: ' เอกสาร' }).click();
    await page.waitForTimeout(delay);
    await page.locator('#SKUDOCSKU a').filter({ hasText: 'โปรโมชั่น' }).click();
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: '+' }).click();
    await page.waitForTimeout(delay);
    await page.locator('#oetPromotionPmhName').click();
    await page.waitForTimeout(delay);
    await page.locator('#oetPromotionPmhName').fill('Buy2Get1Free');
    await page.waitForTimeout(delay);
    await page.locator('#oetPromotionPmhNameSlip').click();
    await page.waitForTimeout(delay);
    await page.locator('#oetPromotionPmhNameSlip').fill('Buy2Get1Free');
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: '+' }).click();
    await page.waitForTimeout(delay);
    await page.locator('#oetPromotionGroupNameTmp').click();
    await page.waitForTimeout(delay);
    await page.locator('#oetPromotionGroupNameTmp').fill('2FREE1');
    await page.waitForTimeout(delay);
    await page.locator('#odvPromotionAddPmtGroupModal').getByText('+').click();
    //------
    // รอให้หน้าเว็บโหลดเสร็จ
    await page.waitForSelector('#ocmSearchPDTSelectbox');

    // คลิกที่ dropdown button เพื่อเปิด dropdown
    await page.click('button[data-id="ocmSearchPDTSelectbox"]');

    // รอให้ตัวเลือกของ dropdown ปรากฏ
    await page.waitForSelector('ul.dropdown-menu.inner');

    // คลิกที่ตัวเลือกที่มี text เป็น "รหัสสินค้า"
    await page.click('ul.dropdown-menu.inner a[role="option"][aria-label="รหัสสินค้า"]');

    console.log('คลิกตัวเลือกที่มี text เป็น "รหัสสินค้า"');
    await page.pause();
    await page.waitForTimeout(delay);
    await page.waitForSelector('#ocmSearchPDTSelectbox');
    await page.waitForTimeout(delay);
    await page.locator('#odvModalsectionBodyPDT > div > div:nth-child(1) > div > div > div > div.col-lg-2.col-md-2 > div > div > button > span > span').click();
    await page.waitForTimeout(delay);
    await page.waitForNavigation();
    await page.click('[id="ocmSearchPDTSelectbox"][title="รหัสสินค้า"]');
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('กรอกคำค้นหา').fill('PP0003');
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
    await page.waitForTimeout(delay);
    await page.getByRole('cell', { name: 'PP0003' }).first().click();
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: 'เลือก' }).click();
    await page.waitForTimeout(delay);
    //-------
    await page.locator('#odvPromotionAddPmtGroupModal').getByText('+').click();
    await page.waitForTimeout(delay);
    await page.waitForSelector('#ocmSearchPDTSelectbox');
    await page.waitForTimeout(delay);
    await page.locator('#odvModalsectionBodyPDT > div > div:nth-child(1) > div > div > div > div.col-lg-2.col-md-2 > div > div > button > span > span').click();
    await page.waitForTimeout(delay);
    await page.click('[id="ocmSearchPDTSelectbox"][title="รหัสสินค้า"]');
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('กรอกคำค้นหา').fill('PP0004');
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
    await page.waitForTimeout(delay);
    await page.getByRole('cell', { name: 'PP0004' }).first().click();
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: 'เลือก' }).click();
    await page.waitForTimeout(delay);
    //------
    await page.locator('#odvPromotionAddPmtGroupModal').getByText('+').click();
    await page.waitForTimeout(delay);
    await page.waitForSelector('#ocmSearchPDTSelectbox');
    await page.waitForTimeout(delay);
    await page.locator('#odvModalsectionBodyPDT > div > div:nth-child(1) > div > div > div > div.col-lg-2.col-md-2 > div > div > button > span > span').click();
    await page.waitForTimeout(delay);
    await page.click('[id="ocmSearchPDTSelectbox"][title="รหัสสินค้า"]');
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('กรอกคำค้นหา').fill('PP0005');
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
    await page.waitForTimeout(delay);
    await page.getByRole('cell', { name: 'PP0005' }).first().click();
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: 'เลือก' }).click();
    await page.waitForTimeout(delay);
    //---------
    await page.locator('#odvPromotionAddPmtGroupModal').getByText('+').click();
    await page.waitForTimeout(delay);
    await page.waitForSelector('#ocmSearchPDTSelectbox');
    await page.waitForTimeout(delay);
    await page.locator('#odvModalsectionBodyPDT > div > div:nth-child(1) > div > div > div > div.col-lg-2.col-md-2 > div > div > button > span > span').click();
    await page.waitForTimeout(delay);
    await page.click('[id="ocmSearchPDTSelectbox"][title="รหัสสินค้า"]');
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('กรอกคำค้นหา').fill('PP0006');
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
    await page.waitForTimeout(delay);
    await page.getByRole('cell', { name: 'PP0006' }).first().click();
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: 'เลือก' }).click();
    await page.waitForTimeout(delay);
    await page.pause();



  } catch (error) {
    console.error('Error :', error);
  } finally {
    console.log('Tested');
  }
});
