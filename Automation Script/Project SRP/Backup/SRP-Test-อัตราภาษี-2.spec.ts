import { test, expect, chromium } from '@playwright/test';
import { Browser, Page, ElementHandle } from '@playwright/test';
import { JSDOM } from "jsdom";  //npm install jsdom
import { evaluateXPathToBoolean } from 'fontoxpath';
import { evaluateXPathToString } from 'fontoxpath';
import { Client } from 'pg';


test('test', async ({ page }) => {
  const browser = await chromium.launch();
  const delay = 1000;
  const VatRate = '8';

  //await page.waitForTimeout(delay);
  //--trace on
  await chromium.launch({ headless: false, slowMo: 1000 })
  const Header = 'SiriPark & Zoo'
  const weburl = 'https://sit.ada-soft.com/AdaSiriPark/login'
  //const OrderDoc = 'A00001-PEPPER'  // เอกสารอนุมัติไปแล้ว
  //const OrderDoc = 'A00002-PEPPER'  // เอกสารยกเลิกไปแล้ว
  test.setTimeout(5000000);
  await test.slow();
  // Get screen dimensions manually
  const { width, height } = {
    width: 1380,
    height: 700,
  };
  // Set viewport size to screen dimensions
  await page.setViewportSize({ width, height });
  await page.goto(weburl);
  await page.getByPlaceholder('ชื่อผู้ใช้').fill('008');
  await page.getByPlaceholder('ชื่อผู้ใช้').press('Tab');
  //await page.waitForTimeout(3000);
  await page.getByPlaceholder('รหัสผ่าน').fill('12345678');
  await page.getByPlaceholder('รหัสผ่าน').press('Tab');
  await page.getByRole('link', { name: 'ภาษาไทย' }).press('Tab');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).press('Enter');
  await page.waitForLoadState('networkidle');
  const Comname = page.locator("#spnCompanyName"); //01
  await Comname.waitFor({ state: "visible" });        //02 =01>02 รอจนกว่าจะแสดง Element
  await expect(page.locator("#spnCompanyName")).toHaveText(Header);  //VerifyText
  await page.waitForTimeout(3000);

  await page.getByTitle('ข้อมูลหลัก').click();
  await page.waitForTimeout(delay);
  await page.getByRole('link', { name: ' ข้อมูลระบบ' }).click();
  await page.waitForTimeout(delay);
  await page.locator('#MASSYS > ul > li:nth-child(3) > a > span').click();
  //await page.locator('a').filter({ hasText: 'อัตราภาษี' }).click();
  await page.waitForTimeout(delay);
  await page.getByPlaceholder('กรอกคำค้นหา').click();
  await page.waitForTimeout(delay);
  await page.getByPlaceholder('กรอกคำค้นหา').fill('00001');
  await page.waitForTimeout(delay);
  await page.locator('#oimSearchCstGrp').click();
  await page.waitForTimeout(delay);

  try {
    //-----------------------------------------------------------------------------------------------------------------------------------
    const xpath = '//*[@id="odvRGPList"]/tr/td';
    const elements1 = await page.$(xpath);
    if (elements1) {
      const text = await elements1.innerText();
    }
    //-----------------------------------------------------------------------------------------------------------------------------------
    const Find = await page.$('#odvRGPList > tr > td');
    if (Find) {
      // Get the text content of the element
      const text = await Find.textContent();
      // Compare the text content
      const expectedText = 'ไม่พบข้อมูล';
      if (text === expectedText) {
        //ใส่ Script เพิ่มข้อมูล
        await page.getByRole('button', { name: '+' }).click();
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('กรุณากรอกอัตราภาษี').fill('7');
        await page.waitForTimeout(delay);
        await page.locator('#obtVatStart').click();
        await page.waitForTimeout(delay);
        await page.getByText('Dec').click();
        await page.waitForTimeout(delay);
        await page.getByRole('cell', { name: '31' }).click();
        await page.waitForTimeout(delay);
        await page.getByRole('button', { name: 'เพิ่มอัตราภาษี' }).click();
        await page.waitForTimeout(delay);
        await page.getByRole('button', { name: 'บันทึก' }).click();
        await page.waitForTimeout(2000);
      }
      else {
        //
        await page.locator('#otrVatrate0 > td:nth-child(6) > img').click();
        await page.waitForTimeout(delay);
        //await page.pause();
        await page.getByPlaceholder('กรุณากรอกอัตราภาษี').fill(VatRate);
        await page.waitForTimeout(delay);
        await page.getByRole('button', { name: 'เพิ่มอัตราภาษี' }).click();
        await page.waitForTimeout(delay);
        await page.getByRole('button', { name: 'บันทึก' }).click();
        await page.waitForTimeout(delay);
        await page.waitForTimeout(2000);
        //-----------------------------------------------------------------------------------------------------------------------------------
        await page.getByTitle('ข้อมูลหลัก').click();
        await page.waitForTimeout(delay);
        await page.locator('a').filter({ hasText: 'บริษัท' }).click();
        await page.waitForTimeout(delay);
        //กลับไปหน้าข้อมูลบริษัท
        console.log('\x1b[36m%s\x1b[0m', '[ตรวจสอบข้อมูลบริษัท]');
        //-----------------------------------------------------------------------------------------------------------------------------------
        const vatxpath = '//*[@id="odvInforGeneralTap"]/div/div[2]/div[7]/div[1]/p';
        const comnamexpath = '//*[@id="odvInforGeneralTap"]/div/div[2]/div[2]/div[1]/div/p'
        const elements1 = await page.$(vatxpath);
        const elements2 = await page.$(comnamexpath);
        if (elements1 && elements2) {
          const text = await elements1.innerText();
          const text2 = await elements2.innerText();
          console.log('\x1b[36m%s\x1b[0m', '[บริษัท] : ', text2);
          console.log('\x1b[36m%s\x1b[0m', '[อัตราภาษีที่ใช้ ณ ปัจจุบัน] : ', text);
        }
        //-----------------------------------------------------------------------------------------------------------------------------------
        //กลับไปหน้าอัตราภาษี
        console.log('\x1b[36m%s\x1b[0m', '[ตรวจสอบข้อมูลอัตราภาษี ทั้งหมดกี่รายการ และ ใช้งานในลำดับที่]');
        await page.getByTitle('ข้อมูลหลัก').click();
        await page.waitForTimeout(delay);
        //await page.locator('a').filter({ hasText: 'อัตราภาษี' }).click();
        await page.locator('#MASSYS > ul > li:nth-child(3) > a > span').click();
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('กรอกคำค้นหา').fill('00001');
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
        await page.waitForTimeout(delay);
        await page.locator('#otrVatrate0 > td:nth-child(6) > img').click();
        await page.waitForTimeout(delay);
        const vatratexpath = '//*[@id="otbRateList"]'
        //const vatratexpath = '//*[@id="ofmAddVatRate"]/div[2]/div[2]/div/div/table'
        const htmlContent = await page.$(vatratexpath);
        if (htmlContent) {
          const text = await htmlContent.innerText();
          console.log(text)
        }
        //---------------------------------------------------
        // // ดึงข้อมูลจาก input text ทั้งหมด
        // const inputElements = await page.$$('input[type="text"]');
        // const inputValues: string[] = [];

        // for (const inputElement of inputElements) {
        //   const value = await inputElement.getAttribute('value');
        //   if (value !== null) {
        //     inputValues.push('--',value);
        //   }
        // }

        // // แสดงข้อมูลในคอนโซล
        // console.log('ข้อมูลใน input text ทั้งหมด:', inputValues);

        // //---------------------------------------------------
        // // ดึงข้อมูลจาก table ทั้งหมด
        // const tableRows: ElementHandle[] = await page.$$('table tr');
        // const tableData: string[][] = [];

        // for (const row of tableRows) {
        //   const tableCells: ElementHandle[] = await row.$$('td');
        //   const rowData: string[] = [];

        //   for (const cell of tableCells) {
        //     const cellText = await cell.innerText();
        //     rowData.push(cellText);
        //   }

        //   tableData.push(rowData);
        // }

        // // แสดงข้อมูลในคอนโซล
        // console.log('ข้อมูลจาก table ทั้งหมด:');
        // console.table(tableData);

        //---------------------------------------------------


        // ดึงข้อมูลจาก input text ทั้งหมด
        const inputElements: ElementHandle[] = await page.$$('input[type="text"]');
        const inputValues: string[] = [];

        for (const inputElement of inputElements) {
          const value = await inputElement.getAttribute('value');
          if (value !== null) {
            inputValues.push(value);
          }
        }

        // แสดงข้อมูลจาก input text ทั้งหมดในคอนโซล
        console.log('ข้อมูลใน input text ทั้งหมด:', inputValues);

        //ดึงข้อมูลจาก table ทั้งหมด
        const tableRows: ElementHandle[] = await page.$$('table tr');
        const tableData: string[][] = [];

        for (const row of tableRows) {
          const tableCells: ElementHandle[] = await row.$$('td');
          const rowData: string[] = [];

          for (const cell of tableCells) {
            const cellText = await cell.innerText();
            rowData.push(cellText);
          }

          tableData.push(rowData);
        }

        // แสดงข้อมูลจาก table ทั้งหมดในคอนโซล
        console.log('ข้อมูลจาก table ทั้งหมด:');
        console.table(tableData);

        //-----------------------------------------------------------------

      }
    }


  } catch (error) {
    console.error('Error :', error);
  } finally {
    console.log('Tested');
  }














  interface TablePosition {
    row: number;
    column: number;
  }

  function findTextAndGetPosition(searchText: string): TablePosition[] {
    const table = document.querySelector(".table") as HTMLTableElement;
    const positions: TablePosition[] = [];

    if (!table) {
      console.log("Table not found.");
      return positions;
    }

    const rows = table.querySelectorAll(".xCNTextDetail2.xWOriRec");
    for (let row = 0; row < rows.length; row++) {
      const rowData = rows[row].querySelectorAll("td");

      for (let col = 0; col < rowData.length; col++) {
        const cellText = rowData[col].textContent?.trim();

        if (cellText && cellText.includes(searchText)) {
          positions.push({ row: row + 1, column: col + 1 });
        }
      }
    }

    return positions;
  }








});