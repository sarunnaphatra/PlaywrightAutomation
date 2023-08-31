import { test, expect, chromium } from '@playwright/test';
import { Browser, Page, ElementHandle } from '@playwright/test';
interface ElementHandleWithValue extends ElementHandle {
    value(): Promise<string>;
}
import { JSDOM } from "jsdom";  //npm install jsdom
import { evaluateXPathToBoolean } from 'fontoxpath';
import { evaluateXPathToString } from 'fontoxpath';
import { Client } from 'pg';


test('test', async ({ page }) => {
    const browser = await chromium.launch();
    const delay = 1000;
    const VatRate = '10';


    //await page.waitForTimeout(delay);
    //--trace on
    await chromium.launch({ headless: false, slowMo: 1000 })
    const Header = 'Baimiang Healthy ShopEN'
    const weburl = 'https://dev.ada-soft.com/AdaStoreBackSTD/login'
    const username = '009'
    const password = '12345678'

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
    //await page.getByRole('link', { name: 'ภาษาไทย' }).click();
    //await page.getByRole('link', { name: 'English' }).click();
    await page.getByPlaceholder('Username').fill(username);
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('Username').press('Tab');
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('Password').fill(password);
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('Password').press('Tab');
    await page.waitForTimeout(delay);
    await page.getByRole('link', { name: 'English' }).press('Tab');
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: 'LOGIN' }).press('Enter');
    await page.waitForTimeout(delay);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(delay);
    const Comname = page.locator("#spnCompanyName"); //01
    await Comname.waitFor({ state: "visible" });        //02 =01>02 รอจนกว่าจะแสดง Element
    await expect(page.locator("#spnCompanyName")).toHaveText(Header);  //VerifyText
    await page.waitForTimeout(3000);;
    try {
        console.log('\x1b[36m%s\x1b[0m', 'ตรวจสอบข้อมูลบริษัทปัจจุบัน');
        //await page.getByTitle('ข้อมูลหลัก').click();
        // await page.locator('#wrapper > div:nth-child(5) > div:nth-child(3) > button > img').click();
        // await page.waitForTimeout(delay);
        // await page.locator('#oNavMenuMAS > ul > li > ul > li:nth-child(1) > a > span').click();
        // await page.waitForTimeout(delay);
        // await page.locator('a').filter({ hasText: 'Vat rate' }).click();
        //await page.pause();
        await page.getByTitle('Master').click();
        await page.waitForTimeout(delay);
        await page.getByRole('link', { name: ' System Info' }).click();
        await page.waitForTimeout(delay);
        await page.locator('a').filter({ hasText: 'Company' }).click();
        await page.waitForTimeout(3000);
        //กลับไปหน้าข้อมูลบริษัท
        console.log('\x1b[36m%s\x1b[0m', '[ตรวจสอบข้อมูลบริษัท ก่อนปรับอัตราภาษี]');
        //-----------------------------------------------------------------------------------------------------------------------------------
        const vatxpath = '//*[@id="odvInforGeneralTap"]/div/div[2]/div[7]/div[1]/p';
        const comnamexpath = '//*[@id="odvInforGeneralTap"]/div/div[2]/div[2]/div[1]/div/p'
        const branchxpath = '//*[@id="odvInforGeneralTap"]/div/div[2]/div[2]/div[2]/div/p'
        const elements1 = await page.$(vatxpath);
        const elements2 = await page.$(comnamexpath);
        const elements3 = await page.$(branchxpath);
        if (elements1 && elements2 && elements3) {
            const text1 = await elements1.innerText();
            const text2 = await elements2.innerText();
            const text3 = await elements3.innerText();
            console.log('\x1b[36m%s\x1b[0m', '[พบข้อมูล]', ' [บริษัท] : ', text2, ' [สาขา] : ', text3, ' [อัตราภาษีที่ใช้ ณ ปัจจุบัน] : ', text1);
            console.log('\x1b[32m%s\x1b[0m', '[ผ่าน] การแสดงข้อมูลภาษีที่ Company ถูกต้อง');//Manual check
            console.log('\x1b[31m%s\x1b[0m', text1);
        }
        //-----------------------------------------------------------------------------------------------------------------------------------

        //await page.pause();
        await page.getByTitle('Master').click();
        await page.locator('a').filter({ hasText: 'Vat rate' }).click();
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('Search keyword...').click();
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('Search keyword...').fill('00001');
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('Search keyword...').press('Enter');
        await page.waitForTimeout(delay);
        const Find = await page.$('#odvRGPList > tr > td');
        if (Find) {
            // Get the text content of the element
            const text = await Find.textContent();
            // Compare the text content

            const expectedText = 'Not Found Data.';
            if (text === expectedText) {
                //--วาง Script เงื่อนไข
            }
            else {

                await page.locator('#otrVatrate0 > td:nth-child(6) > img').click();
                await page.waitForTimeout(delay);
                await ShowVat();
                await page.waitForTimeout(2000)
                // await ShowVat2();
                // await page.waitForTimeout(2000);                
                await page.getByPlaceholder('Enter vat rate...').fill(VatRate);
                //console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] Keyword ผิด ต้องแก้เป็น Enter tax rate...] ในหน้าเพิ่มอัตราภาษี');
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'Add Vat Rate' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'Save' }).click();
                await page.waitForTimeout(2000);
                console.log('\x1b[32m%s\x1b[0m', '[เพิ่มเงื่อนไขอัตราอีก 10%]');
                await ShowVat();
                await page.waitForTimeout(2000);
                // await ShowVat2();
                // await page.waitForTimeout(2000);
                console.log('\x1b[36m%s\x1b[0m', '[เพิ่มอัตราภาษีใหม่เรียบร้อย มีผลปรับใช้ ณ วันนี้ปัจจุบัน]');
                //กลับไปหน้าข้อมูลบริษัท
                console.log('\x1b[36m%s\x1b[0m', '[ตรวจสอบข้อมูลบริษัท หลังปรับอัตราภาษี]');
                await page.getByRole('button', { name: 'Back' }).click();
                await page.waitForTimeout(delay);
                await page.getByTitle('Master').click();
                await page.waitForTimeout(delay);
                await page.locator('a').filter({ hasText: 'Company' }).click();
                await page.waitForTimeout(3000);

                //-----------------------------------------------------------------------------------------------------------------------------------
                const vatxpath = '//*[@id="odvInforGeneralTap"]/div/div[2]/div[7]/div[1]/p';
                const comnamexpath = '//*[@id="odvInforGeneralTap"]/div/div[2]/div[2]/div[1]/div/p'
                const branchxpath = '//*[@id="odvInforGeneralTap"]/div/div[2]/div[2]/div[2]/div/p'
                const elements1 = await page.$(vatxpath);
                const elements2 = await page.$(comnamexpath);
                const elements3 = await page.$(branchxpath);
                if (elements1 && elements2 && elements3) {
                    const text1 = await elements1.innerText();
                    const text2 = await elements2.innerText();
                    const text3 = await elements3.innerText();
                    console.log('\x1b[36m%s\x1b[0m', '[พบข้อมูล]', ' [บริษัท] : ', text2, ' [สาขา] : ', text3, ' [อัตราภาษีที่ใช้ ณ ปัจจุบัน] : ', text1);
                    console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] การแสดงข้อมูลภาษีที่ Company ไม่ถูกต้อง แสดงข้อมูลซ้อนกัน');
                    console.log('\x1b[31m%s\x1b[0m', text1);
                }
                //-----------------------------------------------------------------------------------------------------------------------------------
                await page.getByTitle('Master').click();
                await page.locator('a').filter({ hasText: 'Vat rate' }).click();
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('Search keyword...').click();
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('Search keyword...').fill('00001');
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('Search keyword...').press('Enter');
                await page.waitForTimeout(delay);

                //const Find2 = await page.$('#odvRGPList > tr > td');
                if (Find) {
                    // Get the text content of the element
                    const text = await Find.textContent();
                    // Compare the text content
                    const expectedText = 'Not Found Data.';
                    if (text === expectedText) {
                        //--วาง Script เงื่อนไข
                    }
                    else {
                        console.log('\x1b[32m%s\x1b[0m', '[พบข้อมูล] ลบข้อมูลที่ 3');
                        await page.locator('#otrVatrate0 > td:nth-child(6) > img').click();
                        await page.waitForTimeout(delay);
                        //await page.pause();
                        await page.getByRole('row', { name: '3 วันที่นี้นำไปใช้ได้ Delete Edit' }).getByRole('img', { name: 'Delete' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'Confirm' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'Save' }).click();
                        await page.waitForTimeout(2000);
                        await ShowVat();
                        // await page.waitForTimeout(2000);
                        // await ShowVat2();
                        await page.waitForTimeout(2000);
                        console.log('\x1b[32m%s\x1b[0m', '[พบข้อมูล] ลบข้อมูลที่ 3 เรียบร้อย');
                        await page.waitForTimeout(4000);

                    }
                }
            }
        }


    } catch (error) {
        console.error('Error :', error);
    } finally {
        console.log('Tested');
    }
    async function ShowVat() {
        const inputElements: ElementHandle[] = await page.$$('[type="text"]');
        const inputValues: string[] = [];
        const indexValues: string[] = [];
        for (const inputElement of inputElements) {
            const textContent = await inputElement.textContent();
            const stringValue: string = textContent!;
            const inputValue = await inputElement.inputValue();
            const statusElements = await page.$$('.text-center');
            // for (const statusElement of statusElements) {
            //     const statusText = await statusElement.textContent();
            //     const stringValue: string = statusText!;
            //     inputValues.push(stringValue.trim());
            // }
            // ถ้ามีข้อความชนิด Text ให้เพิ่มลงใน inputValues
            if (stringValue.trim() !== "") {
                inputValues.push(stringValue);
            }
            // ถ้ามีข้อความชนิด Input Text ให้เพิ่มลงใน inputValues
            if (inputValue.trim() !== "") {
                inputValues.push(inputValue);
            }
        }
        //console.log('\x1b[31m%s\x1b[0m', 'ข้อมูลที่มีอยู่ :', inputValues);
        console.log('\x1b[32m%s\x1b[0m', '------------------------------------------------');
        //------------------------------------------------------------------

        // สร้าง index values และแสดงผลลัพธ์        
        for (let i = 0; i < inputValues.length; i++) {
            let label;
            if ((i + 1) % 2 === 0) {
                label = "วันที่ปรับใช้";
            } else {
                if (inputValues[i] === '00001') {
                    label = "Master";
                }
                else {
                    label = "อัตราภาษี";
                }
            }
            const indexValue = `[${label} : ${inputValues[i]}]`;
            indexValues.push(indexValue);
        }
        console.log('\x1b[31m%s\x1b[0m', 'ข้อมูลที่มีอยู่ :', indexValues);
        console.log('\x1b[32m%s\x1b[0m', '------------------------------------------------');
        //-------------------------------------------------
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
    async function ShowVat2() {
        const rows = await page.$$('#otbRateList tr');

        for (const row of rows) {
            const indexElement = await row.$('.xWIndex') as ElementHandle;
            const indexText = await indexElement.textContent();

            const vatRateElement = await row.$('.xWVat input') as unknown as ElementHandleWithValue;
            const vatRateText = await vatRateElement.value();

            const vatStartDateElement = await row.$('.xWVatStart input') as unknown as ElementHandleWithValue;
            const vatStartDateText = await vatStartDateElement.value();

            const usageElement = await row.$('.text-center') as ElementHandle;
            const usageText = await usageElement.textContent();

            console.log(`Index: ${indexText}, VAT Rate: ${vatRateText}, VAT Start Date: ${vatStartDateText}, Usage: ${usageText}`);
        }
    }




});