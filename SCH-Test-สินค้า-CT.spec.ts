import { test, expect, chromium } from '@playwright/test';
import { Client } from 'pg';


test('test', async ({ page }) => {
  const browser = await chromium.launch();
  await chromium.launch({ headless: false, slowMo: 1000 })
 
  //-------------------------------------------------------------------
  const productid = 'PP0001'   //เปลี่ยนรหัสสินค้า
  const productid2 = 'PPX0001' //เปลี่ยนบาร์โค้ดสินค้า (บาร์โค้ดที่ 2)
  const productname = 'สินค้าทดสอบระบบ 1'   //เปลี่ยนชื่อสินค้า
  //const productname = 'สินค้าทดสอบระบบ 6 (ไม่อนุญาตลด)' //Ref.116 
  //-------------------------------------------------------------------
  const adname = 'STD-Sit-ProforPC '

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
  //await page.goto('https://sit.ada-soft.com/AdaStorebackSTD/login');
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
  //});
  //------------------------------------------------------------------------------------------------------------------------------------------------------
  //สินค้า
  await page.getByTitle('สินค้า', { exact: true }).click();
  await page.getByRole('link', { name: ' สินค้า' }).click();
  await page.locator('#SKUSKU a').first().click();
  const ChkProd01 = page.locator("#oliPdtTitle"); //01
  await ChkProd01.waitFor({ state: "visible" });      //02 =01>02 รอจนกว่าจะแสดง Element คำว่า สินค้า
  await expect(page.locator("#oliPdtTitle")).toHaveText('สินค้า'); //VerifyText
  await page.getByPlaceholder('กรอกคำค้นหา').click();
  await page.getByPlaceholder('กรอกคำค้นหา').fill(productid);
  await page.locator('#obtSearchProduct').click();
  await page.waitForTimeout(3000);
  //ค้นหาสินค้า
  const tvf = await page.$('#odvPdtDataList > tr > td'); //ดึงข้อมูลมาเก็บไว้ที่ tvf
  if (tvf) {
    const text = await tvf.textContent();
    const expectedText = 'ไม่พบข้อมูล';
    if (text === expectedText) {
      console.log('\x1b[32m%s\x1b[0m', '[ไม่พบข้อมูล กำลังทำการสร้างสินค้า] ');
      await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
      //สินค้า
      await page.getByRole('button', { name: '+' }).click();
      await page.waitForTimeout(delay);
      await page.setInputFiles("input[type='file']", ["./Pictures/001.jpg"]);
      await page.waitForTimeout(2000);      
      //await page.locator('#oModalCropperProduct > div > div > div.modal-footer > button > span').click();
      await page.getByRole('button', { name: 'ตกลง' }).click();
      await page.waitForTimeout(2000);
      await page.setInputFiles("input[type='file']", ["./Pictures/002.jpg"]);
      await page.waitForTimeout(2000);
      //await page.locator('#oModalCropperProduct > div > div > div.modal-footer > button > span').click();
      await page.getByRole('button', { name: 'ตกลง' }).click();
      await page.waitForTimeout(2000);
      await page.getByRole('combobox', { name: 'ระบบขาย' }).click();
      await page.waitForTimeout(delay);
      await page.locator('#bs-select-4-3').click();
      await page.waitForTimeout(delay);
      await page.getByRole('combobox', { name: 'ระบบเช่า' }).click();
      await page.waitForTimeout(delay);
      await page.locator('#bs-select-4-0').click();
      await page.waitForTimeout(delay);
      await page.getByText('สร้างอัตโนมัติ').click();
      await page.waitForTimeout(delay);
      await page.getByRole('textbox', { name: 'รหัสสินค้า' }).click();
      await page.waitForTimeout(delay);
      await page.getByRole('textbox', { name: 'รหัสสินค้า' }).fill(productid);
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').click();
      await page.waitForTimeout(delay);
      await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).click();
      await page.waitForTimeout(delay);
      await page.getByRole('textbox', { name: 'ชื่อสินค้า', exact: true }).fill(productname);
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').click();
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('ชื่อสินค้าเพิ่มเติม').fill(productname);
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('ชื่อสินค้าอย่างย่อ').click();
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('ชื่อสินค้าอย่างย่อ').fill(productname);
      await page.waitForTimeout(delay);
      await page.locator('#obtPdtSaleStop').click();
      await page.waitForTimeout(delay);
      //await page.getByRole('cell', { name: 'June 2024' }).click();
      await page.locator('body > div.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top > div.datepicker-days > table > thead > tr:nth-child(2) > th.datepicker-switch').click();
      await page.waitForTimeout(delay);
      await page.getByText('Dec').click();
      await page.waitForTimeout(delay);
      await page.getByRole('cell', { name: '31' }).click();
      await page.waitForTimeout(delay);
      await page.locator('#odvPdtContentInfo1 > div.row > div.col-xs-12.col-sm-7.col-md-8.col-lg-8 > div:nth-child(11) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > label > span').click(); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< เปิดใช้งานบรรทัดนี้เพื่อสร้างสินค้าไม่อนุญาตลด
      await page.waitForTimeout(delay);
      //กดบันทึกสร้างสินค้า      
      await page.getByRole('button', { name: 'บันทึก' }).click();
      console.log('\x1b[36m%s\x1b[0m', '[บันทึกสร้างสินค้า] ');
      await page.waitForTimeout(7000);
      // เพิ่ม หน่วยสินค้าที่ 2
      //console.log('\x1b[36m%s\x1b[0m', '[หน่วยสินค้าที่ 2] ');
      await page.getByRole('button', { name: '+' }).click();
      await page.waitForTimeout(delay);
      await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
      await page.waitForTimeout(delay);
      await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00002');
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: '' }).click();
      await page.waitForTimeout(delay);
      await page.getByRole('cell', { name: '00002' }).click();
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: 'เลือก', exact: true }).click();
      await page.waitForTimeout(delay);
      //await page.pause();
      //await page.getByRole('row', { name: 'Container  จัดการบาร์โค้ด 0.00' }).getByText('จัดการบาร์โค้ด').click();
      await page.locator('#otrPdtDataUnitRow00007 > td.xCNBorderRight > div > div > div:nth-child(2) > img').click();
      await page.waitForTimeout(delay);
      await page.locator('#oetModalPszUnitFact').fill('12.00');
      await page.waitForTimeout(delay);
      await page.getByText('อนุญาตจัดสินค้า').click();
      await page.waitForTimeout(delay);
      await page.getByText('อนุญาตสั่ง HQ').click();
      await page.waitForTimeout(delay);
      await page.locator('#odvModalMngUnitPackSize').getByRole('button', { name: 'บันทึก' }).click();
      await page.waitForTimeout(delay);

      await page.locator('#otrPdtDataUnitRow00025 > td.xWPDTViewPackBarcode > div > div > div:nth-child(2) > label').click();
      await page.waitForTimeout(delay);
      //await page.pause();
      await page.locator('#odvModalAddEditBarCode > div > div > div.modal-body > div > div > div.col-xs-12.col-sm-8.col-md-8.col-lg-8 > div > div > div.xWModalBarCodeDataTable > table > tbody > tr > td:nth-child(6) > img').click();
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('กรุณากรอกหรือสแกนรหัสบาร์โค้ด').click();
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('กรุณากรอกหรือสแกนรหัสบาร์โค้ด').fill(productid);
      await page.waitForTimeout(delay);
      await page.locator('#obtModalAebBrowsePdtSupplier').click();
      await page.waitForTimeout(delay);
      await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('PSS Sup');
      await page.waitForTimeout(delay);
      await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
      await page.waitForTimeout(delay);
      await page.getByRole('cell', { name: 'PSS Sup' }).click();
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: 'เลือก', exact: true }).click();
      await page.waitForTimeout(delay);
      await page.locator('#ofmModalAebBarCode').getByRole('button', { name: 'บันทึก' }).click();
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: 'Close' }).click();
      await page.waitForTimeout(delay);

      await page.locator('#otrPdtDataUnitRow00007 > td.xWPDTViewPackBarcode > div > div > div:nth-child(2) > label').click();
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('กรุณากรอกหรือสแกนรหัสบาร์โค้ด').click();
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('กรุณากรอกหรือสแกนรหัสบาร์โค้ด').fill(productid2);
      await page.waitForTimeout(delay);
      await page.locator('#obtModalAebBrowsePdtSupplier').click();
      await page.waitForTimeout(delay);
      await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('PSS Sup');
      await page.waitForTimeout(delay);
      await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
      await page.waitForTimeout(delay);
      await page.getByRole('cell', { name: 'PSS Sup' }).click();
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: 'เลือก', exact: true }).click();
      await page.waitForTimeout(delay);
      await page.locator('#ofmModalAebBarCode').getByRole('button', { name: 'บันทึก' }).click();
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: 'Close' }).click();
      await page.waitForTimeout(3000);
      await page.getByRole('button', { name: 'บันทึก' }).click();
      await page.waitForTimeout(5000);
      console.log('\x1b[32m%s\x1b[0m', '[สร้างสินค้าเรียบร้อย] ');
      

      //------ตั้งค่าสต็อกสินค้า
      console.log('\x1b[36m%s\x1b[0m','[ตั้งค่าสต็อกสินค้า]')
      const cl = await page.waitForSelector('xpath=//*[@id="oliPdtContentSetUpStock"]/a');
      await cl.click();
      const element1 = await page.$('#otbTableListdataSpcWah > tbody > tr > td');
      if (element1) {
        const text = await element1.textContent();
        const expectedText = 'ไม่พบข้อมูล';
        if (text === expectedText) {
          console.log('\x1b[36m%s\x1b[0m','[ไม่พบข้อมูล ทำการเพิ่มข้อมูล]');
          await page.locator('#obtPdtStockConditionsAdd').click();
          await page.waitForTimeout(delay);
          await page.locator('#oimPscBrowseBch').click();
          await page.waitForTimeout(delay);      
          await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00031');
          await page.waitForTimeout(delay);
          await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
          await page.waitForTimeout(delay);
          await page.getByRole('cell', { name: 'STD-Sit-ProforPC' }).click();
          await page.waitForTimeout(delay);
          await page.getByRole('button', { name: 'เลือก', exact: true }).click();
          await page.waitForTimeout(delay);
          await page.locator('#oimPscBrowseWah').click();
          await page.waitForTimeout(delay);
          await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00001');
          await page.waitForTimeout(delay);
          await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
          await page.waitForTimeout(delay);
          await page.getByRole('cell', { name: 'คลังขาย' }).click();
          await page.waitForTimeout(delay);
          await page.getByRole('button', { name: 'เลือก', exact: true }).click();
          await page.waitForTimeout(delay);
          await page.locator('#oetStockConditionsMin').fill('0');
          await page.waitForTimeout(delay);
          await page.locator('#oetStockConditionsMax').fill('9999');
          await page.waitForTimeout(delay);
          await page.locator('#oetStockConditionsRemark').fill('Create by Automation');
          await page.waitForTimeout(delay);
          await page.locator('#ofmAddStockConditions').getByRole('button', { name: 'บันทึก' }).click();
          await page.waitForTimeout(5000);
          await page.getByRole('button', { name: 'บันทึก' }).click();
          await page.waitForTimeout(5000);
          console.log('\x1b[32m%s\x1b[0m','[ตั้งค่าสต็อกเรียบร้อย]');
          //await page.pause();
        }
        else {
          const xpath = '//*[@id="otbTableListdataSpcWah"]/tbody/tr/td[1]';   //ดึงข้อมูลมาเก็บไว้ที่ elements1
          const elements1 = await page.$(xpath);
          if (elements1) {
            const text = await elements1.innerText();
            console.log('\x1b[32m%s\x1b[0m', 'พบข้อมูล สต็อกสินค้า ถูกสร้างไว้แล้ว สาขา :', text);
            // เพิ่มรายการได้

            // await page.locator('#otbTableListdataSpcWah > tbody > tr > td:nth-child(5) > img').click();
            // await page.getByRole('button', { name: 'ยืนยัน' }).click();
            // console.log('ทำการลบข้อมูล :', text ,' เรียบร้อยแล้ว');
          } else {
            console.error('Element not found.');
          }

        }
      }
      else {
        console.log('Element not found');
      }
      //------จบตั้งค่าสต็อกสินค้า
      //บันทึกหลัก
      //await page.getByRole('button', { name: 'บันทึก' }).click();
      const xpath = '//*[@id="obtMainSaveProduct"]';
      const el = await page.$(xpath);

      // Perform click operation
      if (el) {
        await el.click();
      }
      else {
        console.error('Element not found.');
      }
      await page.waitForTimeout(7000);
    }
    else { // ถ้าตรวจสอบแล้วว่ามีข้อมูลอยุ่แล้วเพื่อเคลียร์ข้อมูล
      //ลบ
      console.log('พบสินค้าให้ลบ')
      console.log('ขั้นตอนทดสอบการลบ')
      //----------------------------------------------------------------------------------------------------------------------------------------------
      await page.locator('#odvPdtDataList > tr.xCNTextDetail2.xWPdtInfo.xWPdtTr1 > td:nth-child(9) > img').click();
      await page.waitForTimeout(700);
      await page.getByRole('button', { name: 'ยืนยัน' }).click();
      await page.waitForTimeout(700);
      console.log('\x1b[32m%s\x1b[0m', 'จบขั้นตอนทดสอบการลบ เนื่องจากมีข้อมูลค้าง')
      await page.waitForTimeout(5000);
      const Del = await page.$('#odvPdtDataList > tr > td'); //ดึงข้อมูลมาเก็บไว้ที่ Del
      if (Del) {
        // Get the text content of the element
        const text = await Del.textContent();
        // Compare the text content
        const expectedText = 'ไม่พบข้อมูล';
        if (text === expectedText) {
          await browser.close();
        }
      }
    }

  }





});









//การเก็บตัวแปรจาก element และการใช้
//const numdoc = await page.$eval("#otrTIB0 > td:nth-child(3)", (element) => element.textContent);
//numdoc = ชื่อตัวแปร
//#otrTIB0 > td:nth-child(3) = selector เอามาจาก imspec
//การเรียกใช้(สมมุติ) ว่าใช้ไปกรอกคำค้นหา
//await page.getByPlaceholder('กรอกคำค้นหา').fill(numdoc);
//จำนำค่าที่เก็บมาได้กรอกคำคนหา



//async function getText() {
// Find the element by selector
//const element = await page.$('#otbTableListdataSpcWah > tbody > tr > td');

//if (element) {
// Get the text content of the element
//const text = await element.textContent();
//console.log(text);
//} else {
// console.log('Element not found');
//}
//}
//getText();