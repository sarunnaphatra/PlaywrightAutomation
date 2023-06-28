import { test, expect, chromium } from '@playwright/test';

test('test', async ({ page }) => {
    await chromium.launch({headless: true, slowMo: 1000})
    const browser = await chromium.launch();
    const productid = 'PP0004X'
    const productname = 'PEP-TEST04'
    const gText = 'ไม่พบข้อมูล'
    test.setTimeout(5000000);
    await test.slow();
    await page.goto('https://sit.ada-soft.com/AdaStorebackSTD/login');
    await page.getByPlaceholder('ชื่อผู้ใช้').fill('008');
    await page.getByPlaceholder('ชื่อผู้ใช้').press('Tab');
    await page.getByPlaceholder('รหัสผ่าน').fill('1234');
    await page.getByPlaceholder('รหัสผ่าน').press('Tab');
    await page.getByRole('link', { name: 'ภาษาไทย' }).press('Tab');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).press('Enter');
    const Incor = page.locator("#ospUsrOrPwNotCorrect"); //01
    await Incor.waitFor({state: "visible"});      //02 =01>02 รอจนกว่าจะแสดง Element
    await expect(page.locator("#ospUsrOrPwNotCorrect")).toHaveText('รหัสผ่านไม่ถูกต้อง'); //VerifyText
    await page.waitForTimeout(3000);
    await page.getByPlaceholder('รหัสผ่าน').fill('12345678');
    await page.getByPlaceholder('รหัสผ่าน').press('Tab');
    await page.getByRole('link', { name: 'ภาษาไทย' }).press('Tab');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).press('Enter');
    await page.waitForLoadState('networkidle');
    const Comname = page.locator("#spnCompanyName"); //01
    await Comname.waitFor({state: "visible"});        //02 =01>02 รอจนกว่าจะแสดง Element
    await expect(page.locator("#spnCompanyName")).toHaveText('Adasoft');  //VerifyText
    await page.waitForTimeout(3000);
    
      //สินค้า
  await page.getByTitle('สินค้า', { exact: true }).click();
  await page.getByRole('link', { name: ' สินค้า' }).click();
  await page.locator('#SKUSKU a').first().click();
  const ChkProd01 = page.locator("#oliPdtTitle"); //01
  await ChkProd01.waitFor({state: "visible"});      //02 =01>02 รอจนกว่าจะแสดง Element คำว่า สินค้า
  await expect(page.locator("#oliPdtTitle")).toHaveText('สินค้า'); //VerifyText
  await page.getByPlaceholder('กรอกคำค้นหา').click();
  await page.getByPlaceholder('กรอกคำค้นหา').fill(productid);  
  await page.locator('#obtSearchProduct').click();
  await page.waitForTimeout(3000);
  //ค้นหาสินค้า
  if (await page.isVisible("text='ไม่พบข้อมูล'")) {
    await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
    //สินค้า
    await page.getByRole('button', { name: '+' }).click();
    await page.waitForTimeout(700);
    await page.setInputFiles("input[type='file']",["./Pictures/001.jpg"]);
    await page.waitForTimeout(2000);
    //await page.locator('#oModalCropperProduct > div > div > div.modal-footer > button > span').click();
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.waitForTimeout(2000);
    await page.setInputFiles("input[type='file']",["./Pictures/002.jpg"]);
    await page.waitForTimeout(2000);
    //await page.locator('#oModalCropperProduct > div > div > div.modal-footer > button > span').click();
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('combobox', { name: 'ระบบขาย' }).click();
    await page.waitForTimeout(700);
    await page.locator('#bs-select-4-3').click();
    await page.waitForTimeout(700);
    await page.getByRole('combobox', { name: 'ระบบเช่า' }).click();
    await page.waitForTimeout(700);
    await page.locator('#bs-select-4-0').click();
    await page.waitForTimeout(700);
    await page.getByText('สร้างอัตโนมัติ').click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'รหัสสินค้า' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'รหัสสินค้า' }).fill(productid);
    await page.waitForTimeout(700);
    await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).fill(productname);
    await page.waitForTimeout(700);
    await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').click();
    await page.waitForTimeout(700);
    await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').fill(productname);
    await page.waitForTimeout(700);
    await page.getByPlaceholder('ชื่อสินค้าอย่างย่อ').click();
    await page.waitForTimeout(700);
    await page.getByPlaceholder('ชื่อสินค้าอย่างย่อ').fill(productname);
    await page.waitForTimeout(700);
    await page.locator('#obtPdtSaleStop').click();
    await page.waitForTimeout(700);
    //await page.getByRole('cell', { name: 'June 2024' }).click();
    await page.locator('body > div.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top > div.datepicker-days > table > thead > tr:nth-child(2) > th.datepicker-switch').click();
    await page.waitForTimeout(700);
    await page.getByText('Dec').click();
    await page.waitForTimeout(700);
    await page.getByRole('cell', { name: '31' }).click();
    await page.waitForTimeout(700);
    //กดบันทึกสร้างสินค้า
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(7000);
    // เพิ่ม หน่วยสินค้าที่ 2
    await page.getByRole('button', { name: '+' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00057');
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('cell', { name: '00057' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.waitForTimeout(700);
    await page.getByRole('row', { name: 'Container  จัดการบาร์โค้ด 0.00' }).getByText('จัดการบาร์โค้ด').click();
    await page.waitForTimeout(700);
    await page.getByPlaceholder('กรุณากรอกหรือสแกนรหัสบาร์โค้ด').click();
    await page.waitForTimeout(700);
    await page.getByPlaceholder('กรุณากรอกหรือสแกนรหัสบาร์โค้ด').fill('PBAR000001');
    await page.waitForTimeout(700);
    await page.locator('#oetModalAebPlcName').click();
    await page.waitForTimeout(700);
    await page.locator('#obtModalAebBrowsePdtLocation').click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('Hello');
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('cell', { name: '00001' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.waitForTimeout(700);
    await page.locator('#oetModalAesSplName').click();
    await page.waitForTimeout(700);
    await page.locator('#obtModalAebBrowsePdtSupplier').click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('AP00008');
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('cell', { name: 'AP00008' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.waitForTimeout(700);
    await page.getByText('สถานะใช้งาน').click();
    await page.waitForTimeout(700);
    await page.getByText('สถานะใช้งาน').click();
    await page.waitForTimeout(700);
    await page.getByText('อนุญาตขาย', { exact: true }).click();
    await page.waitForTimeout(700);
    await page.getByText('อนุญาตขาย', { exact: true }).click();
    await page.waitForTimeout(700);
    await page.getByText('สถานะอนุญาตทำใบสั่งซื้อ').click();
    await page.waitForTimeout(700);
    await page.getByText('สถานะอนุญาตทำใบสั่งซื้อ').click();
    await page.waitForTimeout(700);
    await page.locator('#ofmModalAebBarCode').getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(7000);
    await page.getByRole('button', { name: 'Close' }).click();
    await page.waitForTimeout(7000);
    //บันทึกหลัก
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(7000);

  }
  else { // ถ้าตรวจสอบแล้วว่ามีข้อมูลอยุ่แล้วเพื่อเคลียร์ข้อมูล

    //ลบ
    console.log('ขั้นตอนทดสอบการลบ')
    await page.getByTitle('สินค้า', { exact: true }).click();
    await page.waitForTimeout(700);
    await page.locator('#SKUSKU a').first().click();
    await page.waitForTimeout(700);
    await page.locator('#odvContentPageProduct > div.panel-heading > div > div:nth-child(2) > div > div > button > span > span').click();
    //await page.getByRole('combobox', { name: 'รหัสสินค้า' }).click(); //#bs-select-23-1
    await page.waitForTimeout(700);
    await page.locator('#bs-select-5-1').click();  
    //await page.locator('#bs-select-23-1').click();
    await page.waitForTimeout(700);
    await page.getByPlaceholder('กรอกคำค้นหา').click();
    await page.waitForTimeout(700);
    await page.getByPlaceholder('กรอกคำค้นหา').fill(productname);
    await page.waitForTimeout(700);
    await page.locator('#obtSearchProduct').click();
    await page.waitForTimeout(700);
    //await page.getByRole('row', { name: 'PP0004X PEP-TEST04 ชิ้น PP0004X - -' }).getByRole('img').first().click();
    await page.locator('#odvPdtDataList > tr.xCNTextDetail2.xWPdtInfo.xWPdtTr1 > td:nth-child(9) > img').click();
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
    await page.waitForTimeout(700);

  //await page.pause();
  console.log('จบขั้นตอนทดสอบการลบ เนื่องจากมีข้อมูลค้าง')
  await page.waitForTimeout(700);
  await browser.close();

  }
  //สินค้าชุด
  await page.getByRole('tab', { name: 'สินค้าชุด' }).click();
  await page.waitForTimeout(700);
  //const visible = await page.getByText('ไม่พบข้อมูล').isVisible();
  //if (await page.isVisible('ไม่พบข้อมูล')) {
  // await expect(page.locator("#otbPdtProductSetData > tbody > tr > td")).toHaveText('ไม่พบข้อมูล'); 
  await page.getByRole('button', { name: '+' }).click();
  await page.waitForTimeout(700);
  await page.locator('#odvPdtSetDataTable').getByRole('button').click();
  await page.waitForTimeout(700);
  await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
  await page.waitForTimeout(700);
  await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00227');
  await page.waitForTimeout(700);
  await page.locator('#odvModalsectionBodyPDT').getByRole('button').click();
  await page.waitForTimeout(700);
  await page.getByRole('cell', { name: '00227' }).first().click();
  await page.waitForTimeout(700);
  await page.getByRole('button', { name: 'เลือก' }).click();
  await page.waitForTimeout(700);
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('button', { name: '+' }).click();
  await page.waitForTimeout(700);
  await page.locator('#odvPdtSetDataTable').getByRole('button').click();
  await page.waitForTimeout(700);
  await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
  await page.waitForTimeout(700);
  await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00228');
  await page.waitForTimeout(700);
  await page.locator('#odvModalsectionBodyPDT').getByRole('button').click();
  await page.waitForTimeout(700);
  await page.getByRole('cell', { name: '00228' }).first().click();
  await page.waitForTimeout(700);
  await page.getByRole('button', { name: 'เลือก' }).click();
  await page.waitForTimeout(700);
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('button', { name: '+' }).click();
  await page.waitForTimeout(700);
  await page.locator('#odvPdtSetDataTable').getByRole('button').click();
  await page.waitForTimeout(700);
  await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
  await page.waitForTimeout(700);
  await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00229');
  await page.waitForTimeout(700);
  await page.locator('#odvModalsectionBodyPDT').getByRole('button').click();
  await page.waitForTimeout(700);
  await page.getByRole('cell', { name: '00229' }).first().click();
  await page.waitForTimeout(700);
  await page.getByRole('button', { name: 'เลือก' }).click();
  await page.waitForTimeout(700);
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('tab', { name: 'ข้อมูลหลัก' }).click();
  await page.waitForTimeout(700);
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.waitForTimeout(7000);
  await page.locator('#oliPdtTitle').click();
  await page.waitForTimeout(700);
  await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
  await page.waitForTimeout(700);
  await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill(productid);
  await page.waitForTimeout(700);
  await page.locator('#obtSearchProduct').click();
  await page.waitForTimeout(700);

  // }
  // else{
  console.log('จบขั้นตอนทดสอบสร้างสินค้าเบื้องต้น')
  await browser.close();



});