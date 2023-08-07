import { test, expect, chromium } from '@playwright/test';
import { evaluateXPathToBoolean } from 'fontoxpath';
import { evaluateXPathToString } from 'fontoxpath';
import { Client } from 'pg';


test('test', async ({ page }) => {
    const browser = await chromium.launch();
    const delay = 1000;
    const AmountB = 1000;
    const totalAmount: number = AmountB;
    //await page.waitForTimeout(delay);
    //--trace on
    await chromium.launch({ headless: false, slowMo: 1000 })
    const productid = 'PB1003'
    const productid1 = 'PBT-01'
    const productid2 = 'PP0004X1' //ทดสอบผิด
    const productname = 'PEP-TEST04'
    const OrderDoc = 'A00003-PEPPER'  // ทดสอบเอกสารใหม่  A00003-PEPPER
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

    //});

    await page.getByTitle('การซื้อ').click();
    await page.waitForTimeout(delay);
    await page.getByRole('link', { name: ' เอกสาร' }).click();
    await page.waitForTimeout(delay);
    await page.locator('a').filter({ hasText: 'ใบสั่งซื้อ' }).click();
    await page.waitForTimeout(delay);
    console.log('ใบสั่งซื้อ : ค้นหาสาขาที่สร้าง')
    await page.waitForTimeout(delay);
    await page.getByPlaceholder('กรอกคำค้นหา').fill(OrderDoc);
    await page.waitForTimeout(delay);
    await page.locator('#obtPOSerchAllDocument').click();
    await page.waitForTimeout(delay);
    //-----------------------------------------------------------------------------------------------------------------------------------
    const xpath = '//*[@id="otbSOTblDataDocHDList"]/tbody/tr/td';   //ดึงข้อมูลมาเก็บไว้ที่ elements1  //*[@id="otrSupplier"]/td
    const elements1 = await page.$(xpath);
    if (elements1) {
        const text = await elements1.innerText();
        //console.log('ข้อมูลผู้ติดต่อ ที่แสดง1 :', text);
    }
    //-----------------------------------------------------------------------------------------------------------------------------------
    const FindOrderDoc = await page.$('#otbSOTblDataDocHDList > tbody > tr > td');
    if (FindOrderDoc) {
        // Get the text content of the element
        const text = await FindOrderDoc.textContent();
        // Compare the text content
        const expectedText = 'ไม่พบข้อมูล';
        if (text === expectedText) {
            console.log('ใบสั่งซื้อ : ตรวจสอบ ไม่พบใบสั่งซื้อดั่งกล่าว')
            console.log('ใบสั่งซื้อ : ดำเนินการสร้างเอกสารใบสั่งซื้อ')
            await page.getByRole('button', { name: '+' }).click();
            await page.waitForTimeout(delay);
            await page.locator('#odvPODataStatusInfo span').nth(1).click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('เลขที่เอกสาร').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('เลขที่เอกสาร').fill(OrderDoc);
            await page.waitForTimeout(delay);
            await page.getByRole('tab', { name: 'ข้อมูลอ้างอิง ' }).getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('tab', { name: 'เงื่อนไข ' }).getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            //+
            console.log('ใบสั่งซื้อ : เงื่อนไข : ตรวจสอบ ไม่พบกลุ่มธุรกิจ')
            console.log('ใบสั่งซื้อ : ดำเนินการสร้างกลุ่มธุรกิจ')
            await page.locator('#obtPOBrowseMerchant').click();
            await page.waitForTimeout(delay);
            const CBB = await page.$('#otbBrowserList > tbody > tr > td');
            if (CBB) {
                const text = await CBB.textContent();
                const expectedText = 'ไม่พบข้อมูล';
                if (text === expectedText) {
                    await page.locator('#odvModalContent').getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ชื่อกลุ่มธุรกิจ').fill('PEPPER-RETAIL');
                    await page.waitForTimeout(delay);
                    await page.locator('#odvPvnBtnGroup').getByRole('button', { name: 'บันทึก' }).click();
                    await page.waitForTimeout(delay);
                    //-----------------------------------------------------------------------------------------------------------------------------------
                    const xpath = '//*[@id="otbBrowserList"]/tbody/tr/td';
                    const elements1 = await page.$(xpath);
                    if (elements1) {
                        const text = await elements1.innerText();
                        console.log('\x1b[31m%s\x1b[0m', 'ช้อมูลแสดง : ', text, ' [ระบบไม่แสดงข้อมูล ตามที่สร้าง]')
                        await page.getByRole('button', { name: 'ปิด' }).click();
                        //await page.pause();

                    }
                    //-----------------------------------------------------------------------------------------------------------------------------------
                }
                else {
                    //*** */
                    await page.waitForTimeout(delay);
                    console.log('ใบสั่งซื้อ : เงื่อนไข : ตรวจสอบ ไม่พบกลุ่มธุรกิจ')
                    //await page.locator('#obtPOBrowseMerchant').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').fill('PEPPER-RETAIL');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: '' }).click();
                    await page.waitForTimeout(delay);
                    const CBBG = await page.$('#otbBrowserList > tbody > tr > td');
                    if (CBBG) {
                        const text = await CBBG.textContent();
                        const expectedText = 'ไม่พบข้อมูล';
                        if (text === expectedText) {
                            console.log('ใบสั่งซื้อ : เงื่อนไข : ดำเนินการสร้างกลุ่มธุรกิจ')
                            //await page.pause();
                            //CreateBuss()                
                            console.log('\x1b[31m%s\x1b[0m', '----------- ระบบไม่ดึงข้อมูล ------------')
                            await page.getByRole('button', { name: 'ปิด' }).click(); //TT-010 Issue --------------------------------------------****--------
                            console.log('\x1b[32m%s\x1b[0m', 'ใบสั่งซื้อ : เงื่อนไข : ดำเนินการสร้างกลุ่มธุรกิจและทำการเลือกแล้ว')

                        }
                        else {
                            console.log('\x1b[32m%s\x1b[0m', 'ใบสั่งซื้อ : เงื่อนไข : พบข้อมูลมีอยู่แล้ว ทำเงื่อนไขการเลือกตรงนี้ด้วย 01')
                            await page.getByRole('cell', { name: 'PEPPER-RETAIL[VVIP]' }).click();
                            await page.waitForTimeout(delay);
                            await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                            await page.waitForTimeout(delay);

                            // --------------
                            //await page.pause();
                        }
                    }
                }
            }



            await page.waitForTimeout(delay);
            await page.locator('#obtPOBrowseWahouse').click();
            await page.waitForTimeout(delay);
            await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00001');
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            const CBWarehouse = await page.$('#otbBrowserList > tbody > tr > td');
            if (CBWarehouse) {
                const text = await CBWarehouse.textContent();
                const expectedText = 'ไม่พบข้อมูล';
                if (text === expectedText) {
                    console.log('ใบสั่งซื้อ : เงื่อนไข : ไม่พบคลังสินค้ากรุณาเพิ่มคลังสินค้าก่อน')
                    //await page.pause();
                }
                else {
                    console.log('ใบสั่งซื้อ : เงื่อนไข : พบคลังสินค้า')
                    //await page.getByRole('cell', { name: 'คลังขาย' }).click();
                    //await page.waitForTimeout(delay); 
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    //console.log('\x1b[32m%s\x1b[0m', 'ใบสั่งซื้อ : เงื่อนไข : ทำการเลือกคลังสินค้าเรียบร้อย')
                    //await page.pause();
                    console.log('\x1b[32m%s\x1b[0m', 'ใบสั่งซื้อ : เงื่อนไข : ระบบเลือกให้อัตโนมัติเรียบร้อย')
                }
            }

            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('tab', { name: 'ผู้จำหน่าย ' }).getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('tab', { name: 'อื่นๆ ' }).getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            await page.locator('#obtPOBrowseSupplier > img').click();
            //await page.locator('##obtPOBrowseSupplier > img').click();
            await page.waitForTimeout(delay);
            await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('Olympic');
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            const SelectVendor = await page.$('#otbBrowserList > tbody > tr > td');
            if (SelectVendor) {
                const text = await SelectVendor.textContent();
                const expectedText = 'ไม่พบข้อมูล';
                if (text === expectedText) {
                    await page.locator('#odvModalContent').getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ชื่อผู้จำหน่าย').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ชื่อผู้จำหน่าย').fill('Olympic');
                    await page.waitForTimeout(delay);
                    await page.locator('#odvBtnGroup').getByRole('button', { name: 'บันทึก' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: 'Olympic' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    await page.waitForTimeout(delay);
                }
                else {
                    //*** */
                    console.log('ใบสั่งซื้อ : เงื่อนไข : พบผู้จัดจำหน่าย')
                    await page.getByRole('cell', { name: 'Olympic' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    console.log('\x1b[32m%s\x1b[0m', 'ใบสั่งซื้อ : เงื่อนไข : ทำการเลือกผู้จัดจำหน่ายเรียบร้อย')
                }
            }
            console.log('ใบสั่งซื้อ : เงื่อนไข : ค้นหาสินค้า : เพิ่มสินค้าด้วยบาร์โค้ดหรือรหัสสินค้า')
            console.log('ใบสั่งซื้อ : ค้นหาสินค้า')
            await page.getByPlaceholder('เพิ่มสินค้าด้วยบาร์โค้ด หรือ รหัสสินค้า').fill(productid2);
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('เพิ่มสินค้าด้วยบาร์โค้ด หรือ รหัสสินค้า').press('Enter');
            await page.waitForTimeout(delay);
            const FindProduct = await page.$('#odvPOModalPDTNotFound > div > div > div.modal-body > p');
            if (FindProduct) {
                const text = await FindProduct.textContent();
                const expectedText = 'ไม่พบข้อมูลสินค้า กรุณาลองใหม่อีกครั้ง';
                if (text === expectedText) {
                    console.log('ใบสั่งซื้อ : ค้นหาสินค้า : มีสินค้า แต่ทดสอบการค้นหาชื่อสินค้าผิด')
                    await page.waitForTimeout(delay);
                    const xpathProductName = '//*[@id="odvPOModalPDTNotFound"]/div/div/div[2]/p';   //ดึงข้อมูลมาเก็บไว้ที่ elements1  //*[@id="otrSupplier"]/td
                    const ProductName = await page.$(xpathProductName);
                    if (ProductName) {
                        const text = await ProductName.innerText();
                        console.log('ข้อมูลสินค้า ที่แสดง2 :', text);
                        await page.waitForTimeout(3000);
                    }
                    await page.getByRole('button', { name: 'ตกลง' }).click();
                    await page.waitForTimeout(delay);
                    console.log('ใบสั่งซื้อ : ค้นหาสินค้า : ให้ทำการค้นหาในหน้า แสดงข้อมูล สินค้า')
                    console.log('ใบสั่งซื้อ : ค้นหาสินค้า +')
                    await page.getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill(productid);
                    await page.waitForTimeout(delay);
                    await page.locator('#odvModalsectionBodyPDT').getByRole('button').click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: productid }).first().click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice1').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice1').fill('1000');
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice1').press('Enter');
                    await page.waitForTimeout(delay);
                    //-----------------------------------------------------------------------------------------------------------------------------------
                    const chkVat = '//*[@id="oulDataListVat"]/li/label[1]';
                    const ReChkVat = await page.$(chkVat);
                    const chkVat01 = '//*[@id="oulDataListVat"]/li/label[2]';
                    const ReChkVat01 = await page.$(chkVat01);
                    const chkVat02 = '//*[@id="olbVatSum"]';
                    const ReChkVat02 = await page.$(chkVat02);
                    const Price = '//*[@id="olbCalFCXphGrand"]';
                    const PriceResult = await page.$(Price);
                    await page.waitForTimeout(delay);
                    const xpathVatFunction = '//*[@id="odvRowPanelSplInfo"]/div/div[1]/div/button/div/div/div';
                    const ValueText = await page.$(xpathVatFunction);

                    if (ValueText) {
                        const text2 = await ValueText.innerText();
                        console.log('\x1b[36m%s\x1b[0m', 'VatFunction Testing : ', text2);
                        console.log('\x1b[36m%s\x1b[0m', 'คำนวณราคาปกติแบบ ', text2);
                        VerifyVat();

                    }

                    await page.getByRole('cell', { name: '+' }).getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เพิ่มส่วนลด/ชาร์จ' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ลดบาท' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-11-2').click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('row', { name: '1 1,000.00 0.00 0.00 ชาร์จบาท Remove' }).getByRole('textbox').click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('row', { name: '1 1,000.00 0.00 0.00 ชาร์จบาท Remove' }).getByRole('textbox').fill('50');
                    await page.waitForTimeout(delay);
                    await page.getByRole('row', { name: '1 1,000.00 0.00 0.00 ชาร์จบาท Remove' }).getByRole('textbox').press('Enter');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'ตกลง' }).click();
                    if (ValueText) {
                        const text2 = await ValueText.innerText();
                        console.log('\x1b[36m%s\x1b[0m', 'VatFunction Testing : ', text2);
                        console.log('\x1b[36m%s\x1b[0m', 'คำนวณราคาเพิ่มชาร์ท 50 บาทแบบ ', text2,);
                        VerifyVat();
                        //console.log('แสดงแบบรวมใน')
                    }

                    await page.waitForTimeout(delay);
                    await page.getByRole('tab', { name: 'ผู้จำหน่าย ' }).getByRole('button', { name: '' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ภาษีรวมใน' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-5-1').click(); //เลือกแยกนอก มูลค่าหายเหลือ 0
                    await page.waitForTimeout(delay);
                    console.log('\x1b[31m%s\x1b[0m', '[ Problem ]', ' ราคาถูกรีเซ็ตเป็น 0');
                    await page.waitForTimeout(delay);
                    //เพิ่มราคาใหม่

                    await page.locator('#ohdPrice1').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice1').fill('1000');
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice1').press('Enter');
                    await page.getByRole('cell', { name: '+' }).getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เพิ่มส่วนลด/ชาร์จ' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ลดบาท' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-13-0 > span').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#otbPODisChgDataDocDTList > tbody > tr:nth-child(3) > td:nth-child(7) > div > input').fill('100');
                    await page.waitForTimeout(delay);
                    await page.locator('#otbPODisChgDataDocDTList > tbody > tr:nth-child(3) > td:nth-child(7) > div > input').press('Enter');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'ตกลง' }).click();
                    //--------

                    if (ValueText) {
                        const text2 = await ValueText.innerText();
                        console.log('\x1b[36m%s\x1b[0m', 'VatFunction Testing : ', text2);
                        console.log('\x1b[36m%s\x1b[0m', 'คำนวณราคาเพิ่มชาร์ท 50 บาทแบบ ', text2);
                        VerifyVat();
                        //console.log('แสดงแบบแยกนอก)
                    }
                    //await page.pause();
                    await page.waitForTimeout(2000);
                    await page.getByRole('combobox', { name: 'ภาษีแยกนอก' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-5-0').click();//เลือกภาษีรวมใน
                    await page.waitForTimeout(delay);
                    await page.locator('#obtPODocBrowsePdt').click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill(productid1);
                    await page.waitForTimeout(delay);
                    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).press('Enter');
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: 'ทดสอบสินค้าย่อยหาย' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice1').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice1').fill('1000');
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice1').press('Enter');
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="ohdQty2"]').click();
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="ohdQty2"]').fill('5');
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice2').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice2').fill('500');
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice2').press('Enter');
                    await page.waitForTimeout(delay);
                    if (ValueText) {
                        const text2 = await ValueText.innerText();
                        console.log('\x1b[36m%s\x1b[0m', 'VatFunction Testing : ', text2);
                        console.log('\x1b[36m%s\x1b[0m', 'คำนวณราคาเพิ่มชาร์ท 50 บาทแบบ ', text2);
                        VerifyVat();
                        //console.log('แสดงแบบรวมใน')
                    }
                    await page.waitForTimeout(2000);
                    await page.getByRole('button', { name: 'ลด/ชาร์จ' }).click();
                    await page.getByRole('button', { name: 'เพิ่มส่วนลด/ชาร์จ' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ลดบาท' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-15-0').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#otbPODisChgDataDocHDList > tbody > tr.xWPIDisChgTrTag > td:nth-child(7) > div > input').fill('100');
                    await page.waitForTimeout(delay);
                    await page.locator('#otbPODisChgDataDocHDList > tbody > tr.xWPIDisChgTrTag > td:nth-child(7) > div > input').press('Enter');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'ตกลง' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice1').fill('1000');
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="ohdQty2"]').fill('5');
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice2').fill('500');
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice2').press('Enter');
                    await page.waitForTimeout(delay);
                    if (ValueText) {
                        const text2 = await ValueText.innerText();
                        console.log('\x1b[36m%s\x1b[0m', 'VatFunction Testing : ', text2);
                        console.log('\x1b[36m%s\x1b[0m', 'คำนวณราคาส่วนลดสินค้าที่ 2 20% แบบ ', text2);

                        VerifyVat();
                        //console.log('แสดงแบบรวมใน')
                    }
                    await page.waitForTimeout(3000);
                    await page.getByRole('combobox', { name: 'ภาษีรวมใน' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-5-1').click(); //คำนวณแยกนอก
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice1').fill('1200');
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="ohdQty2"]').fill('10');
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice2').fill('700');
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice2').press('Enter');
                    await page.waitForTimeout(delay);
                    //++++++++++++++++++++++++++++++++++++++++++++++
                    // await page.locator('#ohdPrice1').click();
                    // await page.waitForTimeout(delay);
                    // await page.locator('#ohdPrice1').fill('1000');
                    // await page.waitForTimeout(delay);
                    // await page.locator('#ohdPrice1').press('Enter');
                    // await page.waitForTimeout(delay);

                    // await page.locator('input[name="ohdQty2"]').click();
                    // await page.waitForTimeout(delay);
                    // await page.locator('input[name="ohdQty2"]').fill('5');
                    // await page.waitForTimeout(delay);
                    // await page.locator('#ohdPrice2').click();
                    // await page.waitForTimeout(delay);
                    // await page.locator('#ohdPrice2').fill('500');
                    // await page.waitForTimeout(delay);
                    // await page.locator('#ohdPrice2').press('Enter');
                    // await page.waitForTimeout(delay);
                    //++++++++++++++++++++++++++++++++++++++++++++++
                    if (ValueText) {
                        const text2 = await ValueText.innerText();
                        console.log('\x1b[36m%s\x1b[0m', 'VatFunction Testing : ', text2);
                        console.log('\x1b[36m%s\x1b[0m', 'คำนวณราคาส่วนลดสินค้าที่ 2 20% แบบ ', text2);
                        VerifyVat();
                        //console.log('แสดงแบบแยกนอก')
                    }
                    await page.getByRole('combobox', { name: 'ภาษีแยกนอก' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-5-0').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice1').fill('1200');
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="ohdQty2"]').fill('10');
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice2').fill('700');
                    await page.waitForTimeout(delay);
                    await page.locator('#ohdPrice2').press('Enter');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'ลด/ชาร์จ' }).click();
                    await page.waitForTimeout(delay);
                    console.log('\x1b[36m%s\x1b[0m', 'ระบุส่วนลดท้ายบิล 130 บาท')
                    await page.getByRole('button', { name: 'เพิ่มส่วนลด/ชาร์จ' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ลดบาท' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-16-3').click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ชาร์ท %' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-16-0').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#otbPODisChgDataDocHDList > tbody > tr.xWPIDisChgTrTag > td:nth-child(7) > div > input').fill('130');        //<<<<<<<<<<<<<<<<<<<<<<< reset 0            
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'ตกลง' }).click();
                    await page.waitForTimeout(delay);
                    console.log('\x1b[36m%s\x1b[0m', '[518] ระบบ Run มาถึงขั้นตอนนี้ ซึ่งกลับไปตรวจสอบส่วนลดรายสินค้า และ ส่วนลดท้ายบิล จะพบว่ามีข้อมูลที่ทำการระุบไว้เพื่อการทดสอบก่อนหน้าแล้ว แต่ระบบไม่นำส่วนลดมาแสดงและคำนวณให้')
                    await page.pause();
                    if (ValueText) {
                        const text2 = await ValueText.innerText();
                        console.log('\x1b[36m%s\x1b[0m', 'VatFunction Testing : ', text2);
                        console.log('\x1b[36m%s\x1b[0m', 'คำนวณราคาส่วนลดท้ายบิล 100 บาทแบบ ', text2);
                        VerifyVat();
                        //console.log('แสดงแบบรวมใน')
                    }
                    await page.pause();
                    await page.waitForTimeout(2000);
                    await page.getByRole('combobox', { name: 'ภาษีรวมใน' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-5-1').click(); //เลือกแยกนอก
                    await page.waitForTimeout(delay);
                    if (ValueText) {
                        const text2 = await ValueText.innerText();
                        console.log('\x1b[36m%s\x1b[0m', 'VatFunction Testing : ', text2);
                        console.log('\x1b[36m%s\x1b[0m', 'คำนวณราคาส่วนลดท้ายบิล 100 บาทแบบ ', text2);
                        VerifyVat();
                        //console.log('แสดงแบบแยกนอก')
                    }
                    await page.getByRole('combobox', { name: 'ภาษีแยกนอก' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-5-0').click();
                    await page.waitForTimeout(delay);

                    // ---------------------


                }
                else {
                    //*** */

                    await page.getByRole('cell', { name: '+' }).getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เพิ่มส่วนลด/ชาร์จ' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ลดบาท' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-11-2').click();
                    await page.waitForTimeout(delay);
                    //await page.getByRole('row', { name: '1 0.00 0.00 0.00 ชาร์จบาท Remove' }).getByRole('textbox').fill('50');
                    await page.locator('#otbPODisChgDataDocDTList > tbody > tr.xWPIDisChgTrTag > td:nth-child(7) > div > input').fill('50');
                    await page.waitForTimeout(3000);
                    await page.getByRole('button', { name: 'ตกลง' }).click();
                    await page.waitForTimeout(3000);
                    await page.getByRole('button', { name: 'ลด/ชาร์จ' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เพิ่มส่วนลด/ชาร์จ' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ลดบาท' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-12-1').click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ลด %' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-12-0').click();
                    await page.waitForTimeout(3000);
                    //await page.getByRole('row', { name: '1 50.00 0.00 0.00 ลดบาท Remove' }).getByRole('textbox').fill('50');
                    await page.locator('#otbPODisChgDataDocHDList > tbody > tr.xWPIDisChgTrTag > td:nth-child(7) > div > input').fill('50');
                    await page.waitForTimeout(3000);
                    await page.getByRole('button', { name: 'ตกลง' }).click();
                    await page.waitForTimeout(3000);
                    await page.getByRole('button', { name: 'บันทึก' }).click();
                    await page.waitForTimeout(delay);
                    //await page.getByRole('button', { name: 'อนุมัติ' }).click();
                    //await page.waitForTimeout(delay);
                    //await page.getByRole('button', { name: 'ยืนยัน' }).click();
                    await page.locator('#oliPOTitle').click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill(OrderDoc);
                    await page.waitForTimeout(delay);
                    await page.locator('#obtPOSerchAllDocument').click();
                    await page.waitForTimeout(delay);
                    const xpath = '//*[@id="otrPurchaseInvoice0"]/td[3]';   //ดึงข้อมูลมาเก็บไว้ที่ elements1  //*[@id="otrSupplier"]/td
                    const elements1 = await page.$(xpath);
                    if (elements1) {
                        const text = await elements1.innerText();
                        console.log('เลขที่เอกสารสั่งซื้อ :', text);
                        await page.waitForTimeout(3000);
                    }
                }
            }


        }
        else {
            await page.waitForTimeout(3000);
            // ตรวจสอบสถานะเอกสารสั่งซื้อ
            const xpathdocsta = '//*[@id="otrPurchaseInvoice0"]/td[5]/label';   //ดึงข้อมูลสถานะเอกสารออกมา
            const vardocsta = await page.$(xpathdocsta);

            if (vardocsta) {
                const text = await vardocsta.innerText();
                console.log(text);
                const SelectDocStaApproveVerify = 'อนุมัติแล้ว';
                const SelectDocCancelApproveVerify = 'ยกเลิก';
                const SelectDocStaWaitVerify = 'รออนมุติ';
                //console.log('\x1b[32m%s\x1b[0m','Result ', text)
                if (text === SelectDocStaApproveVerify) {
                    const Docnumberxpath = '//*[@id="otrPurchaseInvoice0"]/td[3]';
                    const DocNum = await page.$(Docnumberxpath);
                    const DocStaxpath = '//*[@id="otrPurchaseInvoice0"]/td[5]/label';
                    const DocSta = await page.$(DocStaxpath);

                    if (DocNum && DocSta) {
                        const text = await DocNum.innerText();
                        const text2 = await DocSta.innerText();
                        console.log('ตรวจพบเลขที่เอกสารที่ :', text, ' สถานะเอกสาร : ', text2);
                        console.log('\x1b[32m%s\x1b[0m', 'ใบสั่งซื้อ : เอกสารได้ทำการอนุมัติแล้ว ไม่สามารถทำการลบได้ กรุณาเปลี่ยนเลขที่เอกสารเพื่อสร้างเอกสารใหม่')

                    }

                    //await page.pause();
                }
                else if (text === SelectDocCancelApproveVerify) {
                    //
                    const Docnumberxpath = '//*[@id="otrPurchaseInvoice0"]/td[3]';
                    const DocNum = await page.$(Docnumberxpath);
                    const DocStaxpath = '//*[@id="otrPurchaseInvoice0"]/td[5]/label';
                    const DocSta = await page.$(DocStaxpath);

                    if (DocNum && DocSta) {
                        const text = await DocNum.innerText();
                        const text2 = await DocSta.innerText();
                        console.log('ตรวจพบเลขที่เอกสารที่ :', text, ' สถานะเอกสาร : ', text2);
                        console.log('\x1b[31m%s\x1b[0m', 'ใบสั่งซื้อ : เอกสารใบนี้ถูกยกเลิกไปแล้ว ไม่สามารถทำการลบได้')

                    }

                }
                else if (text === SelectDocStaWaitVerify) {
                    //
                    const Docnumberxpath = '//*[@id="otrPurchaseInvoice0"]/td[3]';
                    const DocNum = await page.$(Docnumberxpath);
                    const DocStaxpath = '//*[@id="otrPurchaseInvoice0"]/td[5]/label';
                    const DocSta = await page.$(DocStaxpath);

                    if (DocNum && DocSta) {
                        const text = await DocNum.innerText();
                        const text2 = await DocSta.innerText();
                        console.log('ตรวจพบเลขที่เอกสารที่ :', text, ' สถานะเอกสาร : ', text2);
                        console.log('\x1b[36m%s\x1b[0m', 'เอกสารการสั่งซื้อรอการอนุมัติ');

                        //ทำการแก้ไข
                        //หรือ
                        //ทำการลบ    
                        console.log('ใบสั่งซื้อ : เอกสารยังไม่ได้ทำการอนุมัติ สามารถทำการลบใบสั่งซื้อได้')
                        await page.locator('#otrPurchaseInvoice0 > td:nth-child(8) > img').click();
                        await page.waitForTimeout(delay);
                        await page.getByRole('button', { name: 'ยืนยัน' }).click();
                        console.log('\x1b[32m%s\x1b[0m', 'ใบสั่งซื้อ : ทำการลบใบสั่งซื้อแล้วร้อยแล้ว')

                    }

                }


                else {
                    console.log('//------------------- Unknow --------------------');
                }
            }
        }
    }
    //-----------------------------------------------------------------------------------------------------------------------------------
    async function subFunctionVat() {

        const SelectVat = await page.$('#oulDataListVat > li > label.pull-right');
        const SelectsumVat = await page.$('#olbVatSum');
        if (SelectVat && SelectsumVat) {
            const text1 = await SelectVat.textContent();
            const text2 = await SelectsumVat.textContent();
            if (text1 === text2) {
                //console.log("ภาษีที่คำนวณได้ : ", text1 ,"  เท่ากับ ยอดรวมภาษีมูลค่าเพิ่ม : " , text2 , " Status Test : PASS" );
                console.log('\x1b[32m%s\x1b[0m', 'Result : PASS');
                console.log('\x1b[31m%s\x1b[0m', 'ระบบรีเซ็ตตัวเลขเป็น 0 ซึ่งไม่ถูกต้อง');
                console.log('ภาษีที่คำนวณได้ : ', text1, '  เท่ากับ ยอดรวมภาษีมูลค่าเพิ่ม : ', text2);
                console.log('//-----------------------------------------------');
                //console.log('\x1b[36m%s\x1b[0m', 'Hello ChatGPT'); // สีฟ้า
                //console.log('\x1b[32m%s\x1b[0m', 'Hello ChatGPT'); // สีเขียว
                //console.log('\x1b[31m%s\x1b[0m', 'Hello ChatGPT'); // สีแดง
            }
            else {
                //console.log("ภาษีที่คำนวณได้ : ", text1 ,"  ไม่เท่ากับ ยอดรวมภาษีมูลค่าเพิ่ม : " , text2 , " Status Test : FAIL");
                console.log('\x1b[31m%s\x1b[0m', 'Result : FAIL');
                console.log('ภาษีที่คำนวณได้ : ', text1, '  ไม่เท่ากับ ยอดรวมภาษีมูลค่าเพิ่ม : ', text2);
                console.log('//-----------------------------------------------');
            }
        }

    }
    //-----------------------------------------------------------------------------------------------------------------------------------
    async function GetVat() {
        const chkVat = '//*[@id="oulDataListVat"]/li/label[1]';
        const ReChkVat = await page.$(chkVat);
        const chkVat01 = '//*[@id="oulDataListVat"]/li/label[2]';
        const ReChkVat01 = await page.$(chkVat01);
        const chkVat02 = '//*[@id="olbVatSum"]';
        const ReChkVat02 = await page.$(chkVat02);
        const Price = '//*[@id="olbCalFCXphGrand"]';
        const PriceResult = await page.$(Price);
        const BeforePrice = '//*[@id="otrPdtPsz0"]';
        const PriceBefore = await page.$(BeforePrice);

        //-----------------------------------------------------------------------------------------------------------------------------------
        if (PriceBefore) {
            const text = await PriceBefore.innerText();
            console.log('ยอดก่อน  :', text);
        }
        //-----------------------------------------------------------------------------------------------------------------------------------
        if (ReChkVat) {
            const text = await ReChkVat.innerText();
            console.log('ภาษี  :', text);
        }
        //-----------------------------------------------------------------------------------------------------------------------------------        
        if (PriceResult) {
            const text = await PriceResult.innerText();
            console.log('ยอดรวมราคาทั้งหมด  :', text);
        }
        //-----------------------------------------------------------------------------------------------------------------------------------
        if (ReChkVat01) {
            const text = await ReChkVat01.innerText();
            console.log('ภาษีที่คำนวณได้  :', text);
        }
        //-----------------------------------------------------------------------------------------------------------------------------------

        if (ReChkVat02) {
            const text = await ReChkVat02.innerText();
            console.log('ยอดรวมภาษีมูลค่าเพิ่ม  :', text);
        }
        //-----------------------------------------------------------------------------------------------------------------------------------

    }
    async function CreateBuss() {
        await page.locator('#odvModalContent').getByRole('button', { name: '+' }).click();
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('ชื่อกลุ่มธุรกิจ').fill('PEPPER-RETAIL');
        await page.waitForTimeout(delay);
        await page.setInputFiles("input[type='file']", ["./Pictures/images.png"]);
        await page.waitForTimeout(3000);
        await page.getByRole('button', { name: 'ตกลง' }).click();
        await page.waitForTimeout(3000);
        await page.getByPlaceholder('รหัสอ้างอิงตัวแทนขาย').fill('00047');
        await page.waitForTimeout(delay);
        await page.locator('#obtMerPriceGroup').click();
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('กรอกคำค้นหา').fill('00006');
        await page.waitForTimeout(delay);
        await page.getByRole('button', { name: '' }).click();
        await page.waitForTimeout(delay);
        await page.getByRole('cell', { name: 'ราคาปกติ' }).click();
        await page.waitForTimeout(delay);
        await page.getByRole('button', { name: 'เลือก', exact: true }).click();
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('อีเมล').fill('GGTESTER@GMAIL.COM');
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('เบอร์โทรศัพท์').fill('-');
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('โทรสาร').fill('-');
        await page.waitForTimeout(delay);
        await page.getByPlaceholder('เบอร์มือถือ').fill('012345678');
        await page.waitForTimeout(delay);
        await page.locator('#otaMcnRemark').fill('AutomationTest');
        await page.waitForTimeout(delay);
        await page.locator('#odvPvnBtnGroup').getByRole('button', { name: 'บันทึก' }).click();
        await page.waitForTimeout(delay);

    }
    async function VerifyVat() {
        await page.waitForTimeout(delay);
        //console.log('') 
        //console.log('\x1b[36m%s\x1b[0m', 'ใบรับของ-ใบซื้อสินค้า/บริการ : ทดสอบการ Recal Vat โดยการเปลี่ยนราคาต่อหน่วย จากเดิม 600 เป็น 1000')
        const BeforePrice = '//*[@id="olbSumFCXtdNetAfHD"]';   //ยอดรวมหลัง ลด/ชาร์จ
        const PriceBefore = await page.$(BeforePrice);
        if (PriceBefore) {
            const Price = await PriceBefore.innerText();  //เก็บค่ายอดรวมหลัง ลด/ชาร์จ
            const PriceAsNumber: number = parseFloat(Price.replace(",", "")); //เก็บค่ายอดรวมหลัง ลด/ชาร์จ แปลงเป็นชนิด Double
            const chkVat01 = '//*[@id="oulDataListVat"]/li/label[1]';   //Left - ภาษี 7% Left
            const ReChkVat01 = await page.$(chkVat01);
            //const sumVatAmount = '//*[@id="olbPICalFCXphGrand"]'; //จำนวนเงินรวมทั้งสิ้น //*[@id="olbPICalFCXphGrand"]
            //const TotalVatAmount = await page.$(sumVatAmount);
            if (ReChkVat01) {
                const textVat = await ReChkVat01.innerText();
                //const FinalVatAmount = await TotalVatAmount.innerText();
                const percentageString: string = textVat;
                const percentage: number = parseFloat(percentageString.replace("%", ""));
                function calculateTotalAmountIncludeVat(price: number): number {
                    const vatAmount: number = priceIncludeVat - ((priceIncludeVat) * 100) / (100 + percentage);
                    //const totalAmount: number = p0 + vatAmount;
                    const totalAmount: number = vatAmount;
                    return totalAmount;
                }

                function calculateTotalAmountExcludeVat(price: number): number {
                    const vatAmount: number = ((priceIncludeVat) * (100 + percentage) / 100) - priceIncludeVat;
                    //const totalAmount: number = p1 + vatAmount;
                    const totalAmount: number = vatAmount;
                    return totalAmount;
                }

                const priceIncludeVat: number = PriceAsNumber; //<<< Set ค่าจากบรรทัด 486 เพื่อจะนำไปคำนวณภาษีใน Function                   
                const totalAmountIncludeVat: number = calculateTotalAmountIncludeVat(priceIncludeVat); //<<< ส่งค่ายอดรวมหลัง ลด/ชาร์จ หลังแปลงเป็นชนิด Double ไปคำนวณใน Function ภาษีรวมใน
                const totalAmountExcludeVat: number = calculateTotalAmountExcludeVat(priceIncludeVat); //<<< ส่งค่ายอดรวมหลัง ลด/ชาร์จ หลังแปลงเป็นชนิด Double ไปคำนวณใน Function ภาษีรแยกนอก

                //console.log('ทดสอบ PriceAsNumber :', PriceAsNumber );
                console.log('\x1b[32m%s\x1b[0m', 'ยอดรวมหลังลด/ชาร์จ :', Price, ' ภาษี ', textVat);
                //console.log(`Total amount (include VAT): ${totalAmountIncludeVat.toFixed(2)}`);
                //console.log(`Total amount (exclude VAT): ${totalAmountExcludeVat.toFixed(2)}`);
                //.toFixed(2)

                const SelectsumVat = await page.$('#olbVatSum');    //ยอดรวมภาษีมูลค่าเพิ่ม Left
                if (SelectsumVat) {

                    const text1 = await SelectsumVat.textContent();
                    //-------------------------------------------------------------------------------------------------------
                    await page.waitForTimeout(2000);
                    const expecIncludetVat = totalAmountIncludeVat.toFixed(2);
                    const expecExcludetVat = totalAmountExcludeVat.toFixed(2);

                    const C: number = PriceAsNumber;
                    const C1 = C.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show  600
                    const D: number = parseFloat(expecIncludetVat.replace(",", ""));
                    const D1 = D.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show  39.25

                    const IncludeTotal: number = (C - D); //<<< Value 600-39.25= 560.75
                    const BeforeIncludeTotal = IncludeTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show 600-39.25 = 560.75

                    const ExpeIncludeTotal: number = (IncludeTotal + D); //<<< Value 560.75+39.25
                    const ExpectIncludeTotal = ExpeIncludeTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show 560.75+39.25 = 600.00


                    const A: number = PriceAsNumber; //Value 600
                    const A1 = A.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show 600
                    const B: number = parseFloat(expecExcludetVat.replace(",", ""));//Value 42
                    const B1 = B.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show 42.00

                    const ExcludeTotal: number = (A + B); //Value 600+42
                    const ExpectExcludeTotal = ExcludeTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show 642.00
                    //-------------------------------------------------------------------------------------------------------



                    //Include
                    if (text1 === expecIncludetVat) {
                        // console.log('\x1b[32m%s\x1b[0m','[P]');
                        // console.log('\x1b[36m%s\x1b[0m','[include VAT]');
                        // console.log('ภาษีที่ระบบคำนวณได้ : ', text1);
                        // console.log('ภาษีที่ควรได้ : ', expecIncludetVat);
                        // console.log('ราคาก่อนคิดภาษี : ',BeforeIncludeTotal);
                        // console.log('จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectIncludeTotal);
                        console.log('\x1b[32m%s\x1b[0m', '[P]', '[include VAT] ภาษีที่ระบบคำนวณได้ : ', text1, '  ภาษีที่ควรได้ : ', expecIncludetVat, ' ราคาก่อนคิดภาษี : ', BeforeIncludeTotal, ' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ', ExpectIncludeTotal);
                        //console.log('\x1b[32m%s\x1b[0m','[P]','[include VAT] ภาษีที่ระบบคำนวณได้ : ', text1 , '  ภาษีที่ควรได้ : ', expecIncludetVat ,' ราคาก่อนคิดภาษี : ',C,'-',D,'=',BeforeIncludeTotal, ' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectIncludeTotal);
                        console.log('//-----------------------------------');
                    }
                    else {
                        // console.log('\x1b[31m%s\x1b[0m','[F]');
                        // console.log('\x1b[36m%s\x1b[0m','[include VAT]');
                        // console.log('ภาษีที่ระบบคำนวณได้ : ', text1);
                        // console.log('ภาษีที่ควรได้ : ', expecIncludetVat);
                        // console.log('ราคาก่อนคิดภาษี : ',BeforeIncludeTotal);
                        // console.log('จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectIncludeTotal);     
                        console.log('\x1b[31m%s\x1b[0m', '[F]', '[include VAT] ภาษีที่ระบบคำนวณได้ : ', text1, '  ภาษีที่ควรได้ : ', expecIncludetVat, ' ราคาก่อนคิดภาษี : ', BeforeIncludeTotal, ' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ', ExpectIncludeTotal);
                        //console.log('\x1b[31m%s\x1b[0m','[F]','[include VAT] ภาษีที่ระบบคำนวณได้ : ', text1 , '  ภาษีที่ควรได้ : ', expecIncludetVat ,' ราคาก่อนคิดภาษี : ',C,'-',D,'=',BeforeIncludeTotal, ' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectIncludeTotal);
                        console.log('//-----------------------------------');

                    }
                    //Exclude
                    if (text1 === expecExcludetVat) {
                        // console.log('\x1b[32m%s\x1b[0m','[P]');
                        // console.log('\x1b[36m%s\x1b[0m','[Exclude VAT]');
                        // console.log('ภาษีที่ระบบคำนวณได้ : ', text1);
                        // console.log('ภาษีที่ควรได้ : ', expecExcludetVat);
                        // console.log('ราคาก่อนคิดภาษี : ',A1);
                        // console.log('จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectExcludeTotal);
                        console.log('\x1b[32m%s\x1b[0m', '[P]', '[Exclude VAT] ภาษีที่ระบบคำนวณได้ : ', text1, '  ภาษีที่ควรได้ : ', expecExcludetVat, ' ราคาก่อนคิดภาษี : ', A1, ' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ', ExpectExcludeTotal);
                        //console.log('\x1b[32m%s\x1b[0m','[P]','[Exclude VAT] ภาษีที่ระบบคำนวณได้ : ', text1 , '  ภาษีที่ควรได้ : ', expecExcludetVat ,' ราคาก่อนคิดภาษี : ',A,' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',A,'+',B,'=',ExpectExcludeTotal );
                        console.log('//-----------------------------------');
                    }
                    else {
                        // console.log('\x1b[31m%s\x1b[0m','[F]');
                        // console.log('\x1b[36m%s\x1b[0m','[Exclude VAT]');
                        // console.log('ภาษีที่ระบบคำนวณได้ : ', text1);
                        // console.log('ภาษีที่ควรได้ : ', expecExcludetVat);
                        // console.log('ราคาก่อนคิดภาษี : ',A1);
                        // console.log('จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectExcludeTotal);
                        console.log('\x1b[31m%s\x1b[0m', '[F]', '[Exclude VAT] ภาษีที่ระบบคำนวณได้ : ', text1, '  ภาษีที่ควรได้ : ', expecExcludetVat, ' ราคาก่อนคิดภาษี : ', A1, ' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ', ExpectExcludeTotal);
                        //console.log('\x1b[31m%s\x1b[0m','[F]','[Exclude VAT] ภาษีที่ระบบคำนวณได้ : ', text1 , '  ภาษีที่ควรได้ : ', expecExcludetVat ,' ราคาก่อนคิดภาษี : ',A,' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',A,'+',B,'=',ExpectExcludeTotal );
                        console.log('//-----------------------------------');

                    }



                }

            }
        }
        console.log('')

    }


});