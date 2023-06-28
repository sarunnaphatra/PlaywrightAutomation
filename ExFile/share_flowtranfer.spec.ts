import { test, expect, defineConfig   } from '@playwright/test';
import { exec, execSync  } from 'child_process';
import { chromium } from '@playwright/test';
import { Browser } from 'puppeteer';
export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
    video: 'on-first-retry',
  }});  
  
  
//* ฟังก์ชันสำหรับการ login
async function login(page){
const isLoginPage = true; //open web
if (isLoginPage) {
  await page.goto('https://sit.ada-soft.com/AdaStorebackSTD/login');
} else   {
  await page.goto('https://sit.ada-soft.com/AdaStorebackSTD/');
} 
//login
await page.waitForLoadState('networkidle');
await page.getByPlaceholder('ชื่อผู้ใช้').click();
await page.getByPlaceholder('ชื่อผู้ใช้').fill('0111');
await page.getByPlaceholder('ชื่อผู้ใช้').press('Tab');
await page.getByPlaceholder('รหัสผ่าน').fill('12345678');
const login = false;
  if(login){await page.getByPlaceholder('รหัสผ่าน').press('Enter') ;}
  else{await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();}
  await page.waitForLoadState('networkidle');
// await page.getByPlaceholder('รหัสผ่าน').press('Enter');
await page.waitForTimeout(12000);
await page.waitForLoadState('networkidle');
// ตรวจสอบว่าเข้าสู่ระบบสำเร็จหรือไม่
const wrongPasswordElement = await page.$('body:has-text("รหัสผ่านไม่ถูกต้อง")');
if (wrongPasswordElement) {
  // พบ element ที่แสดงข้อความ "รหัสผ่านไม่ถูกต้อง"
  console.log('รหัสผ่านไม่ถูกต้อง');
} else {
  const elementAfterLogin = await page.$('#odvContentWellcome');

  if (elementAfterLogin) {
    // ตรวจสอบว่า element ที่คาดหวังปรากฏอยู่หรือไม่
    console.log('Test Passed: Login successful');
  } else {
    // ไม่พบ element ที่คาดหวัง
    console.log('Test Failed: Login unsuccessful');
  }}}
  //*ฟังก์ชั่น เมนู
async function menu(page) {
   // Menu
   const menuElement = await page.locator('.xWOdvBtnMenu').first();
   const alternativeMenuElement = await page.getByTitle('Menu').first();
   const menuToClick = menuElement || alternativeMenuElement;
   
   if (menuToClick) {
     await menuToClick.click();
    
   }else{
    await alternativeMenuElement.click();
   }
}
//*ฟังก์ชั่นไปเมนูใบจ่ายโอน
async function trans_pay(page) {
  await page.getByTitle('สินค้า', { exact: true }).click();
  await page.getByRole('link', { name: ' เอกสาร' }).click();
  await page.getByTitle('สินค้าคงคลัง').click();
  await page.getByRole('link', { name: ' โอนสาขา' }).click();
  await page.locator('a').filter({ hasText: 'ใบจ่ายโอน - สาขา' }).click();
  await page.waitForLoadState('networkidle');
}
//*ฟังก็ชั่น ไปเมนู ใบรับโอน
async function store_re(page) {
     await page.getByTitle('สินค้า', { exact: true }).click();
     await page.getByRole('link', { name: ' เอกสาร' }).click();
     await page.getByTitle('สินค้าคงคลัง').click();
     await page.getByRole('link', { name: ' โอนสาขา' }).click();
     await page.locator('a').filter({ hasText: 'ใบรับโอน - สาขา' }).click();
     await page.waitForLoadState('networkidle');
  
}
//*ฟังก์ชั่นเช็คสต๊อกก่อนโอน
async function check_stock_b(page) {
  await  menu(page);
  //getbeoreaverage
  await page.getByTitle('สินค้าคงคลัง').click();
  await page.getByRole('link', { name: ' คลังสินค้า' }).click();
  await page.locator('#ICPDM a').filter({ hasText: 'สินค้าคงคลัง' }).click();
  await page.getByRole('textbox', { name: 'รหัสสินค้า' }).click();
  await page.getByRole('textbox', { name: 'รหัสสินค้า' }).fill('00168');
  await page.getByRole('button', { name: 'กรองข้อมูล' }).click();
  await page.waitForTimeout(5000);
  let [bNstore, bLavgvalue, bLvalue_st, bLinstock] = await Promise.all([
    page.$('#otrReason0 > td:nth-child(4)'),
    page.$('#otrReason0 > td:nth-child(7)'),
    page.$('#otrReason0 > td:nth-child(5)'),
    page.$('#otrReason0 > td:nth-child(6)'),
  ]);
  let namestore = await bNstore.evaluate((el) => el.textContent);
  let beforevalue = await bLavgvalue.evaluate((el) => el.textContent);
  let value_st = await bLvalue_st.evaluate((el) => el.textContent);
  let instock = await bLinstock.evaluate((el) => el.textContent);
  console.log(namestore);
  console.log('จำนวนคงคลัง', value_st);
  console.log('จำนวนค้างสต็อก:', instock);
  console.log('จำนวนรวมก่อนโอน:', beforevalue);
  //ตรวจสอบว่า คลังแสดงถูกไหม
  let sumValue = parseFloat(value_st) + parseFloat(instock);
  expect(parseFloat(beforevalue)).toBe(sumValue);//ทำ expect result ถ้าตรงนี้ไม่ถูกจะfail
  if (parseFloat(beforevalue) === sumValue) {
    console.log('Pass');
  } else {
    console.log('fail');
  }
  return  beforevalue;
};
  //*ฟังก์ชั่นเช็คสต๊อกหลังโอน
