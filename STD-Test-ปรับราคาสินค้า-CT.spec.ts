import { test, expect, chromium } from '@playwright/test';
import { Client } from 'pg';


test('test', async ({ page }) => {
  const browser = await chromium.launch();
  await chromium.launch({ headless: false, slowMo: 1000 })
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
    await page.locator('a').filter({ hasText: 'ใบปรับราคาขาย' }).click();
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: '+' }).click();
    await page.waitForTimeout(delay);
    console.log('\x1b[36m%s\x1b[0m', '[กำลังสร้างเอกสารปรับราคาขายแบบปกติ] ');
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: '+' }).click();
    await page.waitForTimeout(delay);
    await page.getByRole('combobox', { name: 'รหัสสินค้า' }).click();
    await page.waitForTimeout(delay);
    await page.locator('#bs-select-10-0 > span').click();
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('กรอกคำค้นหา').click();
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('กรอกคำค้นหา').fill('สินค้าทดสอบ');
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
    await page.waitForTimeout(delay);
    await page.click('#ospClickShowPDTConfig');
    await page.waitForTimeout(delay);
    await page.click('[name="ordBWStaTopPdt"][value="2"]');
    await page.waitForTimeout(delay);
    await page.locator('#oetMaxPage').fill('20');
    await page.locator('#oetPerPage').fill('20');
    await page.click('#obtPdtConfigSave');
    await page.waitForTimeout(2000);
    await page.click('#otbodyPdtPP000100025');
    await page.click('#otbodyPdtPP000100007');
    await page.click('#otbodyPdtPP000200025');
    await page.click('#otbodyPdtPP000200007');
    await page.click('#otbodyPdtPP000300025');
    await page.click('#otbodyPdtPP000300007');
    await page.click('#otbodyPdtPP000400025');
    await page.click('#otbodyPdtPP000400007');
    await page.click('#otbodyPdtPP000500025');
    await page.click('#otbodyPdtPP000500007');
    await page.click('#otbodyPdtPP000600025');
    await page.click('#otbodyPdtPP000600007');
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
    await page.waitForTimeout(delay);
    await page.locator('#ohdFCXtdPriceRet1').fill('100');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet1').press('Tab');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet2').fill('20');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet2').press('Tab');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet3').fill('200');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet3').press('Tab');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet4').fill('10');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet4').press('Tab');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet5').fill('300');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet5').press('Tab');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet6').fill('320');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet6').press('Tab');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet7').fill('15');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet7').press('Tab');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet8').fill('400');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet8').press('Tab');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet9').fill('35');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet9').press('Tab');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet10').fill('66');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet10').press('Tab');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet11').fill('999');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet11').press('Tab');
    await page.waitForTimeout(300);
    await page.locator('#ohdFCXtdPriceRet12').fill('150');
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.waitForTimeout(5000);
    console.log('\x1b[32m%s\x1b[0m', '[สร้างเอกสารเรียบร้อย] ');
    //-----------------------------------------------------------------------------------------------------------------------------------
    //const DocNumber = '//*[@id="oetXphDocNo"]'
    const createDoc = '//*[@id="odvDataDoc"]/div/div[5]/div[2]/label';
    const DocSta = '//*[@id="odvDataDoc"]/div/div[6]/div[2]/label/label';
    const DocApprove = '//*[@id="odvDataDoc"]/div/div[7]/div[2]/label'
    //const elements0 = await page.$(DocNumber);
    const elements1 = await page.$(createDoc);
    const elements2 = await page.$(DocSta);
    const elements3 = await page.$(DocApprove);
    // ดึงค่าจาก textbox ด้วย ID
    const textboxValue = await page.$eval('#oetXphDocNo', (input) => (input as HTMLInputElement).value);
    const storedValue: string = textboxValue;
    if (elements1 && elements2 && elements3) {
      //const text0 = await elements0.innerText();
      const text1 = await elements1.innerText();
      const text2 = await elements2.innerText();
      const text3 = await elements3.innerText();
      console.log('\x1b[36m%s\x1b[0m', '-', '[เอกสารหมายเลข] : ', storedValue, ' [ผู้สร้างเอกสาร] : ', text1, ' [สถานะเอกสาร] : ', text2, ' [สถานะอนุมัติ] : ', text3);
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
      await page.waitForTimeout(delay);
      console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการลบเอกสาร] ');
      await page.waitForTimeout(delay);
      await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill(storedValue);
      await page.waitForTimeout(delay);
      //await page.pause();
      await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
      await page.waitForTimeout(delay);
      await page.locator('#otrPdtSpa0 > td:nth-child(11) > img').click();
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: 'ยืนยัน' }).click();
      await page.waitForTimeout(delay);
      console.log('\x1b[32m%s\x1b[0m', '[ลบเอกสารเรียบร้อย] ');
      await page.waitForTimeout(delay);


      console.log('\x1b[36m%s\x1b[0m', '[ทำการสร้างเอกสารอีกครั้ง เพื่อทดสอบการยกเลิกเอกสาร] ');
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: '+' }).click();
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: '+' }).click();
      await page.waitForTimeout(delay);
      //await page.getByRole('combobox', { name: 'รหัสสินค้า' }).click();
      await page.locator('#odvModalsectionBodyPDT > div > div:nth-child(1) > div > div > div > div.col-lg-2.col-md-2 > div > div > button > span > span').click();
      await page.waitForTimeout(delay);
      await page.locator('#bs-select-23-0 > span').click();
      await page.waitForTimeout(delay);
      // await page.locator('#bs-select-11-0').click();
      // await page.waitForTimeout(delay);
      await page.getByPlaceholder('กรอกคำค้นหา').click();
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('กรอกคำค้นหา').fill('สินค้าทดสอบ');
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
      await page.waitForTimeout(delay);
      await page.click('#ospClickShowPDTConfig');
      await page.waitForTimeout(delay);
      await page.click('[name="ordBWStaTopPdt"][value="2"]');
      await page.waitForTimeout(delay);
      await page.locator('#oetMaxPage').fill('20');
      await page.locator('#oetPerPage').fill('20');
      await page.click('#obtPdtConfigSave');
      await page.waitForTimeout(2000);
      await page.click('#otbodyPdtPP000100025');
      await page.click('#otbodyPdtPP000100007');
      await page.click('#otbodyPdtPP000200025');
      await page.click('#otbodyPdtPP000200007');
      await page.click('#otbodyPdtPP000300025');
      await page.click('#otbodyPdtPP000300007');
      await page.click('#otbodyPdtPP000400025');
      await page.click('#otbodyPdtPP000400007');
      await page.click('#otbodyPdtPP000500025');
      await page.click('#otbodyPdtPP000500007');
      await page.click('#otbodyPdtPP000600025');
      await page.click('#otbodyPdtPP000600007');
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: 'เลือก', exact: true }).click();
      await page.waitForTimeout(delay);
      await page.locator('#ohdFCXtdPriceRet1').fill('100');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet1').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet2').fill('20');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet2').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet3').fill('200');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet3').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet4').fill('10');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet4').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet5').fill('300');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet5').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet6').fill('320');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet6').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet7').fill('15');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet7').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet8').fill('400');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet8').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet9').fill('35');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet9').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet10').fill('66');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet10').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet11').fill('999');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet11').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet12').fill('150');
      await page.waitForTimeout(300);
      await page.getByRole('button', { name: 'บันทึก' }).click();
      await page.waitForTimeout(5000);
      console.log('\x1b[32m%s\x1b[0m', '[สร้างเอกสารเรียบร้อย] ');

      if (elements1 && elements2 && elements3) {
        const text1 = await elements1.innerText();
        const text2 = await elements2.innerText();
        const text3 = await elements3.innerText();
        console.log('\x1b[36m%s\x1b[0m', '', '[เอกสารหมายเลข] : ', storedValue, ' [ผู้สร้างเอกสาร] : ', text1, ' [สถานะเอกสาร] : ', text2, ' [สถานะอนุมัติ] : ', text3);
        console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการยกเลิกเอกสาร]');
        await page.waitForTimeout(300);
        await page.click('#obtBtnSpaCancel');
        await page.waitForTimeout(delay);
        console.log('\x1b[32m%s\x1b[0m', '[ยกเลิกเอกสารเรียบร้อย]');
        await page.waitForTimeout(delay);
        await page.click('#obtBtnBack');
        await page.waitForTimeout(5000);

        const Docsta1 = '//*[@id="otrPdtSpa0"]/td[3]';
        const Docsta2 = '//*[@id="otrPdtSpa0"]/td[6]/label';
        const Docsta3 = '//*[@id="otrPdtSpa0"]/td[4]';
        //const elements0 = await page.$(DocNumber);
        const elementsD1 = await page.$(Docsta1);
        const elementsD2 = await page.$(Docsta2);
        const elementsD3 = await page.$(Docsta3);
        if (elementsD1 && elementsD2 && elementsD3) {
          //const text0 = await elements0.innerText();
          const text1 = await elementsD1.innerText();
          const text2 = await elementsD2.innerText();
          const text3 = await elementsD3.innerText();
          console.log('\x1b[36m%s\x1b[0m', '-', '[ตรวจสอบเอกสาร]', '[เลขที่] : ', text1, ' [สถานะ] : ', text2, ' [วันที่ยกเลิก] : ', text3);
          await page.waitForTimeout(7000);

        }
      }
      //-----------------------------------------------------------------------------------------------------------------------------------
      console.log('\x1b[36m%s\x1b[0m', '[ทำการสร้างเอกสารอีกครั้ง เพื่อทดสอบการแก้ไขและอนุมัติเอกสาร] ');
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: '+' }).click();
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: '+' }).click();
      await page.waitForTimeout(delay);
      await page.locator('#odvModalsectionBodyPDT > div > div:nth-child(1) > div > div > div > div.col-lg-2.col-md-2 > div > div > button > span > span').click();
      await page.waitForTimeout(delay);
      //await page.click('[tabindex="0"][aria-posinset="1"]');
      await page.click('span.text:has-text("ชื่อสินค้า")');
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('กรอกคำค้นหา').click();
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('กรอกคำค้นหา').fill('สินค้าทดสอบ');
      await page.waitForTimeout(delay);
      await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
      await page.waitForTimeout(delay);
      await page.click('#ospClickShowPDTConfig');
      await page.waitForTimeout(delay);
      await page.click('[name="ordBWStaTopPdt"][value="2"]');
      await page.waitForTimeout(delay);
      await page.locator('#oetMaxPage').fill('20');
      await page.locator('#oetPerPage').fill('20');
      await page.click('#obtPdtConfigSave');
      await page.waitForTimeout(2000);
      await page.click('#otbodyPdtPP000100025');
      await page.click('#otbodyPdtPP000100007');
      await page.click('#otbodyPdtPP000200025');
      await page.click('#otbodyPdtPP000200007');
      await page.click('#otbodyPdtPP000300025');
      await page.click('#otbodyPdtPP000300007');
      await page.click('#otbodyPdtPP000400025');
      await page.click('#otbodyPdtPP000400007');
      await page.click('#otbodyPdtPP000500025');
      await page.click('#otbodyPdtPP000500007');
      await page.click('#otbodyPdtPP000600025');
      await page.click('#otbodyPdtPP000600007');
      await page.waitForTimeout(delay);
      await page.getByRole('button', { name: 'เลือก', exact: true }).click();
      await page.waitForTimeout(delay);
      await page.locator('#ohdFCXtdPriceRet1').fill('100');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet1').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet2').fill('20');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet2').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet3').fill('200');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet3').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet4').fill('10');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet4').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet5').fill('300');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet5').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet6').fill('320');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet6').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet7').fill('15');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet7').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet8').fill('400');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet8').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet9').fill('35');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet9').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet10').fill('66');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet10').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet11').fill('999');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet11').press('Tab');
      await page.waitForTimeout(300);
      await page.locator('#ohdFCXtdPriceRet12').fill('150');
      await page.waitForTimeout(300);
      await page.getByRole('button', { name: 'บันทึก' }).click();
      await page.waitForTimeout(5000);
      console.log('\x1b[32m%s\x1b[0m', '[สร้างเอกสารเรียบร้อย] ');
      //-----------------------------------------------------------------------------------------------------------------------------------
      const textboxValue1 = await page.$eval('#oetXphDocNo', (input) => (input as HTMLInputElement).value);
      const storedValue1: string = textboxValue1;
      //await page.pause();
      if (elements1 && elements2 && elements3) {
        const text1 = await elements1.innerText();
        const text2 = await elements2.innerText();
        const text3 = await elements3.innerText();
        console.log('\x1b[36m%s\x1b[0m', '-', '[เอกสารหมายเลข] : ', storedValue1, ' [ผู้สร้างเอกสาร] : ', text1, ' [สถานะเอกสาร] : ', text2, ' [สถานะอนุมัติ] : ', text3);
        await page.waitForTimeout(delay);
        await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
        await page.waitForTimeout(delay);
        console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการแก้ไข และ อนุมัติ] ');
        await page.waitForTimeout(delay);
        await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill(storedValue1);
        await page.waitForTimeout(delay);
        await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
        await page.waitForTimeout(delay);
        await page.locator('#otrPdtSpa0 > td:nth-child(12) > img').click();
        await page.waitForTimeout(delay);
        await page.locator('#ohdFCXtdPriceRet4').fill('50');
        await page.waitForTimeout(delay);
        await page.locator('#ohdFCXtdPriceRet9').fill('70');
        await page.getByRole('button', { name: 'บันทึก' }).click();
        await page.waitForTimeout(5000);
        console.log('\x1b[36m%s\x1b[0m', '[แก้ไขราคาสินค้า] ');
        await page.waitForTimeout(delay);
        await page.getByRole('button', { name: 'อนุมัติ' }).click();
        await page.waitForTimeout(delay);
        await page.getByRole('button', { name: 'ยืนยัน' }).click();
        await page.waitForTimeout(5000);
        console.log('\x1b[32m%s\x1b[0m', '[อนุมัติเอกสารเรียบร้อย] ');
        await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
        await page.waitForTimeout(3000);
        await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill(storedValue1);
        await page.waitForTimeout(delay);
        await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');

        const Docsta1 = '//*[@id="otrPdtSpa0"]/td[3]';
        const Docsta2 = '//*[@id="otrPdtSpa0"]/td[6]/label';
        const Docsta3 = '//*[@id="otrPdtSpa0"]/td[4]'
        //const elements0 = await page.$(DocNumber);
        const elementsD1 = await page.$(Docsta1);
        const elementsD2 = await page.$(Docsta2);
        const elementsD3 = await page.$(Docsta3);
        if (elementsD1 && elementsD2 && elementsD3) {
          //const text0 = await elements0.innerText();
          const text1 = await elementsD1.innerText();
          const text2 = await elementsD2.innerText();
          const text3 = await elementsD3.innerText();
          console.log('\x1b[36m%s\x1b[0m', '-', '[ตรวจสอบเอกสาร]', '[เลขที่] : ', text1, ' [สถานะ] : ', text2, ' [วันที่อนุมัติ] : ', text3);
          await page.waitForTimeout(7000);

        }
        await page.waitForTimeout(delay);
        console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการคัดลอกเอกสาร]');
        await page.waitForTimeout(delay);
        console.log('\x1b[36m%s\x1b[0m', '[เลือกเอกสารล่าสุด]');
        await page.waitForTimeout(delay);
        await page.locator('#otrPdtSpa0 > td:nth-child(12) > img').click();
        await page.waitForTimeout(delay);
        await page.click('#obtBtnSpaCopy');
        await page.waitForTimeout(delay);
        await page.getByRole('button', { name: 'ยืนยัน' }).click();
        await page.waitForTimeout(delay);
        const txtV = '//*[@id="odvSPAModalCopySuccess"]/div/div/div[2]/p/strong';
        const ValueText = await page.$(txtV);
        if (ValueText) {
          const text = await ValueText.innerText();
          console.log('\x1b[36m%s\x1b[0m', '-', '[', text, ']');
        }
        await page.waitForTimeout(delay);
        await page.getByRole('button', { name: 'ตกลง' }).click();
        await page.waitForTimeout(delay);
        console.log('\x1b[32m%s\x1b[0m', '[คัดลอกเอกสารเรียบร้อย]');
        await page.waitForTimeout(delay);
        //-----------------------------------------------------------------------------------------------------------------------------------
        const Docsta1F = '//*[@id="otrPdtSpa0"]/td[3]';
        //const elements0 = await page.$(DocNumber);
        const elementsD1F = await page.$(Docsta1F);
        if (elementsD1F) {
          //const text0 = await elements0.innerText();
          const text1 = await elementsD1F.innerText();
          const AddFileVar: string = text1;
          await page.waitForTimeout(7000);
          console.log('\x1b[36m%s\x1b[0m', '-', '[เอกสารหมายเลข] : ', AddFileVar, ' [สถานะเอกสาร] : ', text2, ' [สถานะอนุมัติ] : ', text3);
          await page.waitForTimeout(delay);
          console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการนำเข้าไฟล์แนบ]');
          await page.waitForTimeout(delay);
          await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill(AddFileVar);
          await page.waitForTimeout(delay);
          await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
          await page.waitForTimeout(delay);
          await page.locator('#otrPdtSpa0 > td:nth-child(12) > img').click();
          await page.waitForTimeout(delay);
          await page.locator('#odvSPAReferenceDoc > a > i').click();
          await page.waitForTimeout(delay);
          //await page.click('#olbUPFChsForInputTCNTPdtAdjPriHDodvSPAShowDataTable');
          //await page.waitForTimeout(delay);
          await page.setInputFiles("input[type='file']", ["./Pictures/ทดสอบการนำเข้าไฟล์.txt"]);
          await page.waitForTimeout(3000);
          await page.click('#obtSubmit');
          await page.waitForTimeout(delay);
          await page.click('#obtBtnSpaApv');
          await page.waitForTimeout(5000);
          await page.click('#obtSalePriAdjPopupApvConfirm');
          await page.waitForTimeout(5000);
          await page.click('#obtBtnBack');
          await page.waitForTimeout(delay);
          console.log('\x1b[32m%s\x1b[0m', '[ทดสอบการนำเข้าไฟล์เรียบร้อย]');
          await page.waitForTimeout(delay);
          const Docsta1 = '//*[@id="otrPdtSpa0"]/td[3]';
          const Docsta2 = '//*[@id="otrPdtSpa0"]/td[6]/label';
          const Docsta3 = '//*[@id="otrPdtSpa0"]/td[4]'
          //const elements0 = await page.$(DocNumber);
          const elementsD1 = await page.$(Docsta1);
          const elementsD2 = await page.$(Docsta2);
          const elementsD3 = await page.$(Docsta3);
          if (elementsD1 && elementsD2 && elementsD3) {
            //const text0 = await elements0.innerText();
            const text1 = await elementsD1.innerText();
            const text2 = await elementsD2.innerText();
            const text3 = await elementsD3.innerText();
            console.log('\x1b[36m%s\x1b[0m', '-', '[ตรวจสอบเอกสาร]', '[เลขที่] : ', text1, ' [สถานะ] : ', text2, ' [วันที่อนุมัติ] : ', text3);
            await page.waitForTimeout(7000);
  
          }
          //await page.pause();
        }
      }
    }

    //await page.pause();

  } catch (error) {
    console.error('Error :', error);
  } finally {
    console.log('Tested');
  }
});
