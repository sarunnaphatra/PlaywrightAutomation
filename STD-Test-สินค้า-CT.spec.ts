import { test, expect, chromium } from '@playwright/test';
import { Client } from 'pg';
//---

test('test', async ({ page }) => {
  const browser = await chromium.launch();
  await chromium.launch({headless: false, slowMo: 1000})
  const productid = 'PP0004X'
  const productname = 'PEP-TEST04'
  //const productid = 'PP0004X'
  test.setTimeout(5000000);
  await test.slow();
  // Get screen dimensions manually
  const { width, height } = {
    width: 1280,
    height: 900,
  };
  // Set viewport size to screen dimensions
  await page.setViewportSize({ width, height });
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
//});
  //------------------------------------------------------------------------------------------------------------------------------------------------------
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
  const tvf = await page.$('#odvPdtDataList > tr > td'); //ดึงข้อมูลมาเก็บไว้ที่ tvf
  if (tvf) 
  {
    const text = await tvf.textContent();
    const expectedText = 'ไม่พบข้อมูล';
      if (text === expectedText) 
      {
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
        //------ตั้งค่าสต็อกสินค้า
        console.log('ขั้นตอนการตั้งค่าสต็อก')
        const cl = await page.waitForSelector('xpath=//*[@id="oliPdtContentSetUpStock"]/a');
        await cl.click();
        const element1 = await page.$('#otbTableListdataSpcWah > tbody > tr > td');
            if (element1) 
        {
          const text = await element1.textContent();
          const expectedText = 'ไม่พบข้อมูล';
            if (text === expectedText) {
              console.log('ไม่พบข้อมูล ทำการเพิ่มข้อมูล');
              await page.locator('#obtPdtStockConditionsAdd').click();
              await page.waitForTimeout(700);
              await page.locator('#oimPscBrowseBch').click();
              await page.waitForTimeout(700);
              await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
              await page.waitForTimeout(700);
              await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00047');
              await page.waitForTimeout(700);
              await page.getByRole('button', { name: '' }).click();
              await page.waitForTimeout(700);
              await page.getByRole('cell', { name: '00047' }).click();
              await page.waitForTimeout(700);
              await page.getByRole('button', { name: 'เลือก', exact: true }).click();
              await page.waitForTimeout(700);
              await page.locator('#oimPscBrowseWah').click();
              await page.waitForTimeout(700);
              await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
              await page.waitForTimeout(700);
              await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00003');
              await page.waitForTimeout(700);
              await page.getByRole('button', { name: '' }).click();
              await page.waitForTimeout(700);
              await page.getByRole('cell', { name: '00003' }).click();
              await page.waitForTimeout(700);
              await page.getByRole('button', { name: 'เลือก', exact: true }).click();
              await page.waitForTimeout(700);
              await page.locator('#oetStockConditionsMin').click();
              await page.waitForTimeout(700);
              await page.locator('#oetStockConditionsMin').fill('1');
              await page.waitForTimeout(700);
              await page.locator('#oetStockConditionsMax').click();
              await page.waitForTimeout(700);
              await page.locator('#oetStockConditionsMax').fill('8888');
              await page.waitForTimeout(700);
              await page.locator('#oetStockConditionsRemark').click();
              await page.waitForTimeout(700);
              await page.locator('#oetStockConditionsRemark').fill('Automation');
              await page.waitForTimeout(700);
              await page.locator('#ofmAddStockConditions').getByRole('button', { name: 'บันทึก' }).click();
              await page.waitForTimeout(700);
              console.log('จบขั้นตอนทดสอบเพิ่มตั้งค่าสต็อก')
            } 
            else 
            {
              const xpath = '//*[@id="otbTableListdataSpcWah"]/tbody/tr/td[1]';   //ดึงข้อมูลมาเก็บไว้ที่ elements1
              const elements1 = await page.$(xpath);
            
              // Get the inner text of the element
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
        else 
        {
          console.log('Element not found');
        }
        //------จบตั้งค่าสต็อกสินค้า
      //บันทึกหลัก
      //await page.getByRole('button', { name: 'บันทึก' }).click();
      const xpath = '//*[@id="obtMainSaveProduct"]';
      const el = await page.$(xpath);
    
      // Perform click operation
      if (el) 
      {
        await el.click();
      } 
      else 
      {
        console.error('Element not found.');
      }
      await page.waitForTimeout(7000);
      }
  }

  else 
  { // ถ้าตรวจสอบแล้วว่ามีข้อมูลอยุ่แล้วเพื่อเคลียร์ข้อมูล
    //ลบ
    console.log('ขั้นตอนทดสอบการลบ')
    //----------------------------------------------------------------------------------------------------------------------------------------------
    await page.locator('#odvPdtDataList > tr.xCNTextDetail2.xWPdtInfo.xWPdtTr1 > td:nth-child(9) > img').click();
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: 'ยืนยัน' }).click();
    await page.waitForTimeout(700);
    console.log('\x1b[32m%s\x1b[0m', 'จบขั้นตอนทดสอบการลบ เนื่องจากมีข้อมูลค้าง')
    await page.waitForTimeout(5000);
    const Del = await page.$('#odvPdtDataList > tr > td'); //ดึงข้อมูลมาเก็บไว้ที่ Del
    if (Del) 
    {
      // Get the text content of the element
      const text = await Del.textContent();
      // Compare the text content
      const expectedText = 'ไม่พบข้อมูล';
        if (text === expectedText) 
        {
          await browser.close();
        }
    }
  }

  //สินค้าชุด
  await page.getByRole('tab', { name: 'สินค้าชุด' }).click();
  await page.waitForTimeout(700);
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
  console.log('จบขั้นตอนทดสอบเบื้องต้น')
  

//**********************************************************************************************************
  await chromium.launch({headless: false, slowMo: 1000})
  test.setTimeout(5000000);
  await test.slow();
  await page.goto('https://sit.ada-soft.com/AdaStorebackSTD/login');
  await page.waitForLoadState('networkidle');
  await Comname.waitFor({state: "visible"});        //02 =01>02 รอจนกว่าจะแสดง Element
  await expect(page.locator("#spnCompanyName")).toHaveText('Adasoft');  //VerifyText
  await page.waitForTimeout(3000);
  await page.getByTitle('สินค้า', { exact: true }).click();
  await page.getByRole('link', { name: ' สินค้า' }).click();
  await page.locator('#SKUSKU a').first().click();
  //const ChkProd01 = page.locator("#oliPdtTitle"); //01
  await ChkProd01.waitFor({state: "visible"});      //02 =01>02 รอจนกว่าจะแสดง Element คำว่า สินค้า
  await expect(page.locator("#oliPdtTitle")).toHaveText('สินค้า'); //VerifyText
  await page.getByPlaceholder('กรอกคำค้นหา').click();
  await page.getByPlaceholder('กรอกคำค้นหา').fill(productid);  //<< เปลี่ยนรหัสสินค้า
  await page.locator('#obtSearchProduct').click();
  await page.waitForTimeout(3000);
//ค้นหาสินค้า
  if (await page.isVisible("text='ไม่พบข้อมูล'")) 
  {
    console.log('\x1b[32m%s\x1b[0m', 'มีสินค้าที่อยู่แล้ว')
  }
  else 
  { // ถ้าตรวจสอบแล้วว่ามีข้อมูลอยุ่แล้ว
    //ให้ทำการแก้ไข
    console.log('ขั้นตอนทดสอบแก้ไข')
    await page.click('#odvPdtDataList > tr.xCNTextDetail2.xWPdtInfo.xWPdtTr1 > td:nth-child(10) > img'); //<< ปุ่มแก้ไข
    await page.waitForTimeout(700);
    await page.setInputFiles("input[type='file']",["./Pictures/003.jpg"]);
    await page.waitForTimeout(700);
    //await page.locator('#oModalCropperProduct > div > div > div.modal-footer > button > span').click();
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.waitForTimeout(5000);
  
    //------ตั้งค่าสต็อกสินค้า
    console.log('ขั้นตอนการตั้งค่าสต็อก')
    //await page.getByRole('tab', { name: 'ตั้งค่าสต๊อก' }).click();
    const element = await page.waitForSelector('xpath=//*[@id="oliPdtContentSetUpStock"]/a'); 
    await element.click();
    const element1 = await page.$('#otbTableListdataSpcWah > tbody > tr > td'); //ดึงข้อมูลมาเก็บไว้ที่ elements1
    if (element1) 
    {
      // Get the text content of the element
      const text = await element1.textContent();
      // Compare the text content
      const expectedText = 'ไม่พบข้อมูล';
        if (text === expectedText) 
        {
          console.log('ไม่พบข้อมูล ทำการเพิ่มข้อมูล');
          await page.locator('#obtPdtStockConditionsAdd').click();
          //await page.getByRole('button', { name: '+' }).click();
          await page.waitForTimeout(700);
          await page.locator('#oimPscBrowseBch').click();
          await page.waitForTimeout(700);
          await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
          await page.waitForTimeout(700);
          await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00047');
          await page.waitForTimeout(700);
          await page.getByRole('button', { name: '' }).click();
          await page.waitForTimeout(700);
          await page.getByRole('cell', { name: '00047' }).click();
          await page.waitForTimeout(700);
          await page.getByRole('cell', { name: '00047' }).click();
          await page.waitForTimeout(700);
          await page.getByRole('button', { name: 'เลือก', exact: true }).click();
          await page.waitForTimeout(700);
          await page.locator('#oimPscBrowseWah').click();
          await page.waitForTimeout(700);
          await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
          await page.waitForTimeout(700);
          await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00003');
          await page.waitForTimeout(700);
          await page.getByRole('button', { name: '' }).click();
          await page.waitForTimeout(700);
          await page.getByRole('cell', { name: '00003' }).click();
          await page.waitForTimeout(700);
          await page.getByRole('button', { name: 'เลือก', exact: true }).click();
          await page.waitForTimeout(700);
          await page.locator('#oetStockConditionsMin').click();
          await page.waitForTimeout(700);
          await page.locator('#oetStockConditionsMin').fill('1');
          await page.waitForTimeout(700);
          await page.locator('#oetStockConditionsMax').click();
          await page.waitForTimeout(700);
          await page.locator('#oetStockConditionsMax').fill('9999');
          await page.waitForTimeout(700);
          await page.locator('#oetStockConditionsRemark').click();
          await page.waitForTimeout(700);
          await page.locator('#oetStockConditionsRemark').fill('Automation');
          await page.waitForTimeout(700);
          await page.locator('#ofmAddStockConditions').getByRole('button', { name: 'บันทึก' }).click();
          await page.waitForTimeout(700);
          console.log('จบขั้นตอนทดสอบตั้งค่าสต็อก')
        } 
        else 
        {
          await page.locator('#otbTableListdataSpcWah > tbody > tr > td:nth-child(5) > img').click();
          await page.getByRole('button', { name: 'ยืนยัน' }).click();
          console.log('\x1b[32m%s\x1b[0m', 'ทำการลบข้อมูล :', text ,' เรียบร้อยแล้ว');
        }
    } 
    else 
    {
      console.log('Element not found');
    }
    //------จบตั้งค่าสต็อกสินค้า
    //await page.getByTitle('Orange').getByRole('img', { name: 'Checked Icon' }).click();
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(700);
    console.log('จบขั้นตอนทดสอบแก้ไข')
    await page.pause(); //////////////////////////////// ใช้สำหรับการทดสอบสร้างใบสั่งซื้อ
    //ลบ
    console.log('ขั้นตอนทดสอบการลบ')
    await page.getByTitle('สินค้า', { exact: true }).click();
    await page.waitForTimeout(700);
    await page.locator('#SKUSKU a').first().click();
    await page.waitForTimeout(700);
    await page.locator('#odvContentPageProduct > div.panel-heading > div > div:nth-child(2) > div > div > button > span > span').click();
    //await page.getByRole('combobox', { name: 'รหัสสินค้า' }).click(); //#bs-select-23-1
    await page.waitForTimeout(700);
    //await page.locator('#bs-select-5-1').click(); 
    await page.locator('#bs-select-23-1 > span').click();
    //await page.locator('#bs-select-23-1').click();
    await page.waitForTimeout(7000);
    await page.getByPlaceholder('กรอกคำค้นหา').click();
    //await page.pause();
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
    console.log('จบขั้นตอนทดสอบการลบ')
    await page.waitForTimeout(700);
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