import { test, expect, chromium } from '@playwright/test';
import { Client } from 'pg';


test('test', async ({ page }) => {
  const browser = await chromium.launch();
  await chromium.launch({ headless: false, slowMo: 1000 })
  const PromotionName = 'Buy 2 Get 1 Free'
  const productid2 = 'PPX0005'
  const productname = 'สินค้าทดสอบระบบ 5 (ไม่อนุญาตลด)'
  const adname = 'WE HOME (วี โฮม โซลูชั่น) '
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
  await page.goto('https://sit.ada-soft.com/AdaSCHome/');
  await page.getByPlaceholder('ชื่อผู้ใช้').fill('schome');
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
  //-----------------------------------------------------------------------------------------------------------------------------------
  const elementId = '#spnCompanyName';
  const elements1 = await page.$(elementId);
  if (elements1) {
    const text1 = await elements1.innerText();
    //const text3 = await elements3.innerText();
    console.log('\x1b[36m%s\x1b[0m', '-', ' [CPN] : ', text1);
    await page.waitForTimeout(delay);
  }
  //-----------------------------------------------------------------------------------------------------------------------------------
  try {
    await page.getByTitle('สินค้า', { exact: true }).click();
    await page.waitForTimeout(delay);
    await page.getByRole('link', { name: ' เอกสาร' }).click();
    await page.waitForTimeout(delay);
    await page.locator('#SKUDOCSKU a').filter({ hasText: 'โปรโมชั่น' }).click();
    await page.waitForTimeout(delay);
    console.log('\x1b[36m%s\x1b[0m', '[นำเข้าไฟล์ โปรโมชั่น]');
    await page.getByRole('button', { name: 'นำเข้า' }).click();
    await page.waitForTimeout(delay);
    await page.setInputFiles("input[type='file']", ["./Promotion/Promotion_Template SCH คูปองท้ายบิลและการให้แต้ม.xlsx"]);
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.waitForTimeout(delay);
    await Comname.waitFor({ state: "visible" });
    await page.waitForTimeout(2000);
    await page.getByRole('tab', { name: 'Promotion Group' }).click();
    await page.waitForTimeout(delay);
    await page.getByRole('tab', { name: 'Condition-กลุ่มซื้อ' }).click();
    await page.waitForTimeout(delay);
    await page.getByRole('tab', { name: 'Option1-กลุ่มรับ(กรณีส่วนลด)' }).click();
    await page.waitForTimeout(delay);
    await page.getByRole('tab', { name: 'Option2-กลุ่มรับ(กรณีcoupon)' }).click();
    await page.waitForTimeout(delay);
    await page.getByRole('tab', { name: 'Option3-กลุ่มรับ(กรณีแต้ม)' }).click();
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: 'ยืนยันการนำเข้า' }).click();
    await page.waitForTimeout(delay);
    console.log('\x1b[32m%s\x1b[0m', '[นำเข้าโปรโมชั่นเรียบร้อย]');
    await page.waitForTimeout(delay);
    await Comname.waitFor({ state: "visible" });
    await page.waitForTimeout(delay);
    console.log('\x1b[36m%s\x1b[0m', '[ดำเนินการอนุมัติเอกสาร]');
    await page.waitForTimeout(delay);
    await page.locator('#otrPromotionHD0 > td:nth-child(10) > img').click();
    await page.waitForTimeout(delay);
    await Comname.waitFor({ state: "visible" });
    await page.waitForTimeout(delay);
    await page.click('#obtPromotionApprove'); //คลิกอนุมัติ
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
    await page.waitForTimeout(5000);
    await Comname.waitFor({ state: "visible" });
    console.log('\x1b[32m%s\x1b[0m', '[อนุมัติเอกสารเรียบร้อย]');
    await page.waitForTimeout(delay);
    console.log('\x1b[36m%s\x1b[0m', '[ย้อนกลับ]');
    await page.waitForTimeout(delay);
    await page.locator('#odvBtnAddEdit').getByRole('button', { name: 'ย้อนกลับ' }).click();
    await page.waitForTimeout(3000);
    //-----------------------------------------------------------------------------------------------------------------------------------
    const elementpath = '//*[@id="otrPromotionHD0"]/td[3]';
    const elementpathdocsta = '//*[@id="otrPromotionHD0"]/td[6]/label';
    const elements1 = await page.$(elementpath);
    const elementsdocsta = await page.$(elementpathdocsta);
    if (elements1 && elementsdocsta) {
      const text1 = await elements1.innerText();
      const text2 = await elementsdocsta.innerText();      
      console.log('\x1b[36m%s\x1b[0m', '-', ' [เอกสารเลขที่]  : ', text1);
      console.log('\x1b[36m%s\x1b[0m', '-', ' [สภานะเอกสาร] : ', text2);

    }
    //-----------------------------------------------------------------------------------------------------------------------------------


  } catch (error) {
    console.error('Error :', error);
  } finally {
    console.log('Tested');
  }
});
