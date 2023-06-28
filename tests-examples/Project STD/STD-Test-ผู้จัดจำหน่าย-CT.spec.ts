import { test, expect, chromium } from '@playwright/test';
import { Client } from 'pg';

test('test', async ({ page }) => 
{
    const browser = await chromium.launch();
    const delay = 1000;
    await page.waitForTimeout(delay);
    await chromium.launch({headless: false, slowMo: 1000})
    const productid = 'PP0004X'
    const productname = 'PEP-TEST04'
    test.setTimeout(5000000);
    await test.slow();
    // Get screen dimensions manually
    const { width, height } = {
        width: 1280,
        height: 900,
    };
    // Set viewport size to screen dimensions
    await page.setViewportSize({ width, height });
    await page.goto('https://sit.ada-soft.com/AdaStorebackSTD/login');
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
    await expect(page.locator("#spnCompanyName")).toHaveText('Adasoft');  //VerifyText
    await page.waitForTimeout(3000);
    //});
    //เมนูผู้จัดจำหน่าย
    await page.getByTitle('การซื้อ').click();
    await page.getByRole('link', { name: ' ผู้จำหน่าย' }).click();
    await page.locator('#APAP a').click();
    await page.getByPlaceholder('ค้นหา').click();
    await page.getByPlaceholder('ค้นหา').fill('Olympic');
    await page.locator('#oimSearchSupplier').click();
    await page.waitForTimeout(delay);
    //ค้นหา Vendor
    console.log('ผู้จัดจำหน่าย : ค้นหาผู้จัดจำหน่าย')
    const FindVendor = await page.$('#otbSplDataList > tbody > tr > td'); //------------------------------------------------------
    if (FindVendor) 
    {
        // Get the text content of the element
        const text = await FindVendor.textContent();
        // Compare the text content
        const expectedText = 'ไม่พบข้อมูล';
        if (text === expectedText) 
        {
            console.log('ผู้จัดจำหน่าย : ไม่พบข้อมูลผู้จัดจำหน่าย ทำการสร้างข้อมูลใหม่')
            console.log('ผู้จัดจำหน่าย : ข้อมูลทั่วไป1')
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '+' }).click();
            await page.waitForTimeout(delay);
            await page.setInputFiles("input[type='file']",["./Pictures/002.jpg"]);
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: 'ตกลง' }).click();
            await page.waitForTimeout(delay);
            await page.getByText('สร้างอัตโนมัติ').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('รหัสผู้จำหน่าย').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('รหัสผู้จำหน่าย').fill('OLM-A1');
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('ชื่อผู้จำหน่าย').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('ชื่อผู้จำหน่าย').fill('Olympic');
            await page.waitForTimeout(2000);
            const buttonSelector = '#obtSplBrowseAgency'; 
            await page.click(buttonSelector);
            await page.click(buttonSelector);
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('กรอกคำค้นหา').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('กรอกคำค้นหา').fill('Pepper I');
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('cell', { name: 'Pepper Industry' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: 'เลือก', exact: true }).click();
            await page.waitForTimeout(delay);
            await page.locator('#obtSplDob').click();
            await page.waitForTimeout(delay);
            await page.getByRole('cell', { name: 'June 2023' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('cell', { name: '«' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('cell', { name: '«' }).click({
            clickCount: 6
            });
            await page.waitForTimeout(delay);
            await page.getByRole('cell', { name: '«' }).click({
            clickCount: 3
            });
            await page.waitForTimeout(delay);
            await page.getByText('Dec').click();
            await page.waitForTimeout(delay);
            await page.getByRole('cell', { name: '31' }).click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('โทรศัพท์').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('โทรศัพท์').fill('0981234567');
            await page.waitForTimeout(delay);
            await page.locator('#oemtSplEmail').click();
            await page.waitForTimeout(delay);
            await page.locator('#oemtSplEmail').fill('peptester@adasofi.com');
            await page.waitForTimeout(delay);
            await page.getByText('สำนักงานใหญ่').click();
            await page.waitForTimeout(delay);
            await page.getByRole('combobox', { name: '7.00 %' }).click();
            await page.waitForTimeout(delay);
            await page.locator('#bs-select-2-0').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('ผู้รับผิดชอบ').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('ผู้รับผิดชอบ').fill('AdaminTester');
            await page.waitForTimeout(delay);
            await page.locator('#oetSplRmk').click();
            await page.waitForTimeout(delay);
            await page.locator('#oetSplRmk').fill('Automation');
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: 'บันทึก' }).click();
            await page.waitForTimeout(delay);
            console.log('ผู้จัดจำหน่าย : จบการสร้าง ข้อมูลทั่วไป1')
            //--------------------------------------------------------------------------------------------------------------------------------------------------------
            console.log('ผู้จัดจำหน่าย : ข้อมูลทั่วไป2')
            await page.waitForTimeout(delay);
            await page.getByRole('tab', { name: 'ข้อมูลทั่วไป 2' }).click();
            await page.waitForTimeout(delay);
            console.log('ข้อมูลทั่วไป2 : ค้นหาข้อมูลผู้จำหน่าย กลุ่ม')
            await page.locator('#obtBrowseSgp').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('กรอกคำค้นหา').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('กรอกคำค้นหา').fill('Pep-Vendor');
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            const VendorGroup = await page.$('#otbBrowserList > tbody > tr > td');
            if (VendorGroup) 
            {
                const text = await VendorGroup.textContent();
                const expectedText = 'ไม่พบข้อมูล';
                if (text === expectedText) 
                {
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ชื่อกลุ่มผู้จำหน่าย').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ชื่อกลุ่มผู้จำหน่าย').fill('Pep-Vendor');
                    await page.waitForTimeout(delay);
                    await page.locator('#otaSgpRmk').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#otaSgpRmk').fill('Automation');
                    await page.waitForTimeout(delay);
                    await page.locator('#otaSgpRmk').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#odvPunBtnGroup').getByRole('button', { name: 'บันทึก' }).click();
                    await page.waitForTimeout(3000);
                    await page.getByPlaceholder('กรอกคำค้นหา').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').fill('Pep-Vendor');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: '' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: '00001' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();   //*******************
                    await page.waitForTimeout(delay);
                
                 }
                else
                {
                    
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: '00001' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click(); //**********************/
                }
                console.log('\x1b[32m%s\x1b[0m', 'ข้อมูลทั่วไป2 : เลือกผู้จำหน่าย กลุ่ม แล้ว')
            }
            //ผู้จัดจำหน่าย : ประเภท
            console.log('ข้อมูลทั่วไป2 : เลือกผู้จำหน่าย ประเภท')
            await page.waitForTimeout(delay);
            await page.locator('#obtBrowseSty').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('กรอกคำค้นหา').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('กรอกคำค้นหา').fill('IC-pep');
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '' }).click(); //************************* */
            await page.waitForTimeout(delay);
            const VendorType = await page.$('#otbBrowserList > tbody > tr > td');
            if (VendorType) 
            {
                const text = await VendorType.textContent();
                const expectedText = 'ไม่พบข้อมูล';
                if (text === expectedText) 
                {
                    await page.getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ชื่อประเภทผู้จำหน่าย').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ชื่อประเภทผู้จำหน่าย').fill('IC-pep');
                    await page.waitForTimeout(delay);
                    await page.locator('#otaStyRmk').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#otaStyRmk').fill('Automation');
                    await page.waitForTimeout(delay);
                    await page.locator('#odvPunBtnGroup').getByRole('button', { name: 'บันทึก' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').fill('IC-pep');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: '' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: 'IC-pep' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    await page.waitForTimeout(delay);
                }
                else
                {
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: 'IC-pep' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    
                }
                await page.waitForTimeout(delay);
                console.log('\x1b[32m%s\x1b[0m', 'ข้อมูลทั่วไป2 : เลือกผู้จำหน่าย ประเภท แล้ว')
            }
            //ระดับผู้จัดจำหน่าย
            console.log('ข้อมูลทั่วไป2 : เลือกผู้จำหน่าย ระดับ')
            await page.waitForTimeout(delay);
            await page.locator('#obtBrowseSlv').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('กรอกคำค้นหา').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('กรอกคำค้นหา').fill('IC-Admin');
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '' }).click(); //************************** */
            await page.waitForTimeout(delay);
            const VendorLv = await page.$('#otbBrowserList > tbody > tr > td'); 
            await page.waitForTimeout(delay);
            if (VendorLv) 
            {
                const text = await VendorLv.textContent();
                const expectedText = 'ไม่พบข้อมูล';
                if (text === expectedText) 
                {
                    await page.getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ชื่อระดับผู้จำหน่าย').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ชื่อระดับผู้จำหน่าย').fill('IC-Admin');
                    await page.waitForTimeout(delay);
                    await page.locator('#otaSlvRmk').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#otaSlvRmk').fill('Automation');
                    await page.waitForTimeout(delay);
                    await page.locator('#odvPunBtnGroup').getByRole('button', { name: 'บันทึก' }).click();
                    await page.waitForTimeout(3000);
                    await page.getByPlaceholder('กรอกคำค้นหา').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').fill('IC-Admin');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: '' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: 'IC-Admin' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    await page.waitForTimeout(delay);
                  
                }
                else
                {
                        
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: 'IC-Admin' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                }
                await page.waitForTimeout(delay);
                console.log('\x1b[32m%s\x1b[0m', 'ข้อมูลทั่วไป2 : เลือกผู้จำหน่าย ระดับ แล้ว')
            }
            //จำนวนวันให้เครติด
            console.log('ข้อมูลทั่วไป2 : จำนวนวันให้เครดิต')
            await page.locator('#oetDateCredit').click();
            await page.waitForTimeout(delay);
            await page.locator('#oetDateCredit').fill('365');
            await page.waitForTimeout(delay);
            console.log('\x1b[32m%s\x1b[0m', 'ข้อมูลทั่วไป2 : ระบุจำนวนวันให้เครดิตแล้ว')
            //วงเงินเครดิต
            console.log('ข้อมูลทั่วไป2 : วงเงินเครดิต')
            await page.locator('#oetCredit').click();
            await page.waitForTimeout(delay);
            await page.locator('#oetCredit').fill('9000000.00');
            await page.waitForTimeout(delay);
            console.log('\x1b[32m%s\x1b[0m', 'ข้อมูลทั่วไป2 : กำหนดวงเงินเครดิตแล้ว')
            await page.getByRole('button', { name: 'บันทึก' }).click();  //************************ */
            await page.waitForTimeout(3000);

            //ข้อมูลผู้ติดต่อ
            console.log('ผู้จัดจำหน่าย : ข้อมูลผู้ติดต่อ');
            await page.waitForTimeout(delay);
            await page.getByRole('tab', { name: 'ข้อมูลผู้ติดต่อ' }).click();
            console.log('ข้อมูลผู้ติดต่อ : ตรวจสอบข้อมูลในระบบ')
            await page.waitForTimeout(3000);

            const xpath = '//*[@id="otrSupplier"]/td';   //ดึงข้อมูลมาเก็บไว้ที่ elements1  //*[@id="otrSupplier"]/td
            const elements1 = await page.$(xpath);
          
            // Get the inner text of the element
            if (elements1) {
              const text = await elements1.innerText();
              console.log('ข้อมูลผู้ติดต่อ ที่แสดง :', text);
            }

            const AddressContact = await page.$('#otrSupplier > td'); 
            if (AddressContact) 
            {
                const text = await AddressContact.textContent();
                //const expectedText = 'ไม่พบข้อมูลผู้ติดต่อ';   //<<< ข้อมูลที่ถูกต้อง
                const expectedText = 'ไม่พบข้อมูลที่อยู่';
                if (text === expectedText) 
                {
                    console.log('ข้อมูลผู้ติดต่อ : ไม่พบข้อมูลผู้ติดต่อ เริ่มทำการสร้างข้อมูลผู้ติดต่อ')
                    await page.getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetCtrAddName').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetCtrAddName').fill('Pepper Industry co.,ltd.');
                    await page.waitForTimeout(delay);
                    await page.locator('#oetCtrAddEmail').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetCtrAddEmail').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetCtrAddEmail').fill('A011@gmail.com');
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetCtrAddTel"]').click();
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetCtrAddTel"]').fill('0896631234');
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetCtrAddFax"]').fill('023456789');
                    await page.waitForTimeout(delay);
                    await page.locator('#oetCtrAddNote').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetCtrAddNote').fill('Automation');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'บันทึก' }).click();
                    await page.waitForTimeout(3000);   
                    console.log('\x1b[32m%s\x1b[0m', 'ข้อมูลผู้ติดต่อ : ทำการสร้างข้อมูลผู้ติดต่อเรียบร้อยแล้ว') 
                }
                else
                {
                    console.log('ข้อมูลผู้ติดต่อ : พบข้อมูลผู้ติดต่อ เริ่มทำการลบข้อมูลเดิมและสร้างใหม่')
                    await page.getByRole('row', { name: '1 Pepper Industry co.,ltd. A011@gmail.com 0896631234 023456789' }).getByRole('img').first().click(); //**************** */
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'ยืนยัน' }).click();
                    await page.waitForTimeout(delay);
                    console.log('\x1b[32m%s\x1b[0m', 'ข้อมูลผู้ติดต่อ : ลบข้อมูลผู้ติดต่อเดิมแล้ว')
                    console.log('ข้อมูลผู้ติดต่อ : เริ่มทำการสร้างข้อมูลผู้ติดต่อ')
                    await page.getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetCtrAddName').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetCtrAddName').fill('Pepper Industry co.,ltd.');
                    await page.waitForTimeout(delay);
                    await page.locator('#oetCtrAddEmail').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetCtrAddEmail').fill('A011@gmail.com');
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetCtrAddTel"]').fill('0896631234');
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetCtrAddFax"]').fill('023456789');
                    await page.waitForTimeout(delay);
                    await page.locator('#oetCtrAddNote').fill('Automation');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'บันทึก' }).click();
                    await page.waitForTimeout(delay);
                    console.log('ข้อมูลผู้ติดต่อ : ทำการสร้างข้อมูลผู้ติดต่อเรียบร้อยแล้ว')
                }
            }
            // ที่อยู่
            console.log('ผู้จัดจำหน่าย : ที่อยู่')
            await page.getByRole('tab', { name: 'ที่อยู่' }).click();
            await page.waitForTimeout(delay);
            console.log('ที่อยู่ : ตรวจสอบข้อมูลที่อยู่')

            const xpath2 = '//*[@id="otrSupplier"]/td';   //ดึงข้อมูลมาเก็บไว้ที่ elements2  //*[@id="otrSupplier"]/td
            const elements2 = await page.$(xpath2);
          
            // Get the inner text of the element
            if (elements2) {
              const text = await elements2.innerText();
              console.log('ข้อมูลที่อยู่ ที่แสดง :', text);
            }

            const AddressSupplier = await page.$('#otrSupplier > td'); 
            if (AddressSupplier) 
            {
                const text = await AddressSupplier.textContent();
                const expectedText = 'ไม่พบข้อมูลที่อยู่';
                if (text === expectedText) 
                {
                    console.log('ที่อยู่ : ไม่พบข้อมูลผู้ติดต่อ เริ่มทำการสร้างข้อมูลที่อยู่')
                    await page.getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddName').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddName').fill('99/99 ');
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddName').click();
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetSplAddRefNo"]').click();
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetSplAddRefNo"]').fill('A-PEPPER-0001');
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ที่อยู่ผู้จำหน่าย' }).click();  //************************ */
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-5-2').click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ที่อยู่สำหรับจัดส่ง' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-5-0').click();
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetSplAddTaxNo"]').click();
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetSplAddTaxNo"]').fill('212-224-236-248');
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ประเทศ').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ประเทศ').fill('ไทย');
                    await page.waitForTimeout(delay);
                    await page.locator('#obtSplBrowseProvince').click();
                    await page.waitForTimeout(delay);
                    console.log('ที่อยู่ : ค้นหาจังหวัด')
                    await page.getByPlaceholder('กรอกคำค้นหา').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').fill('เชียงใหม่');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: '' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: 'จ. เชียงใหม่' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    await page.waitForTimeout(delay);
                    console.log('\x1b[32m%s\x1b[0m', 'ที่อยู่ : เลือกจังหวัดแล้ว')
                    console.log('ที่อยู่ : ค้นหาอำเภอ / เขต')
                    await page.locator('#obtSplBrowseDistrict').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').fill('เชียงใหม่');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: '' }).click(); //************************* */
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: 'อ. เมืองเชียงใหม่' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    await page.waitForTimeout(delay);
                    console.log('ที่อยู่ : เลือกหาอำเภอ / เขตแล้ว')
                    console.log('ที่อยู่ : ค้นหาตำบล / แขวง')
                    await page.locator('#obtSplBrowseSubDistrict').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').fill('เชียงใหม่');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: '' }).click(); //****************************** */
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: 'ต. เชียงใหม่' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    await page.waitForTimeout(delay);
                    console.log('\x1b[32m%s\x1b[0m', 'ที่อยู่ : เลือกหาตำบล / แขวงแล้ว')
                    await page.getByPlaceholder('บ้านเลขที่').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('บ้านเลขที่').fill('99/999');
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('หมู่บ้าน').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('หมู่บ้าน').fill('HomeLux');
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ถนน').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ถนน').fill('วงแหวนรอบ 2');
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ซอย').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ซอย').fill('นิมมาน 13');
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('รหัสไปรษณีย์').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('รหัสไปรษณีย์').fill('50000');
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetSplAddWeb"]').click();
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetSplAddWeb"]').fill('-');
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddNote').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddNote').fill('TestWrongWord');
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddNote').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddNote').fill('Automation');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'บันทึก' }).click();
                    await page.waitForTimeout(3000);
                    console.log('\x1b[32m%s\x1b[0m', 'ที่อยู่ : ทำการสร้างข้อมูลที่อยู่เรียบร้อยแล้ว')
                    await page.locator('#oliSplTitle').click();
                    await page.waitForTimeout(delay);
                    const VDname = '//*[@id="otrSupplier0"]/td[3]';   //ดึงข้อมูลมาเก็บไว้ที่ elements1  //*[@id="otrSupplier"]/td
                    const VDTagName = await page.$(VDname);
              
                    // Get the inner text of the element
                    if (VDTagName) {
                        const text = await VDTagName.innerText();
                        console.log('\x1b[32m%s\x1b[0m', 'ตรวจสอบข้อมูลผู้จำหน่ายที่สร้างแล้ว แสดงข้อมูล :', text);
                        await page.waitForTimeout(5000);
                    }
                }
                else
                {
                    //#osmConfirm
                    console.log('ที่อยู่ : พบข้อมูลผู้ติดต่อ ทำการลบข้อมูลที่อยู่เดิม')
                    await page.locator('#osmConfirm').click();
                    await page.getByRole('row', { name: '1 99/99 Automation' }).getByRole('img').first().click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'ยืนยัน' }).click();
                    await page.waitForTimeout(delay);
                    console.log('\x1b[32m%s\x1b[0m', 'ที่อยู่ : ทำการลบข้อมูลที่อยู่เดิมเรียบร้อยแล้ว')
                    console.log('ที่อยู่ : เริ่มทำการสร้างข้อมูลที่อยู่')
                    await page.getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddName').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddName').fill('99/99 ');
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddName').click();
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetSplAddRefNo"]').click();
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetSplAddRefNo"]').fill('A-PEPPER-0001');
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ที่อยู่ผู้จำหน่าย' }).click();  //************************ */
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-5-2').click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ที่อยู่สำหรับจัดส่ง' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-5-0').click();
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetSplAddTaxNo"]').click();
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetSplAddTaxNo"]').fill('212-224-236-248');
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ประเทศ').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ประเทศ').fill('ไทย');
                    await page.waitForTimeout(delay);
                    await page.locator('#obtSplBrowseProvince').click();
                    await page.waitForTimeout(delay);
                    console.log('ที่อยู่ : ค้นหาจังหวัด')
                    await page.getByPlaceholder('กรอกคำค้นหา').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').fill('เชียงใหม่');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: '' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: 'จ. เชียงใหม่' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    await page.waitForTimeout(delay);
                    console.log('\x1b[32m%s\x1b[0m', 'ที่อยู่ : เลือกจังหวัดแล้ว')
                    console.log('ที่อยู่ : ค้นหาอำเภอ / เขต')
                    await page.locator('#obtSplBrowseDistrict').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').fill('เชียงใหม่');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: '' }).click(); //************************* */
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: 'อ. เมืองเชียงใหม่' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    await page.waitForTimeout(delay);
                    console.log('\x1b[32m%s\x1b[0m', 'ที่อยู่ : เลือกหาอำเภอ / เขตแล้ว')
                    console.log('ที่อยู่ : ค้นหาตำบล / แขวง')
                    await page.locator('#obtSplBrowseSubDistrict').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('กรอกคำค้นหา').fill('เชียงใหม่');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: '' }).click(); //****************************** */
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: 'ต. เชียงใหม่' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    await page.waitForTimeout(delay);
                    console.log('\x1b[32m%s\x1b[0m', 'ที่อยู่ : เลือกหาตำบล / แขวงแล้ว')
                    await page.getByPlaceholder('บ้านเลขที่').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('บ้านเลขที่').fill('99/999');
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('หมู่บ้าน').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('หมู่บ้าน').fill('HomeLux');
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ถนน').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ถนน').fill('วงแหวนรอบ 2');
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ซอย').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ซอย').fill('นิมมาน 13');
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('รหัสไปรษณีย์').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('รหัสไปรษณีย์').fill('50000');
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetSplAddWeb"]').click();
                    await page.waitForTimeout(delay);
                    await page.locator('input[name="oetSplAddWeb"]').fill('-');
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddNote').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddNote').fill('TestWrongWord');
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddNote').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplAddNote').fill('Automation');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'บันทึก' }).click();
                    await page.waitForTimeout(3000);
                    console.log('\x1b[32m%s\x1b[0m', 'ที่อยู่ : ทำการสร้างข้อมูลที่อยู่เรียบร้อยแล้ว')
                    await page.locator('#oliSplTitle').click();
                    const VDname = '//*[@id="otrSupplier0"]/td[3]';   //ดึงข้อมูลมาเก็บไว้ที่ elements1  //*[@id="otrSupplier"]/td
                    const VDTagName = await page.$(VDname);
              
                    // Get the inner text of the element
                    if (VDTagName) {
                        const text = await VDTagName.innerText();
                        console.log('\x1b[32m%s\x1b[0m', 'ตรวจสอบข้อมูลผู้จำหน่ายที่สร้างแล้ว แสดงข้อมูล :', text);
                        await page.waitForTimeout(5000);
                    }
                }
                
            }

        } 
        else
        {
            console.log('ผู้จัดจำหน่าย : ตรวจสอบข้อมูลผู้จัดจำหน่าย')
            await page.locator('#oliSplTitle').click();
            await page.waitForTimeout(delay);
            const ChkmyVendor = await page.$('#otrSupplier0 > td:nth-child(4)'); 
            if (ChkmyVendor) 
            {
                // Get the text content of the element
                const text = await ChkmyVendor.textContent();
                // Compare the text content
                const expectedText = 'Olympic';
                if (text === expectedText) 
                {
                    console.log('ผู้จัดจำหน่าย : พบข้อมูลผู้จัดจำหน่าย ทำการแก้ไขช้อมูลบางส่วน')
                    await page.locator('#otrSupplier0 > td:nth-child(8) > img').click();
                    await page.waitForTimeout(delay);
                    // await page.getByRole('row', { name: 'OLM-A1 Olympic 0981234567 peptester@adasofi.com' }).getByRole('img').nth(2).click();
                    await page.setInputFiles("input[type='file']",["./Pictures/001.jpg"]);
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'ตกลง' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oenSplDiscBillNet').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oenSplDiscBillNet').fill('20');
                    await page.waitForTimeout(delay);
                    await page.locator('span').filter({ hasText: 'นิติบุคคล' }).locator('i').click();
                    await page.waitForTimeout(delay);
                    await page.locator('span').filter({ hasText: 'ภาษีแยกนอก' }).locator('i').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ผู้รับผิดชอบ').click();
                    await page.waitForTimeout(delay);
                    await page.getByPlaceholder('ผู้รับผิดชอบ').fill('AdaminTester-A2');
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplRmk').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetSplRmk').fill('Automation Edit');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'บันทึก' }).click();
                    await page.waitForTimeout(5000);
                    await page.locator('#oliSplTitle').click();
                    console.log('ผู้จัดจำหน่าย : ทำการแก้ไขช้อมูลบางส่วนเรียบร้อย')
                    
                    
                    console.log('ผู้จัดจำหน่าย : ทดสอบการลบข้อมูล')
                    await page.waitForTimeout(delay);
                    await page.locator('#otrSupplier0 > td:nth-child(7) > img').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#osmConfirm').click();
                    await page.waitForTimeout(delay);
                    console.log('\x1b[32m%s\x1b[0m', 'ผู้จัดจำหน่าย : ทำการลบข้อมูลผู้จัดจำหน่ายเรียบร้อยแล้ว')
                }
        
            }
        }
    }
});