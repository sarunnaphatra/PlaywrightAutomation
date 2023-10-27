//ตรวจสอบเอกสารสั่งซื้อ ว่ามีการอนุมัติหรือยัง ถ้ายัง ไม่สามารถทำการรับได้ ต้องไปอนุมัติเอกสารก่อน
import { test, expect, chromium } from '@playwright/test';
import { evaluateXPathToBoolean } from 'fontoxpath';
import { evaluateXPathToString } from 'fontoxpath';
import { Client } from 'pg';


test('test', async ({ page }) => 
{
    const browser = await chromium.launch();
    const delay = 1000;
    //await page.waitForTimeout(delay);
    await chromium.launch({headless: false, slowMo: 1000})
    //System STD
    const pageUrl = 'https://sit.ada-soft.com/AdaStorebackSTD/login'
    const username = '008'
    const password = '12345678'
    const HeadName ='Adasoft'
 
    //บ้านไฟฟ้า 
    //const pageUrl = 'https://sit.ada-soft.com/AdaBanfaifa/login'
    //const username = '009'
    //const password = '12345678'
    //const HeadName ='Adasoft'
 

    //Verify Data
    const expectedText = 'ไม่พบข้อมูล';


    //Function Data
    const Mshop ='PEPPER POSEIDON'
    const productBuyDoc = 'A00001-PEPPER'
    const productname = 'PEP-TEST04'
    const InDoc = 'PC0004723000003'  // ทดสอบเอกสารแบบ สร้างแล้วลบเลย เปิดใช้งานตรงนี้ PC000472300000X X<> 1/2
    //const Doc = 'PC0004723000002'  // ทดสอบเอกสารที่อนุมัติแล้ว เปิดใช้ตรงนี้
    //const Doc = 'PC0004723000001'  // ทดสอบเอกสารที่ยกเลิกแล้ว เปิดใช้ตรงนี้
    
    test.setTimeout(5000000);
    await test.slow();
    // Get screen dimensions manually
    const { width, height } = {
        width: 1280,
        height: 600,
    };
    // Set viewport size to screen dimensions
    await page.setViewportSize({ width, height });
    await page.goto(pageUrl);
    await page.getByPlaceholder('ชื่อผู้ใช้').fill(username);
    await page.getByPlaceholder('ชื่อผู้ใช้').press('Tab');
    //await page.waitForTimeout(3000);
    await page.getByPlaceholder('รหัสผ่าน').fill(password);
    await page.getByPlaceholder('รหัสผ่าน').press('Tab');
    await page.getByRole('link', { name: 'ภาษาไทย' }).press('Tab');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).press('Enter');
    await page.waitForLoadState('networkidle');
    const Comname = page.locator("#spnCompanyName"); //01
    await Comname.waitFor({state: "visible"});        //02 =01>02 รอจนกว่าจะแสดง Element
    await expect(page.locator("#spnCompanyName")).toHaveText(HeadName);  //VerifyText
    await page.waitForTimeout(3000);
    await page.getByTitle('การซื้อ').click();
    await page.waitForTimeout(delay);
    await page.getByRole('link', { name: ' เอกสาร' }).click();
    await page.waitForTimeout(delay);
    await page.locator('a').filter({ hasText: 'ใบรับของ-ใบซื้อสินค้า/บริการ' }).click();
    await page.waitForTimeout(delay);
    console.log('ใบรับของ-ใบซื้อสินค้า/บริการ : ค้นหาสาขาที่สร้าง')
    await page.getByPlaceholder('กรอกคำค้นหา').fill(InDoc);
    await page.waitForTimeout(delay);
    await page.locator('#obtPISerchAllDocument').click();
    //await page.locator('#obtPOSerchAllDocument').click();
    await page.waitForTimeout(delay);
       
    const notecredit = await page.$('#otbPITblDataDocHDList > tbody > tr > td'); 
    if (notecredit) 
    {
        const text = await notecredit.textContent();
        //const expectedText = 'ไม่พบข้อมูล';
        if (text === expectedText) 
        {
            console.log('\x1b[31m%s\x1b[0m','ใบรับของ-ใบซื้อสินค้า/บริการ : ค้นหาสาขาที่สร้าง : ไม่พบเอกสารใบรับของ-ใบซื้อสินค้า/บริการ : ค้นหาสาขาที่สร้าง')
            await page.waitForTimeout(3000);
            await page.getByRole('button', { name: '+' }).click();
            await page.waitForTimeout(delay);
            //--------------------------------------------------------------------------------------------------------------------
            console.log('ใบรับของ-ใบซื้อสินค้า/บริการ : ข้อมูลอ้างอิง : ค้นหาเลขที่เอกสาร โดยการอ้างอิงจากใบสั่งซื้อที่อนุมัติแล้ว')
            await page.getByRole('tab', { name: 'ข้อมูลอ้างอิง ' }).getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            await page.locator('#obtPIBrowsePODoc').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('กรอกคำค้นหา').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('กรอกคำค้นหา').fill(productBuyDoc);
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('cell', { name: 'A00001-PEPPER' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: 'เลือก', exact: true }).click();
            console.log('\x1b[32m%s\x1b[0m','ใบรับของ-ใบซื้อสินค้า/บริการ : ข้อมูลอ้างอิง : อ้างอิงเอกสารใบสั่งซื้อที่อนุมัติแล้ว')

            console.log('ใบรับของ-ใบซื้อสินค้า/บริการ : เงื่อนไข : กลุ่มธุรกิจ')
            await page.getByRole('tab', { name: 'เงื่อนไข ' }).getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            await page.locator('#obtPIBrowseMerchant').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('กรอกคำค้นหา').fill('44455');
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('cell', { name: 'PEPPER-RETAIL' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: 'เลือก', exact: true }).click();
            await page.waitForTimeout(delay);
            console.log('\x1b[32m%s\x1b[0m','ใบรับของ-ใบซื้อสินค้า/บริการ : ข้อมูลอ้างอิง : เลือกกลุ่มธุรกิจแล้ว')

            console.log('ใบรับของ-ใบซื้อสินค้า/บริการ : เงื่อนไข : ค้นหาร้านค้า')
            await page.locator('#obtPIBrowseShop').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('กรอกคำค้นหา').fill(Mshop);
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            const FindMerchance = await page.$('#otbBrowserList > tbody > tr > td'); 
            
            if (FindMerchance) 
            {
                const text = await FindMerchance.textContent();
                if (text === expectedText) 
                {
                    console.log('\x1b[31m%s\x1b[0m', 'ใบรับของ-ใบซื้อสินค้า/บริการ : เงื่อนไข : ไม่พบข้อมูลร้านค้า')
                    console.log('\x1b[31m%s\x1b[0m', 'ใบรับของ-ใบซื้อสินค้า/บริการ : เงื่อนไข : สร้างร้านค้า')
                    await page.waitForTimeout(delay);
                    await page.locator('#odvModalContent').getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    //await page.pause();
                    const xpathError = '//*[@id="odvModalBodyError"]/div[1]/h3';   
                    const ErrorPopup = await page.$(xpathError);
                    const xpathErrorText = '//*[@id="odvModalBodyError"]/div[2]';   
                    const ErrorText = await page.$(xpathErrorText);

                        if (ErrorPopup && ErrorText) 
                        {
                            const text = await ErrorPopup.innerText();
                            const text2 = await ErrorText.innerText();
                            console.log('ตรวจพบ Error :', text ,' ข้อความว่า : ', text2);
                            console.log('\x1b[31m%s\x1b[0m', 'Error Popup');
                            await page.getByRole('button', { name: 'ตกลง' }).click();
                            await page.pause();
                        } 
                }
                else if (text !== expectedText) 
                {
                    await page.getByRole('cell', { name: 'PEPPER POSEIDON' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    console.log('\x1b[32m%s\x1b[0m', 'ใบรับของ-ใบซื้อสินค้า/บริการ : เงื่อนไข : เลือกร้านค้าเรียบร้อย')
                }
            } 
            //await page.pause();
            console.log('ใบรับของ-ใบซื้อสินค้า/บริการ : เงื่อนไข : คลังสินค้า')
            console.log('\x1b[36m%s\x1b[0m', 'Notic : คลังสินค้าจะอ้างอิงตามที่ผูกกับร้านค้า หากไม่ได้ทำการผูก หรือ ไม่ได้เลือกร้านค้า ระบบจะให้เลือก Default ที่คลังขาย[คลังหลักแทน]')
            await page.locator('#obtPIBrowseWahouse').click();
            await page.waitForTimeout(delay);
            await page.getByPlaceholder('กรอกคำค้นหา').fill('Pepper Warehouse');
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('cell', { name: 'Pepper Warehouse' }).click();
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: 'เลือก', exact: true }).click();
            await page.waitForTimeout(delay);
            console.log('\x1b[32m%s\x1b[0m', 'ใบรับของ-ใบซื้อสินค้า/บริการ : เงื่อนไข : เลือกคลังสินค้าเรียบร้อย')
            await page.waitForTimeout(3000);
            console.log('')
            console.log('')
            
            //Set 1 600
            //------------------------------------------------------------------------------------------------
            //console.log('\x1b[36m%s\x1b[0m', 'ใบรับของ-ใบซื้อสินค้า/บริการ : เงื่อนไข : ผู้จัดจำหน่าย เลือกภาษีแบบแยกนอก')
            await page.getByRole('tab', { name: 'ผู้จำหน่าย ' }).getByRole('button', { name: '' }).click();
            await page.waitForTimeout(3000);
            //await page.getByRole('combobox', { name: 'ภาษีรวมใน' }).click();
            try {
                await page.locator('#odvRowPanelSplInfo > div > div:nth-child(1) > div > button > span > span').click();
                await page.waitForTimeout(2000);
                await page.locator('#bs-select-5-1').click(); //เลือกภาษีแบบแยกนอก
                await page.waitForTimeout(2000);
                //GetVat();
       
                //console.log('') 
                const xpathVatFunction = '//*[@id="odvRowPanelSplInfo"]/div/div[1]/div/button/div/div/div';   
                const ValueText = await page.$(xpathVatFunction);
                
                if (ValueText) 
                {
                    const text2 = await ValueText.innerText();
                    console.log('\x1b[36m%s\x1b[0m',  'VatFunction Testing : ', text2);
          
                    VerifyVat();
                    //console.log('1.>>>>>>>>>>>>>>>>>>>>>>>>>')
                }          
            
                //------------------------------------------------------------------------------------------------
                //console.log('ใบรับของ-ใบซื้อสินค้า/บริการ : เงื่อนไข : ผู้จัดจำหน่าย เลือกภาษีแบบรวมใน')
                //await page.getByRole('tab', { name: 'ผู้จำหน่าย ' }).getByRole('button', { name: '' }).click();
                await page.waitForTimeout(3000);
                //await page.getByRole('combobox', { name: 'ภาษีแยกนอก' }).click();
            
                await page.locator('#odvRowPanelSplInfo > div > div:nth-child(1) > div > button > span > span').click();
                await page.waitForTimeout(2000);
                await page.locator('#bs-select-5-0').click(); //เลือกภาษีแบบรวมใน
                await page.waitForTimeout(2000);
                
                if (ValueText) 
                {
                    const text2 = await ValueText.innerText();
                    console.log('\x1b[36m%s\x1b[0m', 'VatFunction Testing : ', text2);
        
                    VerifyVat();
                
                    //console.log('2.>>>>>>>>>>>>>>>>>>>>>>>>>')
                }
          
                //End Set 1 600
                //------------------------------------------------------------------------------------------------
                await page.waitForTimeout(5000);
                //ทดสอบการ Recal Vat โดยการเปลี่ยนราคาต่อหน่วย จากเดิม 600 เป็น 1000
                
              
                await page.locator('#ohdPrice1').fill('1000.00');
                await page.waitForTimeout(2000);
                await page.locator('#ohdPrice1').press('Enter');
                await page.waitForTimeout(2000);
                await page.getByRole('button', { name: 'ยืนยัน' }).click();
                //console.log('\x1b[31m%s\x1b[0m', 'ใบรับของ-ใบซื้อสินค้า/บริการ : พบการคำนวณภาษีหลังการเปลี่ยนราคาไม่ถูกต้อง')
                await page.waitForTimeout(2000);
                //Set 2 1000
                //------------------------------------------------------------------------------------------------  
                await page.waitForTimeout(3000);
                //await page.getByRole('combobox', { name: 'ภาษีแยกนอก' }).click();
                await page.locator('#odvRowPanelSplInfo > div > div:nth-child(1) > div > button > span > span').click();
                await page.waitForTimeout(2000);
                await page.locator('#bs-select-5-0').click(); //เลือกภาษีแบบรวมใน
                await page.waitForTimeout(2000);
                //console.log('') 
               
                if (ValueText) 
                {
                    const text2 = await ValueText.innerText();
                    console.log('\x1b[36m%s\x1b[0m', 'VatFunction Testing : ', text2);
             
                    VerifyVat();
                }
          
            
                //console.log('ใบรับของ-ใบซื้อสินค้า/บริการ : เงื่อนไข : ผู้จัดจำหน่าย เลือกภาษีแบบแยกนอก')
                await page.waitForTimeout(3000);
                //await page.getByRole('combobox', { name: 'ภาษีรวมใน' }).click();
                await page.locator('#odvRowPanelSplInfo > div > div:nth-child(1) > div > button > span > span').click();
                await page.waitForTimeout(2000);
                await page.locator('#bs-select-5-1').click(); //เลือกภาษีแบบแยกนอก
                await page.waitForTimeout(2000);
                if (ValueText) 
                {
                    const text2 = await ValueText.innerText();
                    console.log('\x1b[36m%s\x1b[0m', 'VatFunction Testing : ', text2);
                
                    VerifyVat();
                    
                    //console.log('1.>>>>>>>>>>>>>>>>>>>>>>>>>')
                }
                //End Set 2 1000
                //--------------------- ---------------------------------------------------------------------------  

               
                await page.waitForTimeout(2000);
                await page.locator('input[name="ohdQty1"]').fill('5.00');
                await page.waitForTimeout(2000);
                await page.locator('input[name="ohdQty1"]').press('Enter');
                await page.waitForTimeout(2000);
       
                if (ValueText) 
                {
                    const text2 = await ValueText.innerText();
                    console.log('\x1b[36m%s\x1b[0m', 'VatFunction Testing : ', text2);
             
                    VerifyVat();
                    
                }
            
                console.log('');
                //console.log('\x1b[36m%s\x1b[0m','ทดสอบการคำนวณสินค้ามากกว่า 1 รายการ');
                await page.locator('#obtPIDocBrowsePdt').click();
                await page.waitForTimeout(delay);
                await page.getByRole('combobox', { name: 'รหัสสินค้า' }).click();
                await page.waitForTimeout(delay);
                await page.locator('#bs-select-10-0').click();
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('สินค้า 01');
                await page.waitForTimeout(delay);
                await page.locator('#odvModalsectionBodyPDT').getByRole('button').click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 01', exact: true }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                await page.waitForTimeout(delay);
                await page.locator('#obtPIDocBrowsePdt').click();
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('สินค้า 02');
                await page.waitForTimeout(delay);
                await page.locator('#odvModalsectionBodyPDT').getByRole('button').click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 02', exact: true }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                await page.waitForTimeout(delay);
                await page.locator('#obtPIDocBrowsePdt').click();
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('สินค้า 03');
                await page.waitForTimeout(delay);
                await page.locator('#odvModalsectionBodyPDT').getByRole('button').click();
                await page.waitForTimeout(delay);
                await page.getByRole('cell', { name: 'สินค้า 03', exact: true }).click();
                await page.waitForTimeout(delay);
                await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                await page.waitForTimeout(delay);
                await page.locator('input[name="ohdQty2"]').fill('20');
                await page.waitForTimeout(delay);
                await page.locator('input[name="ohdQty3"]').fill('50');
                await page.waitForTimeout(delay);
                await page.locator('input[name="ohdQty4"]').fill('100');
                await page.waitForTimeout(delay);
                //await page.locator('input[name="ohdQty4"]').press('Enter');
                //await page.waitForTimeout(delay);
                await page.locator('#ohdPrice2').fill('53.50');
                await page.waitForTimeout(delay);
                await page.locator('#ohdPrice3').fill('17.84');
                await page.waitForTimeout(delay);
                await page.locator('#ohdPrice4').fill('16.60');
                await page.waitForTimeout(delay);
                await page.locator('#ohdPrice4').press('Enter');
                await page.waitForTimeout(delay);
                await page.getByRole('combobox', { name: 'ภาษีแยกนอก' }).click();
                await page.waitForTimeout(delay); 
                await page.locator('#bs-select-5-0').click();                
                await page.waitForTimeout(delay);
                console.log('\x1b[36m%s\x1b[0m','ทดสอบการคำนวณสินค้ามากกว่า 1 รายการ');
                if (ValueText) 
                {
                    const text2 = await ValueText.innerText();
                    console.log('\x1b[36m%s\x1b[0m', 'VatFunction Testing : ', text2);
       
                    VerifyVat();
                        
                    //console.log('1.>>>>>>>>>>>>>>>>>>>>>>>>>')
                }

                //ให้คำสั่งใดภายใต้ Try
                
                //console.log('\x1b[36m%s\x1b[0m', 'ทดสอบการคำนวณภาษี : จากลดชาร์จ เป็น เพิ่มชาร์จ [ส่วนลดท้ายบิล]')

                //console.log('\x1b[36m%s\x1b[0m', 'ทดสอบการคำนวณภาษี : เพิ่มส่วนลดรายการ')










            
            } catch (error) {
                console.error(error.message); 
            }
            await page.pause();


        }
        

    }

          

       

async function GetVat() {
    const chkVat = '//*[@id="oulPIDataListVat"]/li/label[2]';   //Left - ยอดภาษี 
    const ReChkVat = await page.$(chkVat);
    const chkVat01 = '//*[@id="oulPIDataListVat"]/li/label[1]';   //Left - ภาษี 7% Left
    const ReChkVat01 = await page.$(chkVat01);
    const sumVat02 = '//*[@id="olbPIVatSum"]';   //Left - ยอดรวมภาษี 
    const ReChkVat02 = await page.$(sumVat02);
    const Price = '//*[@id="olbPISumFCXtdNet"]';   //ราคาก่อนลดท้ายบิล
    const PriceResult = await page.$(Price);
    const BeforePrice = '//*[@id="olbPICalFCXphGrand"]';   //ราคาสุทธิ
    const PriceBefore = await page.$(BeforePrice);

    //-----------------------------------------------------------------------------------------------------------------------------------
    if (PriceBefore) {
        const text = await PriceBefore.innerText();
        console.log('ยอดรวมก่อนลด/ชาร์จ  :', text);
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
//-----------------------------------------------------------------------------------------------------------------------------------
async function subFunctionVat() {

    const SelectVat = await page.$('#oulPIDataListVat > li > label.pull-right');
    //#olbPIVatSum
    const SelectsumVat = await page.$('#olbPIVatSum');
    if (SelectVat && SelectsumVat)
    {
        const text1 = await SelectVat.textContent();
        const text2 = await SelectsumVat.textContent();
        if (text1 === text2) 
        {     
            console.log('ภาษีที่คำนวณได้ : ', text1 , '  เท่ากับ ยอดรวมภาษีมูลค่าเพิ่ม : ', text2 );
            console.log('\x1b[36m%s\x1b[0m', 'Result : Re-Check VAT sum');
            console.log('//---------------------------------------------------------------------------');
        }
        else
        {       
            console.log('ภาษีที่คำนวณได้ : ', text1 , '  ไม่เท่ากับ ยอดรวมภาษีมูลค่าเพิ่ม : ', text2 );
            console.log('\x1b[36m%s\x1b[0m', 'Result : Re-Check VAT sum');
            console.log('//---------------------------------------------------------------------------');
            
        }
    }
    
}   
//-----------------------------------------------------------------------------------------------------------------------------------

   
async function VerifyVat() {
    await page.waitForTimeout(delay);
    //console.log('') 
    //console.log('\x1b[36m%s\x1b[0m', 'ใบรับของ-ใบซื้อสินค้า/บริการ : ทดสอบการ Recal Vat โดยการเปลี่ยนราคาต่อหน่วย จากเดิม 600 เป็น 1000')
    const BeforePrice = '//*[@id="olbPISumFCXtdNetAfHD"]';   //ยอดรวมหลัง ลด/ชาร์จ
    const PriceBefore = await page.$(BeforePrice);
    if (PriceBefore) {
        const Price = await PriceBefore.innerText();  //เก็บค่ายอดรวมหลัง ลด/ชาร์จ
        const PriceAsNumber: number = parseFloat(Price.replace(",", "")); //เก็บค่ายอดรวมหลัง ลด/ชาร์จ แปลงเป็นชนิด Double
        const chkVat01 = '//*[@id="oulPIDataListVat"]/li/label[1]';   //Left - ภาษี 7% Left
        const ReChkVat01 = await page.$(chkVat01); 
        //const sumVatAmount = '//*[@id="olbPICalFCXphGrand"]'; //จำนวนเงินรวมทั้งสิ้น //*[@id="olbPICalFCXphGrand"]
        //const TotalVatAmount = await page.$(sumVatAmount);
        if (ReChkVat01) {
            const textVat = await ReChkVat01.innerText();
            //const FinalVatAmount = await TotalVatAmount.innerText();
            const percentageString: string = textVat;
            const percentage: number = parseFloat(percentageString.replace("%", ""));
            function calculateTotalAmountIncludeVat(price: number): number {
                const vatAmount: number = priceIncludeVat -((priceIncludeVat)*100)/(100+percentage) ;
                //const totalAmount: number = p0 + vatAmount;
                const totalAmount: number = vatAmount;
                return totalAmount;
            }
              
            function calculateTotalAmountExcludeVat(price: number): number {
                const vatAmount: number = ((priceIncludeVat)*(100+percentage)/100)-priceIncludeVat;
                //const totalAmount: number = p1 + vatAmount;
                const totalAmount: number = vatAmount;
                return totalAmount;
            }
              
            const priceIncludeVat: number = PriceAsNumber; //<<< Set ค่าจากบรรทัด 486 เพื่อจะนำไปคำนวณภาษีใน Function                   
            const totalAmountIncludeVat: number = calculateTotalAmountIncludeVat(priceIncludeVat); //<<< ส่งค่ายอดรวมหลัง ลด/ชาร์จ หลังแปลงเป็นชนิด Double ไปคำนวณใน Function ภาษีรวมใน
            const totalAmountExcludeVat: number = calculateTotalAmountExcludeVat(priceIncludeVat); //<<< ส่งค่ายอดรวมหลัง ลด/ชาร์จ หลังแปลงเป็นชนิด Double ไปคำนวณใน Function ภาษีรแยกนอก

            //console.log('ทดสอบ PriceAsNumber :', PriceAsNumber );
            console.log('ยอดรวมหลังลด/ชาร์จ :', Price ,' ภาษี ', textVat);
            //console.log(`Total amount (include VAT): ${totalAmountIncludeVat.toFixed(2)}`);
            //console.log(`Total amount (exclude VAT): ${totalAmountExcludeVat.toFixed(2)}`);
            //.toFixed(2)

            const SelectsumVat = await page.$('#olbPIVatSum');    //ยอดรวมภาษีมูลค่าเพิ่ม Left
            if (SelectsumVat)
            {

                const text1 = await SelectsumVat.textContent();
                //-------------------------------------------------------------------------------------------------------
                await page.waitForTimeout(2000);
                const expecIncludetVat = totalAmountIncludeVat.toFixed(2);
                const expecExcludetVat = totalAmountExcludeVat.toFixed(2);

                const C: number = PriceAsNumber;
                const C1 = C.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show  600
                const D: number = parseFloat(expecIncludetVat.replace(",", ""));
                const D1 = D.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show  39.25

                const IncludeTotal: number = (C-D); //<<< Value 600-39.25= 560.75
                const BeforeIncludeTotal = IncludeTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show 600-39.25 = 560.75

                const ExpeIncludeTotal: number = (IncludeTotal+D); //<<< Value 560.75+39.25
                const ExpectIncludeTotal = ExpeIncludeTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show 560.75+39.25 = 600.00
                

                const A: number = PriceAsNumber; //Value 600
                const A1 = A.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show 600
                const B: number = parseFloat(expecExcludetVat.replace(",", ""));//Value 42
                const B1 = B.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show 42.00

                const ExcludeTotal: number = (A+B); //Value 600+42
                const ExpectExcludeTotal = ExcludeTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); //<<< Show 642.00
                 //-------------------------------------------------------------------------------------------------------
          
             
                  
                //Include
                if (text1 === expecIncludetVat) 
                {    
                    // console.log('\x1b[32m%s\x1b[0m','[P]');
                    // console.log('\x1b[36m%s\x1b[0m','[include VAT]');
                    // console.log('ภาษีที่ระบบคำนวณได้ : ', text1);
                    // console.log('ภาษีที่ควรได้ : ', expecIncludetVat);
                    // console.log('ราคาก่อนคิดภาษี : ',BeforeIncludeTotal);
                    // console.log('จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectIncludeTotal);
                    console.log('\x1b[32m%s\x1b[0m','[P]','[include VAT] ภาษีที่ระบบคำนวณได้ : ', text1 , '  ภาษีที่ควรได้ : ', expecIncludetVat ,' ราคาก่อนคิดภาษี : ',BeforeIncludeTotal, ' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectIncludeTotal);
                    //console.log('\x1b[32m%s\x1b[0m','[P]','[include VAT] ภาษีที่ระบบคำนวณได้ : ', text1 , '  ภาษีที่ควรได้ : ', expecIncludetVat ,' ราคาก่อนคิดภาษี : ',C,'-',D,'=',BeforeIncludeTotal, ' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectIncludeTotal);
                    console.log('//-----------------------------------');
                }
                else
                {    
                    // console.log('\x1b[31m%s\x1b[0m','[F]');
                    // console.log('\x1b[36m%s\x1b[0m','[include VAT]');
                    // console.log('ภาษีที่ระบบคำนวณได้ : ', text1);
                    // console.log('ภาษีที่ควรได้ : ', expecIncludetVat);
                    // console.log('ราคาก่อนคิดภาษี : ',BeforeIncludeTotal);
                    // console.log('จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectIncludeTotal);     
                    console.log('\x1b[31m%s\x1b[0m','[F]','[include VAT] ภาษีที่ระบบคำนวณได้ : ', text1 , '  ภาษีที่ควรได้ : ', expecIncludetVat ,' ราคาก่อนคิดภาษี : ',BeforeIncludeTotal, ' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectIncludeTotal);
                    //console.log('\x1b[31m%s\x1b[0m','[F]','[include VAT] ภาษีที่ระบบคำนวณได้ : ', text1 , '  ภาษีที่ควรได้ : ', expecIncludetVat ,' ราคาก่อนคิดภาษี : ',C,'-',D,'=',BeforeIncludeTotal, ' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectIncludeTotal);
                    console.log('//-----------------------------------');
                    
                }
                //Exclude
                if (text1 === expecExcludetVat) 
                {           
                    // console.log('\x1b[32m%s\x1b[0m','[P]');
                    // console.log('\x1b[36m%s\x1b[0m','[Exclude VAT]');
                    // console.log('ภาษีที่ระบบคำนวณได้ : ', text1);
                    // console.log('ภาษีที่ควรได้ : ', expecExcludetVat);
                    // console.log('ราคาก่อนคิดภาษี : ',A1);
                    // console.log('จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectExcludeTotal);
                    console.log('\x1b[32m%s\x1b[0m','[P]','[Exclude VAT] ภาษีที่ระบบคำนวณได้ : ', text1 , '  ภาษีที่ควรได้ : ', expecExcludetVat ,' ราคาก่อนคิดภาษี : ',A1,' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectExcludeTotal );
                    //console.log('\x1b[32m%s\x1b[0m','[P]','[Exclude VAT] ภาษีที่ระบบคำนวณได้ : ', text1 , '  ภาษีที่ควรได้ : ', expecExcludetVat ,' ราคาก่อนคิดภาษี : ',A,' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',A,'+',B,'=',ExpectExcludeTotal );
                    console.log('//-----------------------------------');
                }
                else
                {          
                    // console.log('\x1b[31m%s\x1b[0m','[F]');
                    // console.log('\x1b[36m%s\x1b[0m','[Exclude VAT]');
                    // console.log('ภาษีที่ระบบคำนวณได้ : ', text1);
                    // console.log('ภาษีที่ควรได้ : ', expecExcludetVat);
                    // console.log('ราคาก่อนคิดภาษี : ',A1);
                    // console.log('จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectExcludeTotal);
                    console.log('\x1b[31m%s\x1b[0m','[F]','[Exclude VAT] ภาษีที่ระบบคำนวณได้ : ', text1 , '  ภาษีที่ควรได้ : ', expecExcludetVat ,' ราคาก่อนคิดภาษี : ',A1,' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',ExpectExcludeTotal );
                    //console.log('\x1b[31m%s\x1b[0m','[F]','[Exclude VAT] ภาษีที่ระบบคำนวณได้ : ', text1 , '  ภาษีที่ควรได้ : ', expecExcludetVat ,' ราคาก่อนคิดภาษี : ',A,' จำนวนเงินรวมทั้งสิ้นที่ต้องได้ : ',A,'+',B,'=',ExpectExcludeTotal );
                    console.log('//-----------------------------------');
                    
                }


            
            }

        }    
    }
    console.log('') 
  
}  
   
//-----------------------------------------------------------------------------------------------------------------------------------
async function connectToDatabase() {
    const client = new Client({
      user: 'your_username',
      password: 'your_password',
      host: 'your_host',
      port: 5432, // replace with your database port
      database: 'your_database_name',
    });
  
    try {
      await client.connect();
      console.log('Connected to the database');
  
      // Perform database operations here
  
    } catch (error) {
      console.error('Error connecting to the database:', error);
    } finally {
      await client.end();
      console.log('Disconnected from the database');
    }
  }
  
  connectToDatabase();


  async function DocApprove() {
    console.log('ใบลดหนี้ : อนุมัติเอกสาร')
    await page.locator('#obtCreditNoteApprove').click();
    await page.waitForTimeout(delay);
    await page.locator('##odvCreditNotePopupApv > div > div > div.modal-footer > button.btn.xCNBTNDefult').click();
    await page.waitForTimeout(delay);
    await page.locator('#obtCreditNoteApprove').click();
    await page.waitForTimeout(delay);
    await page.locator('#odvCreditNotePopupApv > div > div > div.modal-footer > button.btn.xCNBTNPrimery').click();
    await page.waitForTimeout(delay);
    console.log('ใบลดหนี้ : อนุมัติเอกสารเรียบร้อย')
  }
  async function DocDel() {
    console.log('ใบลดหนี้ : ลบเอกสารใบลดหนี้') 
    const valuepd = await page.inputValue('#oetCreditNoteDocNo');
    await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
    await page.waitForTimeout(delay); 
    //await page.pause();
    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill(valuepd);
    await page.waitForTimeout(delay);
    await page.locator('#ostSearchPromotion').getByRole('button').click();      
    await page.waitForTimeout(delay);             
    await page.locator('#otrPurchaseoeder0 > td:nth-child(9) > img').click();
    await page.waitForTimeout(delay); 
    await page.locator('#osmConfirm').click();
    console.log('\x1b[32m%s\x1b[0m', 'ใบลดหนี้ : ลบเอกสารใบลดหนี้เรียบร้อย')

  }


});
// เก็บค่า
// const valuepd = await page.inputValue('#oetCrdCode');
// ใช้ค่า
// await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill(valuepd);