async function check_stock_A(page) {
    await  menu(page);
    //getbeoreaverage
    await page.getByTitle('สินค้าคงคลัง').click();
    await page.waitForTimeout(2000);
    // await page.getByRole('link', { name: ' คลังสินค้า' }).click();
    await page.locator('#ICPDM a').filter({ hasText: 'สินค้าคงคลัง' }).click();
    await page.getByRole('textbox', { name: 'รหัสสินค้า' }).click();
    await page.getByRole('textbox', { name: 'รหัสสินค้า' }).fill('00168');
    await page.getByRole('button', { name: 'กรองข้อมูล' }).click();
    await page.waitForTimeout(5000);
    let [ANstore, ALavgvalue, ALvalue_st, ALinstock] = await Promise.all([
      page.$('#otrReason0 > td:nth-child(4)'),
      page.$('#otrReason0 > td:nth-child(7)'),
      page.$('#otrReason0 > td:nth-child(5)'),
      page.$('#otrReason0 > td:nth-child(6)'),
    ]);
    let namestoreA = await ANstore.evaluate((el) => el.textContent);
    let Aftervalue = await ALavgvalue.evaluate((el) => el.textContent);
    let Avalue_st = await ALvalue_st.evaluate((el) => el.textContent);
    let Ainstock = await ALinstock.evaluate((el) => el.textContent);
    console.log(namestoreA);
    console.log('จำนวนคงคลัง', Avalue_st);
    console.log('จำนวนค้างสต็อก:', Ainstock);
    console.log('จำนวนรวมหลังโอน:', Aftervalue);
    //ตรวจสอบว่า คลังแสดงถูกไหม
    let sumValue = parseFloat(Avalue_st) + parseFloat(Ainstock);
    expect(parseFloat(Aftervalue)).toBe(sumValue);//ทำ expect result ถ้าตรงนี้ไม่ถูกจะfail
    if (parseFloat(Aftervalue) === sumValue) {
      console.log('Pass');
    } else {
      console.log('fail');
    }
    return Aftervalue;
};

 
//*ทำใบจ่ายโอนแล้วตรวจสอบ
test('trans-pay', async ({ page }) => {
    // const timeout = 240000; // 240000 มิลลิวินาที (4 นาที)
    await test.setTimeout(240000);
    await test.slow();
    //*login
    await login(page);
    //*menu - checkstoc
    await  menu(page);
    let beforevalue = await  check_stock_b(page);
    //*ไปเมนูใบจ่ายโอน
    await  menu(page);
    await trans_pay(page);
    //*เริ่มสร้างเอกสาร
      await page.getByRole('button', { name: '+' }).click();
      await page.waitForLoadState('networkidle');
    //*เลือกคลังต้นทาง กรณีนี้ใช้คลังขายมันเป็น ค่าเริ่มต้นเลยข้ามการเลือกต้นทาง
      // await page.locator('#obtTransferBchOutBrowseWahFrom').click();
      // await page.getByRole('cell', { name: 'คลังขาย' }).click();
      // await page.getByRole('button', { name: 'เลือก', exact: true }).click();
      await page.locator('#obtTransferBchOutBrowseBchTo').click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('cell', { name: 'STD-Sit-ProforPC2' }).click();
      await page.getByRole('button', { name: 'เลือก', exact: true }).click();
      await page.locator('#obtTransferBchOutBrowseWahTo').click();
      await page.getByRole('cell', { name: 'คลังขาย' }).click();
      await page.getByRole('button', { name: 'เลือก', exact: true }).click();
      //*เพิ่มสินค้าด้วยรหัส
      await page.getByPlaceholder('เพิ่มสินค้าด้วยบาร์โค้ดหรือรหัสสินค้า').click();
      await page.getByPlaceholder('เพิ่มสินค้าด้วยบาร์โค้ดหรือรหัสสินค้า').fill('00168');
      await page.getByPlaceholder('เพิ่มสินค้าด้วยบาร์โค้ดหรือรหัสสินค้า').press('Enter');
      await page.waitForTimeout(2000);
      //*ใส่จำนวนที่ต้องการในสินค้ารหัส00168
      await page.locator('input[name="ohdQty1"]').click();
      await page.locator('input[name="ohdQty1"]').fill('10');
      const Evaluepd = await page.$('#ohdQty1');
      const valuepd = await page.evaluate((el) => el.value, Evaluepd);
      console.log ('จำนวนที่โอนคลัง:',valuepd);
      //*บันทึก
      await page.waitForTimeout(1000);
      await page.getByRole('button', { name: 'บันทึก' }).click();
      //*approve
      await page.getByRole('button', { name: 'อนุมัติ' }).click();
      await page.getByRole('button', { name: 'ยืนยัน' }).click(); 
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(7000);
      //*ไว้เก็บเลขเอกสาร
      await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
      await page.waitForTimeout(5000);
      const numdocument = await page.$eval("#otrTransferBchOutHD0 > td:nth-child(3)", (element) => element.textContent);
      console.log('เลขที่เอกสาร:\t',numdocument);
      //*menu - checkstoc
    await  menu(page);
    let Aftervalue = await  check_stock_A(page);
    //*ตรวจสอบจำนวนก่อนและหลังโอน
    let Passcase = parseFloat(beforevalue) - parseFloat(valuepd);
    expect(parseFloat(Aftervalue)).toBe(Passcase);//ทำ expect result ถ้าตรงนี้ไม่ถูกจะfail
    if (parseFloat(Aftervalue) === Passcase) {
      console.log(beforevalue,'-',valuepd,'=',Aftervalue,'\tPass');
    } else {
      console.log('fail');
    }
  });