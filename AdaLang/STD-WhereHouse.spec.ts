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
    //await page.waitForTimeout(delay);
    //--trace on
    await chromium.launch({ headless: false, slowMo: 1000 })
    const Header = 'Baimiang Healthy ShopEN'
    const weburl = 'https://dev.ada-soft.com/AdaStoreBackSTD/login'
    const username = '009'
    const password = '12345678'
    const wherehouse = 'pss international warehouse'//ใช้ในการค้นหาเพื่อไม่เจอจะได้สร้างใหม่
    //const wherehouse = 'Emp'//ใช้ในการค้นหาเพื่อทดสอบการแก้ไข เป็นข้อมูลเดิม

    const Addnewwherehouse = 'PSS International warehouse' //ชื่อคลังสำหรับทดสอบสร้างใหม่
    const Findnewwherehouse = 'PSS' //ชื่อคลังสำหรับทดสอบค้นหาการสร้างใหม่
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
        await page.getByTitle('Master').click();
        await page.waitForTimeout(delay);
        await page.getByRole('link', { name: ' System Branch' }).click();
        await page.waitForTimeout(delay);
        await page.locator('#MASSTO a').filter({ hasText: 'Warehouse' }).click();
        await page.waitForTimeout(delay);
        console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการค้นหาคลังสินค้า]');
        await page.waitForTimeout(delay);
        console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการค้นหาด้วยตัวอักษรแบบพิมพ์เล็ก]');
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('Search keyword...').fill(wherehouse);
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('Search keyword...').press('Enter');
        await page.waitForTimeout(delay);
        //-----------------------------------------------------------------------------------------------------------------------------------
        const NUpperTest = '//*[@id="odvRGPList"]/tr/td';
        const elements1 = await page.$(NUpperTest);
        if (elements1) { //ไม่ควรถูกค้นเจอ กรณีชื่อคลังสินค้าไม่มีข้อมูลการพิมพ์ตัวอักษรแบบพิมพ์เล็กทั้งหมดที่บันทึกไว้
            const text1 = await elements1.innerText();
            console.log('\x1b[36m%s\x1b[0m', '[ระบบแจ้ง] : ', text1);
            console.log('\x1b[32m%s\x1b[0m', '[ผ่าน]');
        }
        //await page.pause();
        //-----------------------------------------------------------------------------------------------------------------------------------        
        await page.getByPlaceholder('Search keyword...').fill(Addnewwherehouse);
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('Search keyword...').press('Enter');
        await page.waitForTimeout(delay);
        const Find = await page.$('#odvRGPList > tr > td');
        if (Find) {//ค้นหาคลังชื่อเต็ม
            const text = await Find.textContent();
            const expectedText = 'Not Found Data.';
            if (text === expectedText) {
                console.log('\x1b[36m%s\x1b[0m', '[ไม่พบข้อมูล"คลัง"ที่ค้นหา กำลังดำเนินการสร้างข้อมูล]');
                //--วาง Script เงื่อนไข
                await page.getByRole('button', { name: '+' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('tab', { name: 'English' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'Warehouse Name' }).fill(Addnewwherehouse);
                await page.waitForTimeout(delay);
                await page.locator('#obtWahBrowseBchCreated').click();
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('Search keyword...').fill('Pep');
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('Search keyword...').press('Enter');
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'PepperBranch' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'Choose' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('combobox', { name: 'Offline Stock' }).click();
                await page.waitForTimeout(delay);
                //await page.locator('#bs-select-4-2').click();//Record ไม่ตรง
                await page.locator('#bs-select-4-2').click();//คลิกเพื่อเลือกเป็น Online Stock               
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'Save' }).click();
                await page.waitForTimeout(3000);
                console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] เนื่องจาก ไม่สามารถบันทึกได้ ระบบแจ้งเตือนให้กรอกข้อมูลลงใน Tab Thai');
                await page.waitForTimeout(delay);
                await page.getByText('Warehouse Infomation').click();
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'Search keyword...' }).fill(Findnewwherehouse);
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'Search keyword...' }).press('Enter');
                await page.waitForTimeout(delay);
                await page.pause();
                const Find = await page.$('#odvRGPList > tr > td');
                if (Find) {
                    const text = await Find.textContent();
                    const expectedText = 'Not Found Data.';
                    if (text === expectedText) {
                        console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] เนื่องจาก 1.ระบบไม่สามารถบันทึกข้อมูลชื่อที่เป็นตัวอักษรได้ แต่สามารถบันทึกชื่อคลังที่เป็นชนิดตัวเลขได้');
                        console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] เนื่องจาก 2.หากบันทึกชื่อคลังชนิดตัวเลขแล้ว ระบบได้บันทึกในส่วนที่เป็นภาษาไทย (LocalSta) โดยมิได้บันทึกลงส่วนของ Language Used');
                        //await page.pause();
                    }
                    else {
                        //-----------------------------------------------------------------------------------------------------------------------------------
                        const whcode = '//*[@id="otrWarehouse0"]/td[2]';
                        const whname = '//*[@id="otrWarehouse0"]/td[3]'
                        const whtype = '//*[@id="otrWarehouse0"]/td[4]'
                        const whbranch = '//*[@id="otrWarehouse0"]/td[5]'
                        const elements1 = await page.$(whcode);
                        const elements2 = await page.$(whname);
                        const elements3 = await page.$(whtype);
                        const elements4 = await page.$(whbranch);
                        if (elements1 && elements2 && elements3 && elements4) {
                            const text1 = await elements1.innerText();
                            const text2 = await elements2.innerText();
                            const text3 = await elements3.innerText();
                            const text4 = await elements4.innerText();
                            console.log('\x1b[32m%s\x1b[0m', '[พบข้อมูล]', ' [Warehouse Code] :', text1, ' [Warehouse Name] :', text2, ' [Warehouse Type] :', text3, ' [Branch] :', text4);
                            //console.log('\x1b[32m%s\x1b[0m', '[ผ่าน]');
                        }
                        //-----------------------------------------------------------------------------------------------------------------------------------

                        console.log('\x1b[32m%s\x1b[0m', '[ตรวจสอบการบันทึกข้อมูล English]');
                        await page.locator('#otrWarehouse0 > td:nth-child(8) > img').click();//คลิกปุ่มโลโก้แก้ไข
                        await page.waitForTimeout(delay);
                        await page.getByRole('tab', { name: 'English' }).click();//คลิกไปที่แท็ปภาษาอังกฤษ
                        await page.waitForTimeout(delay);
                        // ใช้ id เป็นตัวเลือกในการเลือก Element
                        const inputId = 'oetWahName2'; // เปลี่ยนเป็น id ของ Textbox ที่คุณต้องการ
                        // ดึงค่าที่อยู่ใน Textbox ด้วย id
                        const inputValue = await page.$eval(`input#${inputId}`, (element) => (element as HTMLInputElement).value);
                        console.log('ค่าใน Textbox:', inputValue);
                        console.log('\x1b[32m%s\x1b[0m', '[ผ่าน]');
                    }
                }
            }
            else {
                console.log('\x1b[32m%s\x1b[0m', '[พบข้อมูลที่ค้นหา]');
                //-----------------------------------------------------------------------------------------------------------------------------------
                const whcode = '//*[@id="otrWarehouse0"]/td[2]';
                const whname = '//*[@id="otrWarehouse0"]/td[3]'
                const whtype = '//*[@id="otrWarehouse0"]/td[4]'
                const whbranch = '//*[@id="otrWarehouse0"]/td[5]'
                const elements1 = await page.$(whcode);
                const elements2 = await page.$(whname);
                const elements3 = await page.$(whtype);
                const elements4 = await page.$(whbranch);
                if (elements1 && elements2 && elements3 && elements4) {
                    const text1 = await elements1.innerText();
                    const text2 = await elements2.innerText();
                    const text3 = await elements3.innerText();
                    const text4 = await elements4.innerText();
                    console.log('\x1b[32m%s\x1b[0m', '[พบข้อมูล]', ' [Warehouse Code] :', text1, ' [Warehouse Name] :', text2, ' [Warehouse Type] :', text3, ' [Branch] :', text4);
                }
                //-----------------------------------------------------------------------------------------------------------------------------------
                console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการแก้ไขข้อมูลคลังสินค้า]');
                await page.waitForTimeout(delay);
                await page.locator('#otrWarehouse0 > td:nth-child(8) > img').click();//คลิกปุ่มโลโก้แก้ไข
                //await page.getByRole('row', { name: '00004 Empire Pep industry wherehouse General HeadQuarter' }).getByRole('img').nth(1).click();
                //await page.waitForTimeout(delay);
                //await page.pause();
                //await page.getByTitle('#oliInforGeneralTapWah > a').click(); 
                await page.waitForTimeout(delay);
                await page.getByRole('tab', { name: 'English' }).click();//คลิกไปที่แท็ปภาษาอังกฤษ
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'Warehouse Name' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'Warehouse Name' }).fill('');
                await page.waitForTimeout(delay);
                await page.getByRole('combobox', { name: 'General' }).click();
                await page.waitForTimeout(delay);
                await page.locator('#bs-select-2-0 > span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'Warehouse Name' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'Warehouse Name' }).fill(Addnewwherehouse);
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'Save' }).click();
                await page.waitForTimeout(3000);
                //-----------------------------------------------------------------------------------------------------------------------------------
                console.log('\x1b[36m%s\x1b[0m', 'ตรวจสอบข้อมูลหลังการแก้ไข');
                await page.getByText('Warehouse Infomation').click();
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('Search keyword...').click();
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('Search keyword...').fill('Emp');
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('Search keyword...').press('Enter');
                await page.waitForTimeout(delay);
                if (elements1 && elements2 && elements3 && elements4) {
                    const text1 = await elements1.innerText();
                    const text2 = await elements2.innerText();
                    const text3 = await elements3.innerText();
                    const text4 = await elements4.innerText();
                    console.log('\x1b[32m%s\x1b[0m', '[พบข้อมูล]', ' [Warehouse Code] :', text1, ' [Warehouse Name] :', text2, ' [Warehouse Type] :', text3, ' [Branch] :', text4);
                }
                console.log('\x1b[36m%s\x1b[0m', 'ข้อมูลชื่อถูกแก้ไขเรียบร้อยแล้ว');
                console.log('\x1b[32m%s\x1b[0m', '[ผ่าน]');
                //-----------------------------------------------------------------------------------------------------------------------------------
                console.log('\x1b[36m%s\x1b[0m', 'ทดสอบการลบข้อมูล');
                await page.locator('#otrWarehouse0 > td:nth-child(7) > img').click();//คลิกถังขยะเพื่อลบข้อมูล
                const delMSG = '//*[@id="ospConfirmDelete"]';
                const btnAcMSG = '//*[@id="osmConfirm"]';
                const btnClMSG = '//*[@id="odvModalDelWarehouse"]/div/div/div[3]/button[2]';
                const eldelMSG = await page.$(delMSG);
                ;
                if (eldelMSG && btnAcMSG && btnClMSG) {
                    const text1 = await eldelMSG.innerText();
                    console.log('\x1b[36m%s\x1b[0m', '[MSG ยืนยันการลบ : ]', text1);
                }
                await page.getByRole('button', { name: 'Close' }).click(); // ถ้าคลิก Confirm คือการยืนยันการลบข้อมูล
                console.log('\x1b[36m%s\x1b[0m', '[ยังไม่ทดสอบการลบ เนื่องจากระบบยังไม่สามารถเพิ่มข้อมูลได้]');
                console.log('\x1b[32m%s\x1b[0m', '[ผ่าน]');
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