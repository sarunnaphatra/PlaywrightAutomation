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

    const SeeBranch = 'PepperBranch'  //Row85
    const UnSeeBranch = 'Doub'  //Row85
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
    await page.getByRole('link', { name: 'ภาษาไทย' }).click();
    await page.getByRole('link', { name: 'English' }).click();
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Username').press('Tab');
    await page.getByPlaceholder('Password').fill(password);
    await page.getByPlaceholder('Password').press('Tab');
    await page.getByRole('link', { name: 'English' }).press('Tab');
    await page.getByRole('button', { name: 'LOGIN' }).press('Enter');
    await page.waitForLoadState('networkidle');
    const Comname = page.locator("#spnCompanyName"); //01
    await Comname.waitFor({ state: "visible" });        //02 =01>02 รอจนกว่าจะแสดง Element
    await expect(page.locator("#spnCompanyName")).toHaveText(Header);  //VerifyText
    await page.waitForTimeout(3000);;
    try {
        //await page.pause();
        await page.getByTitle('Master').click(); //++
        await page.getByRole('link', { name: ' System Shop' }).click(); //++
        await page.locator('#MASSHP a').click(); //++

        //-----------------------------------------------------------------------------------------------------------------------------------
        const NUpperTest = '//*[@id="odvRGPList"]/tr/td';
        const elements1 = await page.$(NUpperTest);
        if (elements1) {
            const text1 = await elements1.innerText();
            console.log('\x1b[36m%s\x1b[0m', '[ระบบแจ้ง] : ', text1);
            console.log('\x1b[32m%s\x1b[0m', '[ผ่าน]');
        }
        //await page.pause();
        //-----------------------------------------------------------------------------------------------------------------------------------        
        await page.getByPlaceholder('Search keyword...').fill('Double');
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('Search keyword...').press('Enter');
        await page.waitForTimeout(delay);
        const Find = await page.$('#odvRGPList > tr > td');
        if (Find) {//ค้นหาร้านค้า
            const text = await Find.textContent();
            const expectedText = 'Not Found Data.';
            //await page.pause();
            if (text === expectedText) {//เจอหรือไม่เจอ } else {}}
                console.log('\x1b[36m%s\x1b[0m', '[แจ้ง][ไม่พบข้อมูลร้านค้าที่ค้นหา กำลังดำเนินการสร้างข้อมูลใหม่]');
                //--วาง Script เงื่อนไขการสร้างร้านค้า
                await page.getByRole('button', { name: '+' }).click();
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('Shop Name').fill('Double P Shop'); //ชื่อร้านค้า
                await page.waitForTimeout(delay);
                await page.locator('#oimShpBrowseBch').click(); //เลือกสาขาของร้านค้า
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('Search keyword...').fill(SeeBranch);
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('Search keyword...').press('Enter');
                await page.waitForTimeout(delay);

                const Findbrch = await page.$('#otbBrowserList > tbody > tr > td');
                await page.waitForTimeout(delay);
                if (Findbrch) {//ค้นหาสาขา
                    const text = await Findbrch.textContent();
                    await page.waitForTimeout(delay);
                    const expectedText = 'Not Found Data.';
                    if (text === expectedText) {//เจอหรือไม่เจอ 
                        console.log('\x1b[36m%s\x1b[0m', '[แจ้ง][ไม่พบข้อมูล"สาขา"ที่ค้นหา กำลังดำเนินการสร้างข้อมูลใหม่]');
                        await page.locator('#myModal').click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: '+' }).click(); //เพิ่มชื่อสาขา
                        await page.waitForTimeout(delay);
                        await page.getByRole('tab', { name: 'English' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('textbox', { name: 'Name', exact: true }).fill('PepperBranch'); //เพิ่มชื่อสาขา
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('Revenue Department Number').fill('99/88');
                        await page.waitForTimeout(delay);
                        await page.getByRole('combobox', { name: 'ไทย' }).click();
                        await page.waitForTimeout(delay);
                        console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] เมนูร้านค้า เพิ่มสาขา เมนู Combobox ยังไม่เป็นภาษา Login[English]');
                        await page.waitForTimeout(delay);
                        await page.locator('#bs-select-7-1').click();//++
                        await page.waitForTimeout(delay);
                        //await page.locator('#odvBchBtnGroup').getByRole('button', { name: 'Save' }).click();
                        await page.locator('#odvBchBtnGroup > button').click();
                        await page.waitForTimeout(3000);
                        console.log('\x1b[32m%s\x1b[0m', '[ผ่าน] ดำเนินการผูกสาขาเรียบร้อย');
                        await page.waitForTimeout(delay);
                        await page.locator('.xWBtnPrevious').first().click();
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('Search keyword...').fill('Pep'); //ค้นหาชื่อสาขา
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('Search keyword...').press('Enter');
                        await page.waitForTimeout(delay);
                        await page.getByRole('cell', { name: 'Pep' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'Choose' }).click();//เลือกชือสาขา
                        await page.waitForTimeout(delay);
                        await page.locator('#oimShpBrowseMer').click();
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('Search keyword...').fill('Double'); //ค้นหาร้านค้า
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('Search keyword...').press('Enter');
                        await page.waitForTimeout(delay);
                        await page.getByRole('cell', { name: 'Double P' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'Choose' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'Save' }).click();
                        await page.waitForTimeout(3000);
                        await page.locator('#oliShpTitle').click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('textbox', { name: 'Search keyword...' }).fill('Double');
                        await page.waitForTimeout(delay);
                        await page.getByRole('textbox', { name: 'Search keyword...' }).press('Enter');
                        await page.waitForTimeout(delay);
                        //-----------------------------------------------------------------------------------------------------------------------------------
                        const shpcode = '//*[@id="otrShop0"]/td[2]';
                        const shpname = '//*[@id="otrShop0"]/td[3]'
                        const shptype = '//*[@id="otrShop0"]/td[4]'
                        const shpbranch = '//*[@id="otrShop0"]/td[5]'
                        const elements1 = await page.$(shpcode);
                        const elements2 = await page.$(shpname);
                        const elements3 = await page.$(shptype);
                        const elements4 = await page.$(shpbranch);
                        if (elements1 && elements2 && elements3 && elements4) {
                            const text1 = await elements1.innerText();
                            const text2 = await elements2.innerText();
                            const text3 = await elements3.innerText();
                            const text4 = await elements4.innerText();
                            console.log('\x1b[32m%s\x1b[0m', '[ข้อมูลร้านค้าที่สร้างล่าสุด]');
                            console.log('\x1b[36m%s\x1b[0m', '[Shop Code] :', text1);
                            console.log('\x1b[36m%s\x1b[0m', '[Shop Name] :', text2);
                            console.log('\x1b[36m%s\x1b[0m', '[Shop Type] :', text3);
                            console.log('\x1b[36m%s\x1b[0m', '[Branch]    :', text4);
                        }
                        //-----------------------------------------------------------------------------------------------------------------------------------
                        console.log('\x1b[36m%s\x1b[0m', '[ผ่าน] ดำเนินการสร้างร้านค้าใหม่เรียบร้อย');
                        //await page.pause();

                    } else {
                        await page.getByRole('cell', { name: 'Pep' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'Choose' }).click();
                        await page.waitForTimeout(delay);
                        await page.locator('#oimShpBrowseMer').click();
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('Search keyword...').fill('Doub');
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('Search keyword...').press('Enter');
                        await page.waitForTimeout(delay);
                        await page.getByRole('cell', { name: 'Double P' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'Choose' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'Save' }).click();
                        await page.waitForTimeout(3000);
                        //await page.pause();

                    }
                }


            }
            else {
                console.log('\x1b[36m%s\x1b[0m', '[แจ้ง][พบข้อมูลร้านค้าที่ค้นหา กำลังดำเนินการทดสอบ]');
                //-----------------------------------------------------------------------------------------------------------------------------------
                const shpcode = '//*[@id="otrShop0"]/td[2]';
                const shpname = '//*[@id="otrShop0"]/td[3]'
                const shptype = '//*[@id="otrShop0"]/td[4]'
                const shpbranch = '//*[@id="otrShop0"]/td[5]'
                const elements1 = await page.$(shpcode);
                const elements2 = await page.$(shpname);
                const elements3 = await page.$(shptype);
                const elements4 = await page.$(shpbranch);
                if (elements1 && elements2 && elements3 && elements4) {
                    const text1 = await elements1.innerText();
                    const text2 = await elements2.innerText();
                    const text3 = await elements3.innerText();
                    const text4 = await elements4.innerText();
                    //console.log('\x1b[32m%s\x1b[0m', '[พบข้อมูล]', ' [Shop Code] :', text1, ' [Shop Name] :', text2, ' [Shop Type] :', text3, ' [Branch] :', text4);
                    console.log('\x1b[32m%s\x1b[0m', '[ข้อมูลร้านค้าที่สร้างล่าสุด]');
                    console.log('\x1b[36m%s\x1b[0m', '[Shop Code] :', text1);
                    console.log('\x1b[36m%s\x1b[0m', '[Shop Name] :', text2);
                    console.log('\x1b[36m%s\x1b[0m', '[Shop Type] :', text3);
                    console.log('\x1b[36m%s\x1b[0m', '[Branch]    :', text4);
                }
                //-----------------------------------------------------------------------------------------------------------------------------------
                console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการแก้ไขข้อมูลร้านค้า]');
                await page.waitForTimeout(delay);
                //await page.getByRole('row', { name: '00023 Double P Shop Shop Pep' }).getByRole('img').nth(1).click();
                await page.locator('#otrShop0 > td:nth-child(7) > img').click();
                await page.waitForTimeout(delay);
                // await page.getByPlaceholder('Shop Name').fill('');
                // await page.waitForTimeout(delay);
                // await page.getByPlaceholder('Shop Name').fill('Shop Double P'); //ค้นหาชื่อร้านค้า
                // await page.waitForTimeout(delay);
                await page.locator('input[name="oetShpRegNo"]').fill('STD-Automate Test');
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'Save' }).click();
                await page.waitForTimeout(3000);
                console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการแก้ไขข้อมูลชื่อร้านค้าเรียบร้อย]');
                console.log('\x1b[32m%s\x1b[0m', '[ผ่าน]');
                await page.waitForTimeout(delay);
                await page.getByRole('tab', { name: 'Warehouse' }).click();//คลิกแท็บคลังสินค้า
                await page.waitForTimeout(delay);
                //-----------------------------------------------------------------------------------------------------------------------------------
                const Findwh = await page.$('#odvShpWahList > tr > td');
                //await page.pause();
                if (Findwh) { //ค้นหาคลังเพื่อทดสอบแก้/ลบ
                    const text = await Findwh.textContent();
                    await page.waitForTimeout(delay);
                    const expectedText = 'Not Found Data.';
                    if (text === expectedText) { //ถ้าไม่มีให้เพิ่ม
                        console.log('\x1b[36m%s\x1b[0m', '[ไม่พบข้อมูล"คลัง"ที่ค้นหา กำลังดำเนินการสร้างข้อมูล]');
                        console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] หากมีการกดปุ่มบันทึก(Save) Shop Name ข้อมูลคลังที่ผูกไว้ก่อนหน้าจะถูกเคลียร์ออก ทำให้ต้องผูกคลังใหม่');
                        //--วาง Script เงื่อนไข
                        await page.getByRole('button', { name: '+' }).click();
                        await page.waitForTimeout(delay);
                        await page.locator('#oimBrowseShopWah').click();
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('Search keyword...').click();
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('Search keyword...').fill('00002');
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('Search keyword...').press('Enter');
                        await page.waitForTimeout(delay);
                        await page.getByRole('cell', { name: 'PSS International warehouse' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'Choose' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'Save' }).click();
                        await page.waitForTimeout(3000);
                        console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการผูกคลังสินค้ากับร้านค้าเรียบร้อย]');
                        console.log('\x1b[32m%s\x1b[0m', '[ผ่าน]');
                        await page.getByRole('tab', { name: 'Address' }).click();
                        await page.waitForTimeout(delay);
                        const FindAddd = await page.$('#otbShopAddressTableList > tbody > tr > td');
                        await page.waitForTimeout(delay);
                        if (FindAddd) {//ค้นหาที่อยู่
                            const text = await FindAddd.textContent();
                            const expectedText = 'Not Found Data.';
                            if (text === expectedText) {//เจอหรือไม่เจอ
                                await page.waitForTimeout(delay);
                                console.log('\x1b[36m%s\x1b[0m', '[ไม่พบข้อมูล"ที่อยู่" กำลังดำเนินการสร้างข้อมูล]');
                                await page.waitForTimeout(delay);
                                //--วาง Script เงื่อนไขสร้างที่อยู่
                                console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] ไม่สามารถเพิ่มข้อมูลที่อยู่ของร้านค้าได้ ไม่มีปุ่มเพิ่มที่อยู่');
                                await page.getByRole('tab', { name: 'General Info.' }).click();
                                await page.waitForTimeout(delay);
                                await page.getByRole('button', { name: 'Back' }).click();
                                await page.waitForTimeout(delay);
                                //--ทำครบกระบวนการแล้วกลับไปตรวจสอบหน้าแรก
                                await page.getByRole('textbox', { name: 'Search keyword...' }).fill('Doub');
                                await page.waitForTimeout(delay);
                                await page.getByRole('textbox', { name: 'Search keyword...' }).press('Enter');
                                await page.waitForTimeout(delay);
                                // //-----------------------------------------------------------------------------------------------------------------------------------
                                // const shpcode = '//*[@id="otrShop0"]/td[2]';
                                // const shpname = '//*[@id="otrShop0"]/td[3]'
                                // const shptype = '//*[@id="otrShop0"]/td[4]'
                                // const shpbranch = '//*[@id="otrShop0"]/td[5]'
                                // const elements1 = await page.$(shpcode);
                                // const elements2 = await page.$(shpname);
                                // const elements3 = await page.$(shptype);
                                // const elements4 = await page.$(shpbranch);
                                // if (elements1 && elements2 && elements3 && elements4) {
                                //     const text1 = await elements1.innerText();
                                //     const text2 = await elements2.innerText();
                                //     const text3 = await elements3.innerText();
                                //     const text4 = await elements4.innerText();
                                //     //console.log('\x1b[32m%s\x1b[0m', '[พบข้อมูล]', ' [Shop Code] :', text1, ' [Shop Name] :', text2, ' [Shop Type] :', text3, ' [Branch] :', text4);
                                //     console.log('\x1b[32m%s\x1b[0m', '[ข้อมูลร้านค้าที่สร้างล่าสุด]');
                                //     console.log('\x1b[36m%s\x1b[0m', '[Shop Code] :', text1);
                                //     console.log('\x1b[36m%s\x1b[0m', '[Shop Name] :', text2);
                                //     console.log('\x1b[36m%s\x1b[0m', '[Shop Type] :', text3);
                                //     console.log('\x1b[36m%s\x1b[0m', '[Branch]    :', text4);
                                //     console.log('\x1b[32m%s\x1b[0m', '[ผ่าน]');
                                // }
                                // //-----------------------------------------------------------------------------------------------------------------------------------

                            }
                            else {
                                await page.waitForTimeout(delay);
                                //--วาง Script เงื่อนไข แก้ไขที่อยู่
                                console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] ไม่สามารถแก้ข้อมูลที่อยู่ของร้านค้าได้');
                                await page.waitForTimeout(delay);
                                //--วาง Script เงื่อนไข ลบที่อยู่
                                console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] ไม่สามารถลบข้อมูลที่อยู่ของร้านค้าได้');
                                await page.waitForTimeout(delay);
                                //--วาง Script เงื่อนไข เพิ่มที่อยู่ใหม่หลังลบ
                                console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] ไม่สามารถเพิ่มข้อมูลที่อยู่ของร้านค้าได้ ไม่มีปุ่มเพิ่มที่อยู่');
                                await page.waitForTimeout(delay);
                                //--ทำครบกระบวนการแล้วกลับไปตรวจสอบหน้าแรก
                                await page.getByRole('tab', { name: 'General Info.' }).click();
                                await page.waitForTimeout(delay);
                                await page.getByRole('button', { name: 'Back' }).click();
                                await page.waitForTimeout(delay);
                                await page.getByRole('textbox', { name: 'Search keyword...' }).fill('Doub');
                                await page.waitForTimeout(delay);
                                await page.getByRole('textbox', { name: 'Search keyword...' }).press('Enter');
                                await page.waitForTimeout(delay);
                                // //-----------------------------------------------------------------------------------------------------------------------------------
                                // const shpcode = '//*[@id="otrShop0"]/td[2]';
                                // const shpname = '//*[@id="otrShop0"]/td[3]'
                                // const shptype = '//*[@id="otrShop0"]/td[4]'
                                // const shpbranch = '//*[@id="otrShop0"]/td[5]'
                                // const elements1 = await page.$(shpcode);
                                // const elements2 = await page.$(shpname);
                                // const elements3 = await page.$(shptype);
                                // const elements4 = await page.$(shpbranch);
                                // if (elements1 && elements2 && elements3 && elements4) {
                                //     const text1 = await elements1.innerText();
                                //     const text2 = await elements2.innerText();
                                //     const text3 = await elements3.innerText();
                                //     const text4 = await elements4.innerText();
                                //     //console.log('\x1b[32m%s\x1b[0m', '[พบข้อมูล]', ' [Shop Code] :', text1, ' [Shop Name] :', text2, ' [Shop Type] :', text3, ' [Branch] :', text4);
                                //     console.log('\x1b[32m%s\x1b[0m', '[ข้อมูลร้านค้าที่สร้างล่าสุด]');
                                //     console.log('\x1b[36m%s\x1b[0m', '[Shop Code] :', text1);
                                //     console.log('\x1b[36m%s\x1b[0m', '[Shop Name] :', text2);
                                //     console.log('\x1b[36m%s\x1b[0m', '[Shop Type] :', text3);
                                //     console.log('\x1b[36m%s\x1b[0m', '[Branch]    :', text4);
                                //     console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการแก้ไขข้อมูลชื่อร้านค้าเรียบร้อย]');
                                //     console.log('\x1b[32m%s\x1b[0m', '[ผ่าน]');
                                // }
                                // //-----------------------------------------------------------------------------------------------------------------------------------
                            }
                        }

                    }
                    else {//ถ้ามีให้...
                        //วาง Script ลบข้อมูลคลัง (หากต้องการ)
                        console.log('\x1b[36m%s\x1b[0m', '[พบข้อมูลคลังสินค้าที่ผูกกับร้านค้า]');
                        //วาง Script เพื่อดึงข้อมูลคลังที่ผูกไว้มาแสดง
                        console.log('\x1b[36m%s\x1b[0m', '[ทดสอบลบข้อมูลคลังของร้านค้า]');
                        await page.waitForTimeout(delay);
                        await page.getByRole('row', { name: '00002 PSS International warehouse' }).getByRole('img').click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'Confirm' }).click();
                        await page.waitForTimeout(delay);
                        //วาง Script เพิ่มข้อมูลคลังหลังทดสอบลบ
                        await page.getByRole('button', { name: '+' }).click();
                        await page.waitForTimeout(delay);
                        await page.locator('#oimBrowseShopWah').click();
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('Search keyword...').click();
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('Search keyword...').fill('00002');
                        await page.waitForTimeout(delay);
                        await page.getByPlaceholder('Search keyword...').press('Enter');
                        await page.waitForTimeout(delay);
                        await page.getByRole('cell', { name: 'PSS International warehouse' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'Choose' }).click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'Save' }).click();
                        await page.waitForTimeout(3000);
                        await page.getByRole('tab', { name: 'Address' }).click();
                        await page.waitForTimeout(delay);
                        const FindAddd = await page.$('#otbShopAddressTableList > tbody > tr > td');
                        await page.waitForTimeout(delay);
                        if (FindAddd) {//ค้นหาที่อยู่
                            const text = await FindAddd.textContent();
                            await page.waitForTimeout(delay);
                            const expectedText = 'Not Found Data.';
                            if (text === expectedText) {//เจอหรือไม่เจอ
                                console.log('\x1b[36m%s\x1b[0m', '[ไม่พบข้อมูลที่ค้นหา กำลังดำเนินการสร้างข้อมูล]');
                                await page.waitForTimeout(delay);
                                //--วาง Script เงื่อนไขสร้างที่อยู่
                                console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] ไม่สามารถเพิ่มข้อมูลที่อยู่ของร้านค้าได้ ไม่มีปุ่มเพิ่มที่อยู่');
                                await page.waitForTimeout(delay);
                                await page.getByRole('tab', { name: 'General Info.' }).click();
                                await page.waitForTimeout(delay);
                                await page.getByRole('button', { name: 'Back' }).click();
                                await page.waitForTimeout(delay);
                                //--ทำครบกระบวนการแล้วกลับไปตรวจสอบหน้าแรก
                                await page.getByRole('textbox', { name: 'Search keyword...' }).fill('Doub');
                                await page.waitForTimeout(delay);
                                await page.getByRole('textbox', { name: 'Search keyword...' }).press('Enter');
                                await page.waitForTimeout(delay);
                                // //-----------------------------------------------------------------------------------------------------------------------------------
                                // const shpcode = '//*[@id="otrShop0"]/td[2]';
                                // const shpname = '//*[@id="otrShop0"]/td[3]'
                                // const shptype = '//*[@id="otrShop0"]/td[4]'
                                // const shpbranch = '//*[@id="otrShop0"]/td[5]'
                                // const elements1 = await page.$(shpcode);
                                // const elements2 = await page.$(shpname);
                                // const elements3 = await page.$(shptype);
                                // const elements4 = await page.$(shpbranch);
                                // if (elements1 && elements2 && elements3 && elements4) {
                                //     const text1 = await elements1.innerText();
                                //     const text2 = await elements2.innerText();
                                //     const text3 = await elements3.innerText();
                                //     const text4 = await elements4.innerText();
                                //     //console.log('\x1b[32m%s\x1b[0m', '[พบข้อมูล]', ' [Shop Code] :', text1, ' [Shop Name] :', text2, ' [Shop Type] :', text3, ' [Branch] :', text4);
                                //     console.log('\x1b[32m%s\x1b[0m', '[ข้อมูลร้านค้าที่สร้างล่าสุด]');
                                //     console.log('\x1b[36m%s\x1b[0m', '[Shop Code] :', text1);
                                //     console.log('\x1b[36m%s\x1b[0m', '[Shop Name] :', text2);
                                //     console.log('\x1b[36m%s\x1b[0m', '[Shop Type] :', text3);
                                //     console.log('\x1b[36m%s\x1b[0m', '[Branch]    :', text4);
                                console.log('\x1b[32m%s\x1b[0m', '[ผ่าน]');
                                // }
                                // //-----------------------------------------------------------------------------------------------------------------------------------

                            }
                            else {
                                //--วาง Script เงื่อนไข แก้ไขที่อยู่
                                console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] ไม่สามารถแก้ข้อมูลที่อยู่ของร้านค้าได้');
                                await page.waitForTimeout(delay);
                                //--วาง Script เงื่อนไข ลบที่อยู่
                                console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] ไม่สามารถลบข้อมูลที่อยู่ของร้านค้าได้');
                                await page.waitForTimeout(delay);
                                //--วาง Script เงื่อนไข เพิ่มที่อยู่ใหม่หลังลบ
                                console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] ไม่สามารถเพิ่มข้อมูลที่อยู่ของร้านค้าได้ ไม่มีปุ่มเพิ่มที่อยู่');
                                await page.waitForTimeout(delay);
                                //--ทำครบกระบวนการแล้วกลับไปตรวจสอบหน้าแรก
                                await page.getByRole('tab', { name: 'General Info.' }).click();
                                await page.waitForTimeout(delay);
                                await page.getByRole('button', { name: 'Back' }).click();
                                await page.waitForTimeout(delay);
                                await page.getByRole('textbox', { name: 'Search keyword...' }).fill('Doub');
                                await page.waitForTimeout(delay);
                                await page.getByRole('textbox', { name: 'Search keyword...' }).press('Enter');
                                await page.waitForTimeout(delay);
                                // //-----------------------------------------------------------------------------------------------------------------------------------
                                // const shpcode = '//*[@id="otrShop0"]/td[2]';
                                // const shpname = '//*[@id="otrShop0"]/td[3]'
                                // const shptype = '//*[@id="otrShop0"]/td[4]'
                                // const shpbranch = '//*[@id="otrShop0"]/td[5]'
                                // const elements1 = await page.$(shpcode);
                                // const elements2 = await page.$(shpname);
                                // const elements3 = await page.$(shptype);
                                // const elements4 = await page.$(shpbranch);
                                // if (elements1 && elements2 && elements3 && elements4) {
                                //     const text1 = await elements1.innerText();
                                //     const text2 = await elements2.innerText();
                                //     const text3 = await elements3.innerText();
                                //     const text4 = await elements4.innerText();
                                //     //console.log('\x1b[32m%s\x1b[0m', '[พบข้อมูล]', ' [Shop Code] :', text1, ' [Shop Name] :', text2, ' [Shop Type] :', text3, ' [Branch] :', text4);
                                //     console.log('\x1b[32m%s\x1b[0m', '[ข้อมูลร้านค้าที่สร้างล่าสุด]');
                                //     console.log('\x1b[36m%s\x1b[0m', '[Shop Code] :', text1);
                                //     console.log('\x1b[36m%s\x1b[0m', '[Shop Name] :', text2);
                                //     console.log('\x1b[36m%s\x1b[0m', '[Shop Type] :', text3);
                                //     console.log('\x1b[36m%s\x1b[0m', '[Branch]    :', text4);
                                console.log('\x1b[32m%s\x1b[0m', '[ผ่าน]');
                                // }
                                // //-----------------------------------------------------------------------------------------------------------------------------------
                            }
                        }


                    }
                }

                //-------------------------
                console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการลบข้อมูล Master ร้านค้า]');
                await page.waitForTimeout(delay);
                //await page.getByRole('row', { name: '00023 Shop Double P Shop HeadQuarter' }).getByRole('img').first().click();
                await page.locator('#otrShop0 > td:nth-child(6) > img').click();
                await page.waitForTimeout(delay);
                //await page.getByRole('button', { name: 'Confirm' }).click();
                await page.getByRole('button', { name: 'Close' }).click();
                await page.waitForTimeout(3000);
                const Find = await page.$('#odvRGPList > tr > td');
                if (Find) {//ค้นหาร้านค้า
                    const text = await Find.textContent();
                    await page.waitForTimeout(delay);
                    const expectedText = 'Not Found Data.';
                    if (text === expectedText) {//เจอหรือไม่เจอ
                        console.log('\x1b[36m%s\x1b[0m', '[ทำการลบข้อมูลเรียบร้อย]');
                        console.log('\x1b[32m%s\x1b[0m', '[ผ่าน]');
                    }
                    else {
                        console.log('\x1b[36m%s\x1b[0m', '[ทำการลบข้อมูลเรียบร้อย ต้องไม่เจอข้อมูล]');
                        console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] เนื่องจาก ให้กด Close เพื่อทดสอบการรันโปรแกรมซ้ำ');
                    }
                }











                //-------------------------




            }
        }
        //await page.pause();
        await page.waitForTimeout(delay);



    } catch (error) {
        console.error('Error :', error);
    } finally {
        console.log('Tested');
    }





});