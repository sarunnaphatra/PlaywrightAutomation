import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(5000000);
  //await page.waitForTimeout(3000);
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
  const Comname = page.locator("#spnCompanyName"); //01
  await Comname.waitFor({state: "visible"});        //02 =01>02 รอจนกว่าจะแสดง Element
  await expect(page.locator("#spnCompanyName")).toHaveText('Adasoft');  //VerifyText
  await page.waitForTimeout(5000);
  //สินค้า
  await page.getByTitle('สินค้า', { exact: true }).click();
  await page.getByRole('link', { name: ' สินค้า' }).click();
  await page.locator('#SKUSKU a').first().click();
  const ChkProd01 = page.locator("#oliPdtTitle"); //01
  await ChkProd01.waitFor({state: "visible"});      //02 =01>02 รอจนกว่าจะแสดง Element คำว่า สินค้า
  await expect(page.locator("#oliPdtTitle")).toHaveText('สินค้า'); //VerifyText
  await page.getByPlaceholder('กรอกคำค้นหา').click();
  await page.getByPlaceholder('กรอกคำค้นหา').fill('P0003');  //<< เปลี่ยน 01
  await page.locator('#obtSearchProduct').click();
  await page.waitForTimeout(3000);
  //await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');  
  //await expect(page.locator("#odvPdtDataList > tr > td")).toHaveText('ไม่พบข้อมูล'); //VerifyText
  //if สินค้า = ไม่พบข้อมูล
  if (await page.isVisible("text='ไม่พบข้อมูล'")) {
    await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('combobox', { name: 'ระบบขาย' }).click();
    await page.locator('#bs-select-4-3').click();
    await page.getByRole('combobox', { name: 'ระบบเช่า' }).click();
    await page.locator('#bs-select-4-0').click();
    await page.getByText('สร้างอัตโนมัติ').click();
    await page.getByRole('textbox', { name: 'รหัสสินค้า' }).click();
    await page.getByRole('textbox', { name: 'รหัสสินค้า' }).fill('P0003');
    await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').click();
    await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).click();
    await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).fill('PEPSITEST03');
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').click();
    await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').fill('PEPSITEST03');
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('ชื่อสินค้าอย่างย่อ').click();
    await page.getByPlaceholder('ชื่อสินค้าอย่างย่อ').fill('PEPSITEST03');
    await page.waitForTimeout(2000);
   // await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).click();
    //await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).fill('');
    //await expect(page.locator("#oetPdtName-error")).toHaveText('กรุณากรอกชื่อสินค้า'); //VerifyText
    //await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).fill('PEPSITEST');
    //await page.waitForTimeout(2000);
   //await page.getByRole('combobox', { name: 'สินค้าทั่วไป' }).click();
    //await page.locator('#bs-select-5-2').click();
    //await page.waitForTimeout(2000);
    //await page.getByRole('combobox', { name: 'สินค้าอื่นๆ' }).click();
    //await page.locator('#bs-select-5-0').click();
    //await page.waitForTimeout(2000);
    //await page.getByRole('combobox', { name: 'บังคับ' }).click();
    //await page.locator('#bs-select-6-1').click();
    //await page.waitForTimeout(2000);
    //await page.getByRole('combobox', { name: 'แก้ไข' }).click();
    //await page.locator('#bs-select-6-0').click();
    //await page.waitForTimeout(2000);
    await page.locator('#obtPdtSaleStop').click();
    await page.waitForTimeout(2000);
    await page.getByRole('cell', { name: 'May 2024' }).click();
    await page.getByText('Dec').click();
    await page.getByRole('cell', { name: '31' }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('cell', { name: 'ถ้วย' }).getByRole('img').click(); //555555555555555555
    await page.locator('#obtModalUnitBrowse').click();
    //await expect(page.locator("#odvModalContent > div.modal-header.xCNModalHead > div > div:nth-child(1) > label")).toHaveText('แสดงข้อมูล : หน่วยสินค้า'); //VerifyText
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00022');
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
    await page.getByRole('cell', { name: 'ชิ้น' }).click();
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.getByText('อนุญาตจัดสินค้า').click();
    await page.locator('#odvModalMngUnitPackSize').getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(5000);

    //ปุ่มจัดการบาร์โค้ด
    await page.getByRole('cell').getByText('จัดการบาร์โค้ด').click();  //Impost///////////////////////////////////////////
    await expect(page.locator("#odvModalAddEditBarCode > div > div > div.modal-header.xCNModalHead > div > div:nth-child(1) > label")).toHaveText('จัดการบาร์โค้ด'); //VerifyText
    await page.getByPlaceholder('กรุณากรอกหรือสแกนรหัสบาร์โค้ด').click();
    await page.getByPlaceholder('กรุณากรอกหรือสแกนรหัสบาร์โค้ด').fill('P0000000003');
    await page.locator('#obtModalAebBrowsePdtLocation').click();
    await expect(page.locator("#odvModalContent > div.modal-header.xCNModalHead > div > div:nth-child(1) > label")).toHaveText('แสดงข้อมูล : ที่เก็บสินค้า'); //VerifyText
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('TEST');
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
    await page.getByRole('cell', { name: 'TESTER-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' }).click();
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.locator('#obtModalAebBrowsePdtSupplier').click();
    await expect(page.locator("#odvModalContent > div.modal-header.xCNModalHead > div > div:nth-child(1) > label")).toHaveText('แสดงข้อมูล : ผู้จำหน่าย'); //VerifyText
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('AP00008');
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
    await page.getByRole('cell', { name: 'TESTER' }).click();
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.locator('#ofmModalAebBarCode').getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByTitle('Orange').getByRole('img', { name: 'Checked Icon' }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(5000);
    await page.locator('#oliPdtTitle').click();
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('P0003'); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
    await expect(page.locator("#odvPdtDataList > tr.xCNTextDetail2.xWPdtInfo.xWPdtTr1 > td:nth-child(3)")).toHaveText('P0003'); //VerifyText




    console.log('รันอีกครั้งเพื่อทดสอบการลบ และสร้างใหม่t')
    
  }
  else {

    console.log('Not Playwright')
    await page.getByRole('row', { name: 'P0003 PEPSITEST03 ชิ้น P0000000003 - -' }).getByRole('img').first().click();
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
  
    // ---------------------
    await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('combobox', { name: 'ระบบขาย' }).click();
    await page.locator('#bs-select-4-3').click();
    await page.getByRole('combobox', { name: 'ระบบเช่า' }).click();
    await page.locator('#bs-select-4-0').click();
    await page.getByText('สร้างอัตโนมัติ').click();
    await page.getByRole('textbox', { name: 'รหัสสินค้า' }).click();
    await page.getByRole('textbox', { name: 'รหัสสินค้า' }).fill('P0003');
    await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').click();
    await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).click();
    await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).fill('PEPSITEST03');
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').click();
    await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').fill('PEPSITEST03');
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('ชื่อสินค้าอย่างย่อ').click();
    await page.getByPlaceholder('ชื่อสินค้าอย่างย่อ').fill('PEPSITEST03');
    await page.waitForTimeout(2000);
    //Hold
    await page.locator('#obtPdtSaleStop').click();
    await page.waitForTimeout(2000);
    await page.getByRole('cell', { name: 'May 2024' }).click();
    await page.getByText('Dec').click();
    await page.getByRole('cell', { name: '31' }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('cell', { name: 'ถ้วย' }).getByRole('img').click(); //
    await page.locator('#obtModalUnitBrowse').click();
    //await expect(page.locator("#odvModalContent > div.modal-header.xCNModalHead > div > div:nth-child(1) > label")).toHaveText('แสดงข้อมูล : หน่วยสินค้า'); //VerifyText
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00022');
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
    await page.getByRole('cell', { name: 'ชิ้น' }).click();
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.getByText('อนุญาตจัดสินค้า').click();
    await page.locator('#odvModalMngUnitPackSize').getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(5000);

    //ปุ่มจัดการบาร์โค้ด
    await page.getByRole('cell').getByText('จัดการบาร์โค้ด').click();  //Impost
    await expect(page.locator("#odvModalAddEditBarCode > div > div > div.modal-header.xCNModalHead > div > div:nth-child(1) > label")).toHaveText('จัดการบาร์โค้ด'); //VerifyText
    await page.getByPlaceholder('กรุณากรอกหรือสแกนรหัสบาร์โค้ด').click();
    await page.getByPlaceholder('กรุณากรอกหรือสแกนรหัสบาร์โค้ด').fill('P0000000003');
    await page.locator('#obtModalAebBrowsePdtLocation').click();
    await expect(page.locator("#odvModalContent > div.modal-header.xCNModalHead > div > div:nth-child(1) > label")).toHaveText('แสดงข้อมูล : ที่เก็บสินค้า'); //VerifyText
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('TEST');
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
    await page.getByRole('cell', { name: 'TESTER-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' }).click();
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.locator('#obtModalAebBrowsePdtSupplier').click();
    await expect(page.locator("#odvModalContent > div.modal-header.xCNModalHead > div > div:nth-child(1) > label")).toHaveText('แสดงข้อมูล : ผู้จำหน่าย'); //VerifyText
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('AP00008');
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
    await page.getByRole('cell', { name: 'TESTER' }).click();
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.locator('#ofmModalAebBarCode').getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByTitle('Orange').getByRole('img', { name: 'Checked Icon' }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(5000);
    await page.locator('#oliPdtTitle').click();
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('P0003'); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
    await expect(page.locator("#odvPdtDataList > tr.xCNTextDetail2.xWPdtInfo.xWPdtTr1 > td:nth-child(3)")).toHaveText('P0003'); //VerifyText
    //ปรับราคาขาย
    console.log('กดปุ่มปรับราคาขาย')
    await page.waitForTimeout(15000);
    await page.getByTitle('สินค้า', { exact: true }).click();
    await page.getByRole('link', { name: ' เอกสาร' }).click();
    await page.locator('a').filter({ hasText: 'ใบปรับราคาขาย' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: '+' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: '+' }).click();
    await page.waitForTimeout(3000);

    await page.getByRole('combobox', { name: 'รหัสสินค้า' }).click();
    await page.waitForTimeout(1000);
    await page.locator('#bs-select-41-4').click();
    await page.waitForTimeout(1000);
    await page.getByRole('combobox', { name: 'ประเภทสินค้า' }).click();
    await page.waitForTimeout(1000);
    await page.locator('#bs-select-41-1').click();

    await page.getByRole('combobox', { name: 'รหัสสินค้า' }).press('Tab'); 
    await page.locator('#oetSearchPDTText').fill('P0003'); //#oetSearchPDTText
    await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
    await page.getByRole('cell', { name: 'P0003' }).nth(2).click();
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.locator('#ohdFCXtdPriceRet1').fill('300');
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'อนุมัติ' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
    await page.waitForTimeout(3000);
    console.log('อนุมัติแล้ว')
    await page.getByRole('cell', { name: 'ตรวจสอบราคา' }).getByText('ตรวจสอบราคา').click();
    await page.waitForTimeout(5000);
    await page.locator('#odvModalOriginalPrice button').click();
    await page.getByTitle('สินค้า', { exact: true }).click();
    await page.getByRole('link', { name: ' สินค้า' }).click();
    await page.locator('#SKUSKU a').first().click();
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('P0003');
    await page.locator('#obtSearchProduct').click();
    await page.getByRole('row', { name: 'P0003 PEPSITEST03 ชิ้น P0000000003 - -' }).getByRole('img').nth(1).click(); //#oetSearchPDTText
  
    await page.pause();
    // do something else
  }


});