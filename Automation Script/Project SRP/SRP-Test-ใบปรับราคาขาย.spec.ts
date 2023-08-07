import { test, expect, chromium } from '@playwright/test';
import { evaluateXPathToBoolean } from 'fontoxpath';
import { evaluateXPathToString } from 'fontoxpath';
import { Client } from 'pg';


test('test', async ({ page }) => 
{
    const browser = await chromium.launch();
    const delay = 1000;
    await chromium.launch({headless: false, slowMo: 1000})
    // const productid = 'PB1003'
    // const productid2 = 'PP0004X1' //ทดสอบผิด
    // const productname = 'PEP-TEST04'
    // const OrderDoc = 'A00003-PEPPER'  // ทดสอบเอกสารใหม่  A00003-PEPPER
    const Header = 'SiriParkSitz'
    const weburl ='https://sit.ada-soft.com/AdaSiriPark/login'
    test.setTimeout(5000000);
    await test.slow();
    // Get screen dimensions manually
    const { width, height } = {
        width: 1280,
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
    await Comname.waitFor({state: "visible"});        //02 =01>02 รอจนกว่าจะแสดง Element
    await expect(page.locator("#spnCompanyName")).toHaveText(Header);  //VerifyText
    await page.waitForTimeout(3000);
    

    try{
        await page.getByTitle('สินค้า', { exact: true }).click();
        await page.waitForTimeout(delay);
        await page.getByRole('link', { name: ' เอกสาร' }).click();
        await page.waitForTimeout(delay);
        await page.locator('a').filter({ hasText: 'ใบปรับราคาขาย' }).click();
        await page.waitForTimeout(delay);
        const xpathpgname = '//*[@id="oliSpaTitle"]/text()'; 
        const elements1xpathpgname = await page.$(xpathpgname);
        if (elements1xpathpgname) {
          const text = await elements1xpathpgname.innerText();
          console.log('\x1b[36m%s\x1b[0m','หน้าต่าง :', text); //ชื่อหน้าต่างปรับราคาขาย
        }        
        await page.getByPlaceholder('กรอกคำค้นหา').fill('IP0006423000003');
        await page.locator('#oimSearchSpa').click();
        const FindOrderDoc = await page.$('#otrPdtSpa0 > td:nth-child(3)');               
        if (FindOrderDoc) 
        {
            const text = await FindOrderDoc.textContent();
            const expectedText = 'IP0006423000003';         
            if (text === expectedText) 
            {                 
                const xpathDocnum = '//*[@id="otrPdtSpa0"]/td[3]'; // เลขที่เอกสาร     
                const elements1xpathDocnum = await page.$(xpathDocnum);
                const xpathGetStaDoc = '//*[@id="otrPdtSpa0"]/td[6]/label'; // สถานะเอกสาร
                const elements1GetStaDoc = await page.$(xpathGetStaDoc); 
                if (elements1xpathDocnum && elements1GetStaDoc) 
                {
                    const text = await elements1xpathDocnum.innerText(); // เลขที่เอกสาร  
                    const text2 = await elements1GetStaDoc.innerText();  // สถานะเอกสาร
                    console.log('\x1b[36m%s\x1b[0m','พบเอกสารเลขที่ :', text ,' สถานะ :',text2 ); 
                    console.log('\x1b[36m%s\x1b[0m','กำลังลบเอกสาร...'); 
                    await page.locator('#otrPdtSpa0 > td:nth-child(11) > img').click();
                    await page.waitForTimeout(2000);
                    await page.locator('#osmConfirm').click();
                    await page.waitForTimeout(delay);
                    console.log('\x1b[32m%s\x1b[0m','กำลังลบเอกสารเรียบร้อย'); 
                }             
                
            }
            else
            {
                await page.getByRole('button', { name: '+' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: '+' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'Mini Package M1 เด็ก/ผู้ใหญ่' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                await page.waitForTimeout(delay);
                await page.locator('#ohdFCXtdPriceRet1').click();
                await page.waitForTimeout(delay);
                await page.locator('#ohdFCXtdPriceRet1').fill('10000000');
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'บันทึก' }).click();
                const valuepd = await page.inputValue('#ohdFCXtdPriceRet1');
                console.log('\x1b[36m%s\x1b[0m','ตัวเลขที่ได้ 1 :', valuepd); 
                await page.waitForTimeout(3000);
                await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: 'SiriParkSitz IP0006423000003 03/07/2023 BasePrice รออนมุติ รอการประมวลผล ใช้งาน SiriParkSitz N/A' }).getByRole('img').nth(1).click();
                await page.waitForTimeout(delay);
                await page.locator('#ohdFCXtdPriceRet1').click();
                await page.waitForTimeout(delay);
                await page.locator('#ohdFCXtdPriceRet1').fill('1200');
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'บันทึก' }).click();
                await page.waitForTimeout(3000);
                const valuepd2 = await page.inputValue('#ohdFCXtdPriceRet1');
                console.log('\x1b[36m%s\x1b[0m','ตัวเลขที่ได้ 2 :', valuepd2);
                await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: 'SiriParkSitz IP0006423000003 03/07/2023 BasePrice รออนมุติ รอการประมวลผล ใช้งาน SiriParkSitz N/A' }).getByRole('img').nth(1).click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: 'SiriParkSitz IP0006423000003 03/07/2023 BasePrice รออนมุติ รอการประมวลผล ใช้งาน SiriParkSitz N/A' }).getByRole('img').nth(1).click();
                await page.locator('#ohdFCXtdPriceRet1').fill('3000000');
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'บันทึก' }).click();
                await page.waitForTimeout(3000);
                const valuepd3 = await page.inputValue('#ohdFCXtdPriceRet1');
                console.log('\x1b[36m%s\x1b[0m','ตัวเลขที่ได้ 3 :', valuepd3);
                //await page.getByRole('row', { name: 'SiriParkSitz IP0006423000003 03/07/2023 BasePrice รออนมุติ รอการประมวลผล ใช้งาน SiriParkSitz N/A' }).getByRole('img').nth(1).click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                await page.waitForTimeout(delay);
                console.log('\x1b[32m%s\x1b[0m','[ PASS ]',' แจ้งสถานะ : ระบบสามารถระบุจำนวนเกิน 1 ล้านได้เรียบร้อย');
                await page.pause();
            // ---------------------
            }
        }    




        

    } catch (error) {
      console.error('Error :', error);
    } finally {      
      console.log('Tested');
    }

    



});