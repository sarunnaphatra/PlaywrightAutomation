import { test, expect, chromium } from '@playwright/test';
import { Client } from 'pg';


test('test', async ({ page }) => {
    const browser = await chromium.launch();
    await chromium.launch({ headless: false, slowMo: 1000 })
    const user = 'pep'
    const wpass = '1234'
    const rpass = '11111111'
    const adname = 'Pepper Industry'
    const delay = 1000

    //const productid = 'PP0004X'
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
    await page.getByPlaceholder('ชื่อผู้ใช้').fill(user);
    await page.getByPlaceholder('ชื่อผู้ใช้').press('Tab');
    await page.getByPlaceholder('รหัสผ่าน').fill(wpass);
    await page.getByPlaceholder('รหัสผ่าน').press('Tab');
    await page.getByRole('link', { name: 'ภาษาไทย' }).press('Tab');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).press('Enter');
    const Incor = page.locator("#ospUsrOrPwNotCorrect"); //01
    await Incor.waitFor({ state: "visible" });      //02 =01>02 รอจนกว่าจะแสดง Element
    await expect(page.locator("#ospUsrOrPwNotCorrect")).toHaveText('รหัสผ่านไม่ถูกต้อง'); //VerifyText
    await page.waitForTimeout(3000);
    await page.getByPlaceholder('รหัสผ่าน').fill(rpass);
    await page.getByPlaceholder('รหัสผ่าน').press('Tab');
    await page.getByRole('link', { name: 'ภาษาไทย' }).press('Tab');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).press('Enter');
    await page.waitForLoadState('networkidle');
    const Comname = page.locator("#spnCompanyName"); //01
    await Comname.waitFor({ state: "visible" });        //02 =01>02 รอจนกว่าจะแสดง Element
    await expect(page.locator("#spnCompanyName")).toHaveText(adname);  //VerifyText
    await page.waitForTimeout(3000);
    try {
        
        await page.waitForTimeout(delay);
        await page.getByTitle('สินค้าคงคลัง').click();
        await page.waitForTimeout(delay);
        await page.getByRole('link', { name: ' โอนสาขา' }).click();
        await page.waitForTimeout(delay);
        await page.locator('a').filter({ hasText: 'ใบรับโอน - สาขา' }).click();
        await page.waitForTimeout(delay);
        await Comname.waitFor({ state: "visible" });
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('กรอกคำค้นหา').fill('00002');
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
        await page.waitForTimeout(3000);

        //await page.pause();
        await page.waitForTimeout(delay);
        const Find = await page.$('#odvRGPList > tr > td');
        if (Find) {
            const text = await Find.textContent();
            const expectedText = 'ไม่พบข้อมูล';
            if (text === expectedText) {

                //-----------------------------------------------------------------------------------------------------------------------------------
                const resultxpath = '//*[@id="odvRGPList"]/tr/td';
                const comnamexpath = '//*[@id="oliTBITitle"]';
                //const branchxpath = '//*[@id="odvInforGeneralTap"]/div/div[2]/div[2]/div[2]/div/p'
                const elements1 = await page.$(resultxpath);
                const elements2 = await page.$(comnamexpath);
                //const elements3 = await page.$(branchxpath);
                if (elements1 && elements2) {
                    const text1 = await elements1.innerText();
                    const text2 = await elements2.innerText();
                    //const text3 = await elements3.innerText();
                    console.log('\x1b[36m%s\x1b[0m', '[แสดงรายการ] ', ' [หน้า] : ', text2, ' [ข้อความแจ้ง] : ', text1);
                    await page.waitForTimeout(delay);
                    console.log('\x1b[36m%s\x1b[0m', '[กำลังสร้างเอกสาร] ');
                }
                //-----------------------------------------------------------------------------------------------------------------------------------
                //--วาง Script เงื่อนไข
                await page.pause();
                await page.getByRole('button', { name: '+' }).click();
                await page.waitForTimeout(delay);
                await page.locator('#obtTransferBchOutBrowseBchTo').click();
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('กรอกคำค้นหา').click();
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('กรอกคำค้นหา').fill('PSS');
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'PSS' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                await page.waitForTimeout(delay);
                await page.locator('#obtTransferBchOutBrowseWahTo').click();
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('กรอกคำค้นหา').click();
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('กรอกคำค้นหา').fill('00001');
                await page.waitForTimeout(delay);
                await page.getByPlaceholder('กรอกคำค้นหา').press('Enter');
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'คลังขาย' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: '+' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 02' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 03' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '00282 น้ำแร่ม็องแรงส์ ขวด 100282' }).getByRole('cell', { name: 'น้ำแร่ม็องแรงส์' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '00282 น้ำแร่ม็องแรงส์ ขวด 00282' }).getByRole('cell', { name: 'น้ำแร่ม็องแรงส์' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '00282 น้ำแร่ม็องแรงส์ แพ็ค PK00282' }).getByRole('cell', { name: 'น้ำแร่ม็องแรงส์' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 04 (ไม่อนุญาตลด)' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 05 (ไม่อนุญาตลด)' }).click();
                await page.waitForTimeout(3000);
                await page.locator('#odvModalBodyPDT > div.modal-header.xCNModalHead > div > div.col-xs-12.col-sm-6.col-md-6.col-lg-6.text-right > button.btn.xCNBTNPrimery.xCNBTNPrimery2Btn').click();
                await page.waitForTimeout(3000);
                await page.locator('input[name="ohdQty1"]').fill('100');
                await page.waitForTimeout(delay);
                await page.locator('input[name="ohdQty2"]').fill('120');
                await page.waitForTimeout(delay);
                await page.locator('input[name="ohdQty3"]').fill('190');
                await page.waitForTimeout(delay);
                await page.locator('input[name="ohdQty4"]').fill('200');
                await page.waitForTimeout(delay);
                await page.locator('input[name="ohdQty5"]').fill('10');
                await page.waitForTimeout(delay);
                await page.locator('input[name="ohdQty6"]').fill('111');
                await page.waitForTimeout(delay);
                await page.locator('input[name="ohdQty7"]').fill('164');
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'บันทึก' }).click();
                await page.waitForTimeout(3000);
                console.log('\x1b[32m%s\x1b[0m', '[สร้างเอกสารเรียบร้อย] ');
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                await page.waitForTimeout(delay);
                console.log('\x1b[36m%s\x1b[0m', '[ทดสอบการแก้ไขข้อมูล]');
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00002');
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
                await page.waitForTimeout(3000);
                console.log('\x1b[36m%s\x1b[0m', '[กำลังแก้ไขข้อมูล');
                await page.getByRole('row', { name: 'Pepper Industry (HQ) BS0004723000002 29/08/2023 รออนมุติ รอการประมวลผล pep ไม่พบข้อมูล' }).getByRole('img').nth(1).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '1 00228 สินค้า 02 00228 ชิ้น Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '2 00229 สินค้า 03 00229 ชิ้น Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '3 00282 น้ำแร่ม็องแรงส์ 100282 ขวด Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '4 00282 น้ำแร่ม็องแรงส์ 00282 ขวด Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '5 00282 น้ำแร่ม็องแรงส์ PK00282 แพ็ค Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '6 00286 สินค้า 04 (ไม่อนุญาตลด) 00286 ชิ้น Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '7 00287 สินค้า 05 (ไม่อนุญาตลด) 00287 ชิ้น Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'ตัวเลือก' }).click();
                await page.waitForTimeout(delay);
                await page.getByText('ลบทั้งหมด').click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'ยืนยัน' }).click();
                await page.waitForTimeout(delay);
                //------------------------------------------------------------------------
                await page.getByRole('button', { name: '+' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 02' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 03' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '00282 น้ำแร่ม็องแรงส์ ขวด 100282' }).getByRole('cell', { name: 'น้ำแร่ม็องแรงส์' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '00282 น้ำแร่ม็องแรงส์ ขวด 00282' }).getByRole('cell', { name: 'น้ำแร่ม็องแรงส์' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '00282 น้ำแร่ม็องแรงส์ แพ็ค PK00282' }).getByRole('cell', { name: 'น้ำแร่ม็องแรงส์' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 04 (ไม่อนุญาตลด)' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 05 (ไม่อนุญาตลด)' }).click();
                await page.waitForTimeout(3000);
                await page.locator('#odvModalBodyPDT > div.modal-header.xCNModalHead > div > div.col-xs-12.col-sm-6.col-md-6.col-lg-6.text-right > button.btn.xCNBTNPrimery.xCNBTNPrimery2Btn').click();
                await page.waitForTimeout(3000);
                console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] 1.ข้อมูลลำดับแสดงเป็น NaN');
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                console.log('\x1b[36m%s\x1b[0m', '[ย้อนกลับ]');
                await page.waitForTimeout(delay);
                await Comname.waitFor({ state: "visible" });
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00002');
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
                await page.waitForTimeout(3000);
                console.log('\x1b[36m%s\x1b[0m', '[ลบข้อมูล]');
                const BrCreate = '//*[@id="otrTransferBchOutHD0"]/td[2]';
                const DocNumber = '//*[@id="otrTransferBchOutHD0"]/td[3]';
                const DocSta = '//*[@id="otrTransferBchOutHD0"]/td[5]/label'
                //const branchxpath = '//*[@id="odvInforGeneralTap"]/div/div[2]/div[2]/div[2]/div/p'
                const elBrCreate = await page.$(BrCreate);
                const elDocNumber = await page.$(DocNumber);
                const elDocSta = await page.$(DocSta);
                if (elBrCreate && elDocNumber && elDocSta) {
                    const text1 = await elBrCreate.innerText();
                    const text2 = await elDocNumber.innerText();
                    const text3 = await elDocSta.innerText();
                    console.log('\x1b[36m%s\x1b[0m', '[ดำเนินการลบข้อมูล] ', ' [สาขาที่สร้าง] : ', text1, ' [เลขที่เอกสาร] : ', text2, ' [สถานะเอกสาร] : ', text3);
                    await page.waitForTimeout(delay);
                    await page.getByRole('row', { name: 'Pepper Industry (HQ) BS0004723000002 29/08/2023 รออนมุติ รอการประมวลผล pep ไม่พบข้อมูล' }).getByRole('img').first().click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'ยืนยัน' }).click();
                    console.log('\x1b[32m%s\x1b[0m', '[ลบข้อมูลเรียบร้อย]');
                    //await page.pause();

                }

                //await page.pause();
            }
            else {
                //-----------------------------------------------------------------------------------------------------------------------------------
                const BrCreate = '//*[@id="otrTransferBchOutHD0"]/td[2]';
                const DocNumber = '//*[@id="otrTransferBchOutHD0"]/td[3]';
                const DocSta = '//*[@id="otrTransferBchOutHD0"]/td[5]/label'
                //const branchxpath = '//*[@id="odvInforGeneralTap"]/div/div[2]/div[2]/div[2]/div/p'
                const elBrCreate = await page.$(BrCreate);
                const elDocNumber = await page.$(DocNumber);
                const elDocSta = await page.$(DocSta);
                //const elements3 = await page.$(branchxpath);
                if (elBrCreate && elDocNumber && elDocSta) {
                    const text1 = await elBrCreate.innerText();
                    const text2 = await elDocNumber.innerText();
                    const text3 = await elDocSta.innerText();
                    console.log('\x1b[36m%s\x1b[0m', '[พบเอกสาร แสดงรายการ] ', ' [สาขาที่สร้าง] : ', text1, ' [เลขที่เอกสาร] : ', text2, ' [สถานะเอกสาร] : ', text3);
                    await page.waitForTimeout(delay);

                }
                //-----------------------------------------------------------------------------------------------------------------------------------
                console.log('\x1b[36m%s\x1b[0m', '[กำลังแก้ไขข้อมูล');
                await page.getByRole('row', { name: 'Pepper Industry (HQ) BS0004723000002 29/08/2023 รออนมุติ รอการประมวลผล pep ไม่พบข้อมูล' }).getByRole('img').nth(1).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '1 00228 สินค้า 02 00228 ชิ้น Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '2 00229 สินค้า 03 00229 ชิ้น Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '3 00282 น้ำแร่ม็องแรงส์ 100282 ขวด Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '4 00282 น้ำแร่ม็องแรงส์ 00282 ขวด Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '5 00282 น้ำแร่ม็องแรงส์ PK00282 แพ็ค Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '6 00286 สินค้า 04 (ไม่อนุญาตลด) 00286 ชิ้น Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '7 00287 สินค้า 05 (ไม่อนุญาตลด) 00287 ชิ้น Remove' }).locator('span').click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'ตัวเลือก' }).click();
                await page.waitForTimeout(delay);
                await page.getByText('ลบทั้งหมด').click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'ยืนยัน' }).click();
                await page.waitForTimeout(delay);
                //------------------------------------------------------------------------
                await page.getByRole('button', { name: '+' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 02' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 03' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '00282 น้ำแร่ม็องแรงส์ ขวด 100282' }).getByRole('cell', { name: 'น้ำแร่ม็องแรงส์' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '00282 น้ำแร่ม็องแรงส์ ขวด 00282' }).getByRole('cell', { name: 'น้ำแร่ม็องแรงส์' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('row', { name: '00282 น้ำแร่ม็องแรงส์ แพ็ค PK00282' }).getByRole('cell', { name: 'น้ำแร่ม็องแรงส์' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 04 (ไม่อนุญาตลด)' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 05 (ไม่อนุญาตลด)' }).click();
                await page.waitForTimeout(3000);
                await page.locator('#odvModalBodyPDT > div.modal-header.xCNModalHead > div > div.col-xs-12.col-sm-6.col-md-6.col-lg-6.text-right > button.btn.xCNBTNPrimery.xCNBTNPrimery2Btn').click();
                await page.waitForTimeout(3000);
                console.log('\x1b[31m%s\x1b[0m', '[ไม่ผ่าน] 1.ข้อมูลลำดับแสดงเป็น NaN');
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                console.log('\x1b[36m%s\x1b[0m', '[ย้อนกลับ]');
                await page.waitForTimeout(delay);
                await Comname.waitFor({ state: "visible" });
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00002');
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
                await page.waitForTimeout(3000);
                console.log('\x1b[36m%s\x1b[0m', '[ลบข้อมูล]');
                if (elBrCreate && elDocNumber && elDocSta) {
                    const text1 = await elBrCreate.innerText();
                    const text2 = await elDocNumber.innerText();
                    const text3 = await elDocSta.innerText();
                    console.log('\x1b[36m%s\x1b[0m', '[ดำเนินการลบข้อมูล] ', ' [สาขาที่สร้าง] : ', text1, ' [เลขที่เอกสาร] : ', text2, ' [สถานะเอกสาร] : ', text3);
                    await page.waitForTimeout(delay);
                    await page.getByRole('row', { name: 'Pepper Industry (HQ) BS0004723000002 29/08/2023 รออนมุติ รอการประมวลผล pep ไม่พบข้อมูล' }).getByRole('img').first().click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'ยืนยัน' }).click();
                    console.log('\x1b[32m%s\x1b[0m', '[ลบข้อมูลเรียบร้อย]');
                    //await page.pause();

                }

            }
        }
    } catch (error) {
        console.error('Error :', error);
    } finally {
        console.log('Tested');
    }


});
//------------------------------------------------------------------------------------------------------------------------------------------------------
