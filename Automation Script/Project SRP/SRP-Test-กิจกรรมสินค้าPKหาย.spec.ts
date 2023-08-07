import { test, expect, chromium } from '@playwright/test';
import { evaluateXPathToBoolean } from 'fontoxpath';
import { evaluateXPathToString } from 'fontoxpath';
import { Client } from 'pg';


test('test', async ({ page }) => 
{
    const browser = await chromium.launch();
    const delay = 1500;
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
        //await page.pause();
        await page.getByTitle('สินค้า', { exact: true }).click();
        await page.waitForTimeout(delay);
        await page.getByRole('link', { name: ' สินค้า' }).click();
        await page.waitForTimeout(delay);
        await page.locator('#SKUSKU a').first().click();
        await page.waitForTimeout(delay);
        const xpathpgname = '//*[@id="oliPdtTitle"]/text()'; 
        const elements1xpathpgname = await page.$(xpathpgname);
        if (elements1xpathpgname) {
          const text = await elements1xpathpgname.innerText();
          console.log('\x1b[36m%s\x1b[0m','หน้าต่าง :', text); //ชื่อหน้าต่างปรับราคาขาย
        }    
        await page.getByRole('combobox', { name: 'รหัสสินค้า' }).click();
        await page.locator('#bs-select-3-3').click();
        await page.waitForTimeout(delay);
        await page.getByRole('combobox', { name: 'หน่วย' }).click();
        await page.waitForTimeout(delay);
        await page.locator('#bs-select-3-0').click();   
        await page.waitForTimeout(delay);   
        await page.getByPlaceholder('กรอกคำค้นหา').fill('PBT-01'); //ค้นหาสินค้า
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
        await page.waitForTimeout(3000);
        const FindOrderDoc = await page.$('#odvPdtDataList > tr > td:nth-child(4)');               
        if (FindOrderDoc) 
        {
            const text = await FindOrderDoc.textContent();
            const expectedText = 'ทดสอบสินค้าย่อยหาย';         
            if (text === expectedText){ 
                await page.getByRole('row', { name: 'PBT-01 ทดสอบสินค้าย่อยหาย แพ็คเกจ PBT-01 ชื่อสินค้าหลัก (Package Name) Main Package' }).getByRole('img').nth(2).click();
                await page.waitForTimeout(delay);
                await page.getByRole('tab', { name: 'แพ็คเกจ' }).click();
                await page.waitForTimeout(delay);
                const FindPKGgroup = await page.$('#odvHeadGeneralInfo > label');               
                if (FindPKGgroup) 
                {
                    const PKGgroup = await FindPKGgroup.textContent();
                    const expectedText = 'ไม่พบข้อมูลกลุ่มของแพ็คเกจ';         
                    if (PKGgroup === expectedText){ 
                        //สร้างกิจกรรมหลัก
                        await page.getByRole('button', { name: '+' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('ชื่อกลุ่ม').fill('กิจกรรมหลัก');
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'ตกลง' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'เพิ่มสินค้า' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('กรอกคำค้นหา').click();
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('กรอกคำค้นหา').fill('SPP002');
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
                        await page.waitForTimeout(3000);
                        await page.getByRole('cell', { name: 'ถ่ายภาพกับจระเข้ (สินค้าประกอบ)' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'เลือก' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'บันทึก' }).click();
                        await page.waitForTimeout(delay);
                        const xpathPKGgrpname = '//*[@id="odvHeadGeneralInfo"]/label'; 
                        const elementsxpathPKGgrpname = await page.$(xpathPKGgrpname);
                        const xpathpname1 = '//*[@id="odvPdtPkgPanelGrp"]/div/div[2]/div/div/div[1]/div[1]/div[1]/label'; 
                        const elementsxpathpname1 = await page.$(xpathpname1);

                        if (elementsxpathPKGgrpname && elementsxpathpname1) {
                            const text = await elementsxpathPKGgrpname.innerText();
                            const Mainproduct = await elementsxpathpname1.innerText();
                            console.log('\x1b[32m%s\x1b[0m','สร้างกลุ่มกิจกรรม 1 เรียบร้อย',' ชื่อ : ', text); //ชื่อกิจกรรม
                            console.log('\x1b[32m%s\x1b[0m','สินค้าหลัก 1 ',' ชื่อ : ', Mainproduct); //ชื่อกิจกรรม
                            await page.waitForTimeout(delay);
                        }
                        //สร้างกิจกรรมรอง
                        await page.getByRole('button', { name: '+' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('ชื่อกลุ่ม').fill('กิจกรรมรอง');
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'ตกลง' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('tabpanel').filter({ hasText: 'ไม่พบข้อมูลสินค้า เพิ่มสินค้า เพิ่มสถานที่ เงื่อนไขกลุ่ม สินค้า สถานที่ สินค้า จ' }).getByRole('button', { name: 'เพิ่มสินค้า' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('กรอกคำค้นหา').fill('SPP001');
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
                        await page.waitForTimeout(delay);
                        await page.getByRole('cell', { name: 'ขี่ช้างชมสวน (สินค้าประกอบ)' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'เลือก' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('tabpanel').filter({ hasText: 'ขี่ช้างชมสวน (สินค้าประกอบ) สินค้า เพิ่มสินค้า เพิ่มสถานที่ เงื่อนไขกลุ่ม สินค้า' }).getByRole('button', { name: 'เพิ่มสินค้า' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('กรอกคำค้นหา').fill('SPP003');
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
                        await page.waitForTimeout(3000);
                        await page.getByRole('cell', { name: 'ขี่ม้าถ่ายรูป (สินค้าประกอบ)' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'เลือก' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByText('ระบุรายการตอนซื้อ').first().click();
                        await page.waitForTimeout(delay);
                        await page.getByText('ระบุรายการตอนซื้อ').nth(1).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'บันทึก' }).click();
                        await page.waitForTimeout(delay);
                        const xpathPKGSecgrpname = '//*[@id="odvHeadGeneralInfo"]/label'; 
                        const elementsxpathPKGSecgrpname = await page.$(xpathPKGSecgrpname);
                        const xpathpnameSec1 = '//*[@id="odvPdtPkgPanelGrp"]/div/div[2]/div/div/div[1]/div[1]/div[1]/label'; 
                        const elementsxpathpnameSec1 = await page.$(xpathpnameSec1);
                        const xpathpnameSec2 = '//*[@id="odvPdtPkgPanelGrp"]/div/div[2]/div/div/div[1]/div[2]/div[1]/label'; 
                        const elementsxpathpnameSec2 = await page.$(xpathpnameSec2);

                        if (elementsxpathPKGSecgrpname && elementsxpathpnameSec1 && elementsxpathpnameSec2 ) {
                            const text = await elementsxpathPKGSecgrpname.innerText();
                            const Subproduct1 = await elementsxpathpnameSec1.innerText();
                            const Subproduct2 = await elementsxpathpnameSec2.innerText();
                            console.log('\x1b[32m%s\x1b[0m','สร้างกลุ่มกิจกรรม 1 เรียบร้อย',' ชื่อ : ', text); //ชื่อกิจกรรม
                            console.log('\x1b[32m%s\x1b[0m','สินค้ารอง 1 ',' ชื่อ : ', Subproduct1); //ชื่อกิจกรรม
                            console.log('\x1b[32m%s\x1b[0m','สินค้ารอง 2 ',' ชื่อ : ', Subproduct2); //ชื่อกิจกรรม
                            await page.waitForTimeout(delay);
                        }
                        await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('PBT-01');
                        await page.waitForTimeout(delay);
                        await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
                        await page.waitForTimeout(3000);
                        //const valuepd = await page.inputValue('#odvPdtDataList > tr > td:nth-child(4)');
                        //const percentageString: string = valuepd;
                        //console.log('ชื่อสินค้าที่ค้นหา ครั้งที่ 1 :', valuepd);  
                        await page.waitForTimeout(delay);
                        await page.getByRole('row', { name: 'PBT-01 ทดสอบสินค้าย่อยหาย แพ็คเกจ PBT-01 ชื่อสินค้าหลัก (Package Name) Main Package' }).getByRole('img').nth(2).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('tab', { name: 'แพ็คเกจ' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByText('ระบุรายการตอนซื้อ').nth(1).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'บันทึก' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByText('ระบุรายการตอนซื้อ').first().click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'บันทึก' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('PBT-01');
                        await page.waitForTimeout(delay);
                        await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
                        await page.waitForTimeout(3000);
                        //const valuepd2 = await page.inputValue('#odvPdtDataList > tr > td:nth-child(4)');
                        await page.waitForTimeout(delay);
                        //const percentageString: string = valuepd;
                        //console.log('ชื่อสินค้าที่ค้นหา ครั้งที่ 2 :', valuepd2); 
                        await page.waitForTimeout(delay); 
                        await page.getByRole('row', { name: 'PBT-01 ทดสอบสินค้าย่อยหาย แพ็คเกจ PBT-01 ชื่อสินค้าหลัก (Package Name) Main Package' }).getByRole('img').nth(2).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('tab', { name: 'แพ็คเกจ' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByText('ระบุรายการตอนซื้อ').first().click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'บันทึก' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('PBT-01');
                        await page.waitForTimeout(delay);
                        await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
                        await page.waitForTimeout(3000);
                        //const valuepd3 = await page.inputValue('#odvPdtDataList > tr > td:nth-child(4)');
                        //const percentageString: string = valuepd;
                        //console.log('ชื่อสินค้าที่ค้นหา ครั้งที่ 3 :', valuepd3); 
                        await page.waitForTimeout(delay);
                        await page.getByRole('row', { name: 'PBT-01 ทดสอบสินค้าย่อยหาย แพ็คเกจ PBT-01 ชื่อสินค้าหลัก (Package Name) Main Package' }).getByRole('img').nth(2).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('tab', { name: 'แพ็คเกจ' }).click();
                        await page.waitForTimeout(delay);
                        const xpathMainGR = '//*[@id="odvHeadGeneralInfo"]/label'; // MainGroup     
                        const elements1xpathMainGR = await page.$(xpathMainGR);
                        const xpathSecGR = '//*[@id="odvHeadGeneralInfo"]/label'; // SecGroup
                        const elements1xpathSecGR = await page.$(xpathSecGR); 
                        if (elements1xpathMainGR && elements1xpathSecGR) 
                        {
                            const text = await elements1xpathMainGR.innerText(); // MainGroup
                            const text2 = await elements1xpathSecGR.innerText();  // SecGroup
                            console.log('----------------------------------------------------------'); 
                            console.log('\x1b[36m%s\x1b[0m','MainGroup : ', text); 
                            console.log('\x1b[36m%s\x1b[0m','SecGroup  : ', text2); 
                            console.log('\x1b[32m%s\x1b[0m','[ PASS ]',' ตรวจสอบพบข้อมูลกลุ่มสินค้า'); 
                        }                           
                    }
                    else{
                        //await page.pause();
                        //ลบข้อมูลสินค้าย่อย ในกลุ่ม Package
                        await page.getByRole('tab', { name: 'กลุ่ม : กิจกรรมหลัก ×' }).getByRole('button', { name: '×' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'ยืนยัน' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: '×' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'ยืนยัน' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'บันทึก' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('PBT-01');
                        await page.waitForTimeout(delay);
                        await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
                        await page.waitForTimeout(3000);
                        //const valuepd4 = await page.inputValue('#odvPdtDataList > tr > td:nth-child(4)');
                        //const percentageString: string = valuepd;
                        //console.log('ชื่อสินค้าที่ค้นหา ครั้งที่ 4 :', valuepd4); 
                        await page.waitForTimeout(delay);
                        await page.getByRole('row', { name: 'PBT-01 ทดสอบสินค้าย่อยหาย แพ็คเกจ PBT-01 ชื่อสินค้าหลัก (Package Name) Main Package' }).getByRole('img').nth(1).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('tab', { name: 'แพ็คเกจ' }).click();
                        await page.waitForTimeout(delay);
                        console.log('\x1b[32m%s\x1b[0m','[ PASS ]',' ลบกลุ่มข้อมูลสินค้าย่อยเรียบร้อย'); 
                        await page.waitForTimeout(5000);
                        //await page.pause();
                    }
                }  

            }
            else{

            }
        }    






        

    } catch (error) {
      console.error('Error :', error);
    } finally {      
      console.log('Tested');
    }

    



});