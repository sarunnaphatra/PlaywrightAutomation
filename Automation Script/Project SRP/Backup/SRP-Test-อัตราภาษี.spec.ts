import { test, expect, chromium } from '@playwright/test';
import { evaluateXPathToBoolean } from 'fontoxpath';
import { evaluateXPathToString } from 'fontoxpath';
import { Client } from 'pg';


test('test', async ({ page }) => 
{
    const browser = await chromium.launch();
    const delay = 1000;
    const AmountB = 1000;
    const totalAmount: number = AmountB;
    //await page.waitForTimeout(delay);
    //--trace on
    await chromium.launch({headless: false, slowMo: 1000})
    const productid = 'PB1003'
    const productid1 ='PBT-01'
    const productid2 = 'PP0004X1' //ทดสอบผิด
    const productname = 'PEP-TEST04'
    const OrderDoc = 'A00003-PEPPER'  // ทดสอบเอกสารใหม่  A00003-PEPPER
    const Header = 'SiriPark & Zoo'
    const weburl ='https://sit.ada-soft.com/AdaSiriPark/login'
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
    await Comname.waitFor({state: "visible"});        //02 =01>02 รอจนกว่าจะแสดง Element
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
    await page.getByPlaceholder('กรอกคำค้นหา').fill('10%');
    await page.waitForTimeout(delay);
    await page.locator('#oimSearchCstGrp').click();
    await page.waitForTimeout(delay);
    try{
        //-----------------------------------------------------------------------------------------------------------------------------------
        const xpath = '//*[@id="odvRGPList"]/tr/td';  
        const elements1 = await page.$(xpath);
        if (elements1) {
        const text = await elements1.innerText();
        //console.log('ข้อมูลผู้ติดต่อ ที่แสดง1 :', text);
        }
        //-----------------------------------------------------------------------------------------------------------------------------------
        const Find = await page.$('#odvRGPList > tr > td'); 
        if (Find) 
        {
            // Get the text content of the element
            const text = await Find.textContent();
            // Compare the text content
            const expectedText = 'ไม่พบข้อมูล';
            if (text === expectedText) 
            {
                await page.getByRole('button', { name: '+' }).click();
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('กรุณากรอกอัตราภาษี').fill('10');
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
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('กรอกคำค้นหา').fill('10%');
                await page.waitForTimeout(delay);
                await page.locator('#oimSearchCstGrp').click();
                await page.waitForTimeout(delay);
                
                const Find = await page.$('#otrVatrate0 > td.text-right'); 
                if (Find) 
                {
                    // Get the text content of the element
                    const text = await Find.textContent();
                    // Compare the text content
                    const expectedText = '10%';
                    if (text === expectedText) 
                    {
                        

                        const Find = await page.$('#otrVatrate0 > td.text-right'); 
                        if (Find) 
                        {
                            // Get the text content of the element
                            const text = await Find.textContent();
                            // Compare the text content
                            const expectedText = '10%';
                            if (text === expectedText) 
                            {
                                console.log('\x1b[31m%s\x1b[0m','ลบข้อมูลไม่สำเร็จ ยังมีข้อมูลอยู่'); 
                            }
                        }
                        

                        
                        
                    }
                }  



            }
            else{
                console.log('\x1b[36m%s\x1b[0m','มีข้อมูลแล้ว'); 
                //await page.pause();
                await page.waitForTimeout(delay);
                await page.locator('#otrVatrate0 > td:nth-child(5) > img').click();  
                await page.waitForTimeout(delay);
                await page.locator('#osmConfirm').click();  
                await page.waitForTimeout(delay);
                
                
            }
        }    
        

    } catch (error) {
        console.error('Error :', error);
    } finally {      
        console.log('Tested');
    }



});