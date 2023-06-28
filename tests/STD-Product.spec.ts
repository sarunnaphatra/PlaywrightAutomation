import { test, expect, chromium } from '@playwright/test';

test('test', async ({ page }) => {
  const browser = await chromium.launch({headless: false, slowMo: 300})
  //const page = await browser.newPage();
  test.setTimeout(5000000);
  //await page.waitForTimeout(3000);
  await test.slow();
  await page.goto('https://sit.ada-soft.com/AdaStorebackSTD/login');
  await page.getByPlaceholder('ชื่อผู้ใช้').fill('pep');
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
  await expect(page.locator("#spnCompanyName")).toHaveText('บริษัท ตัวอย่างร้านค้า ฟู๊ดคอร์ด จำกัด');  //VerifyText
  await page.waitForTimeout(3000);
  //สินค้า
  await page.getByTitle('สินค้า', { exact: true }).click();
  await page.getByRole('link', { name: ' สินค้า' }).click();
  await page.locator('#SKUSKU a').first().click();
  const ChkProd01 = page.locator("#oliPdtTitle"); //01
  await ChkProd01.waitFor({state: "visible"});      //02 =01>02 รอจนกว่าจะแสดง Element คำว่า สินค้า
  await expect(page.locator("#oliPdtTitle")).toHaveText('สินค้า'); //VerifyText
  await page.getByPlaceholder('กรอกคำค้นหา').click();
  await page.getByPlaceholder('กรอกคำค้นหา').fill('P0004X');  //<< เปลี่ยนรหัสสินค้า
  await page.locator('#obtSearchProduct').click();
  await page.waitForTimeout(3000);
  //ค้นหาสินค้า
  if (await page.isVisible("text='ไม่พบข้อมูล'")) {
    await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
    //สินค้า
    await page.getByRole('button', { name: '+' }).click();
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
    await page.getByRole('textbox', { name: 'รหัสสินค้า' }).fill('P0004X');
    await page.waitForTimeout(700);
    await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).fill('PEP-TEST04');
    await page.waitForTimeout(700);
    await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').click();
    await page.waitForTimeout(700);
    await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').fill('PEP-TEST04');
    await page.waitForTimeout(700);
    await page.getByPlaceholder('ชื่อสินค้าอย่างย่อ').click();
    await page.waitForTimeout(700);
    await page.getByPlaceholder('ชื่อสินค้าอย่างย่อ').fill('PEP-TEST04');
    await page.waitForTimeout(700);
    await page.locator('#obtPdtSaleStop').click();
    await page.waitForTimeout(700);
    await page.getByRole('cell', { name: 'May 2024' }).click();
    await page.waitForTimeout(700);
    await page.getByText('Dec').click();
    await page.waitForTimeout(700);
    await page.getByRole('cell', { name: '31' }).click();
    await page.waitForTimeout(700);
    // กดบันทึกสร้างสินค้า
            //await page.getByRole('button', { name: 'บันทึก' }).click();
            //await page.waitForTimeout(7000);
    // ค้นหาสินค้าเพื่อเพิ่มหน่วยสินค้า
                //await page.getByTitle('สินค้า', { exact: true }).click();
                //await page.waitForTimeout(700);
                //await page.locator('#SKUSKU a').first().click();
                //await page.waitForTimeout(700);
                //await page.getByRole('combobox', { name: 'รหัสสินค้า' }).click(); //#bs-select-23-1
                //await page.waitForTimeout(700);
                //await page.locator('#bs-select-23-1').click();
                //await page.waitForTimeout(700);
                //await page.getByPlaceholder('กรอกคำค้นหา').click();
                //await page.waitForTimeout(700);
                //await page.getByPlaceholder('กรอกคำค้นหา').fill('PEP-TEST04');
                //await page.waitForTimeout(700);
                //await page.locator('#obtSearchProduct').click();
                //await page.waitForTimeout(700);
    //กดปุ่มแกไข
                //await page.locator(' #odvPdtDataList > tr > td:nth-child(10) > img').click();
                //await page.waitForTimeout(700);
    // เพิ่ม หน่วยสินค้าที่ 1
    await page.getByRole('button', { name: '+' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00026');
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('cell', { name: '00026' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.waitForTimeout(1500);
    //************************************************************************ */
    await page.getByRole('cell', { name: ' จัดการบาร์โค้ด' }).locator('i').click();
    await page.waitForTimeout(1500);
    await page.locator('#oetModalAebBarCode').fill('PBAR00001'); //<<< Issue
    await page.waitForTimeout(1500);
    await page.locator('#obtModalAebBrowsePdtLocation').click(); //<<< Issue 2
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('TEST');
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('cell', { name: 'TESTR' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.waitForTimeout(1500);

    //*********************************************************************** */
    await page.locator('#obtModalAebBrowsePdtSupplier').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('TEST');
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(1500);
    await page.locator('#odvModalContent > .modal-body > div > div').first().click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('AP00008');
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('cell', { name: 'AP00008' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.waitForTimeout(1500);
    await page.getByText('สถานะใช้งาน').click();
    await page.waitForTimeout(1500);
    await page.getByText('สถานะใช้งาน').click();
    await page.waitForTimeout(1500);
    await page.getByText('อนุญาตขาย', { exact: true }).click();
    await page.waitForTimeout(1500);
    await page.getByText('อนุญาตขาย', { exact: true }).click();
    await page.waitForTimeout(1500);
    await page.getByText('สถานะอนุญาตทำใบสั่งซื้อ').click();
    await page.waitForTimeout(1500);
    await page.getByText('สถานะอนุญาตทำใบสั่งซื้อ').click();
    await page.waitForTimeout(1500);
    //await page.locator('#ofmModalAebBarCode').getByRole('button', { name: 'บันทึก' }).click();
    //await page.locator('#ofmModalAebBarCode > div:nth-child(8) > div > div:nth-child(2) > button').click();
    await page.click('#ofmModalAebBarCode > div:nth-child(8) > div > div:nth-child(2) > button');
    await page.waitForTimeout(10000);
    if (await page.isVisible("text='ไม่พบรายการบาร์โค้ดในหน่วยสินค้า กรุณาเพิ่มบาร์โค้ด'")){
        console.log('ข้อมูลการกรอกไม่สามารถใช้งานได้')
        await page.pause();
    }
    else{

      await page.getByRole('button', { name: 'Close' }).click();
    }
 
    await page.waitForTimeout(1500);
    // เพิ่ม หน่วยสินค้าที่ 2
    await page.getByRole('button', { name: '+' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00028');
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('cell', { name: '00028' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.waitForTimeout(700);
    await page.getByRole('row', { name: 'พาเลท  จัดการบาร์โค้ด 0.00' }).locator('i').click();
    await page.waitForTimeout(700);
    await page.getByPlaceholder('กรุณากรอกหรือสแกนรหัสบาร์โค้ด').click();
    await page.waitForTimeout(700);
    await page.getByPlaceholder('กรุณากรอกหรือสแกนรหัสบาร์โค้ด').fill('PBAR000002');
    await page.waitForTimeout(700);
    await page.locator('#oetModalAebPlcName').click();
    await page.waitForTimeout(700);
    await page.locator('#obtModalAebBrowsePdtLocation').click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('TEST');
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('cell', { name: 'TESTR' }).click();
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
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.waitForTimeout(3000);
    await page.locator('#ofmModalAebBarCode').getByRole('button', { name: 'บันทึก' }).dblclick();
    await page.waitForTimeout(200000);
    await page.getByRole('button', { name: 'Close' }).click();
    //บันทึกหลัก
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(7000);

    //แก้ไข


    console.log('รันอีกครั้งเพื่อทดสอบการลบ และสร้างใหม่t')
  }
  else {

    console.log('Not Playwright')
    await page.getByRole('row', { name: 'P0004 PEP-TEST04 ถ้วย P0004 - -' }).getByRole('img').first().click();
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
  
    // ---------------------
    await browser.close();
  }
});