import { test, expect, chromium } from '@playwright/test';
import { evaluateXPathToBoolean } from 'fontoxpath';
import { evaluateXPathToString } from 'fontoxpath';
import { Client } from 'pg';

test('test', async ({ page }) => 
{
    const browser = await chromium.launch();
    const delay = 1000;
    //await page.waitForTimeout(delay);
    //--trace on
    await chromium.launch({headless: false, slowMo: 1000})
    const productid = 'PP0004X'
    const productid2 = 'PP0004X1' //ทดสอบผิด
    const productname = 'PEP-TEST04'
    const Doc = 'PC0004723000003'  // ทดสอบเอกสารแบบ สร้างแล้วลบเลย เปิดใช้งานตรงนี้ PC000472300000X X<> 1/2
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
    await page.getByTitle('การซื้อ').click();
    await page.waitForTimeout(delay);
    await page.getByRole('link', { name: ' เอกสาร' }).click();
    await page.waitForTimeout(delay);
    await page.locator('a').filter({ hasText: 'ใบลดหนี้' }).click();
    await page.waitForTimeout(delay);
    console.log('ใบลดหนี้ : ค้นหาสาขาที่สร้าง')
    await page.getByPlaceholder('กรอกคำค้นหา').fill(Doc);
    await page.waitForTimeout(delay);
    await page.locator('#ostSearchPromotion').getByRole('button').click();
    //await page.locator('#obtPOSerchAllDocument').click();
    await page.waitForTimeout(delay);
    
    const notecredit = await page.$('#odvRGPList > tr > td'); 
    if (notecredit) 
    {
        const text = await notecredit.textContent();
        const expectedText = 'ไม่พบข้อมูล';
        if (text === expectedText) 
        {
            console.log('ใบลดหนี้ : ไม่พบเอกสารใบลดหนี้')
            await page.waitForTimeout(3000);
            await page.getByRole('button', { name: '+' }).click();
            await page.waitForTimeout(delay);
            await page.locator('span').filter({ hasText: 'ใบลดหนี้แบบไม่มีสินค้า - ยอดเงินอย่างเดียว' }).locator('i').click();
            await page.waitForTimeout(delay);
            console.log('ใบลดหนี้ : เลือกเมนู ใบลดหนี้แบบมีสินค้า - ส่ง/รับคืน')
            await page.locator('span').filter({ hasText: 'ใบลดหนี้แบบมีสินค้า - ส่ง/รับคืน' }).locator('i').click();
            await page.waitForTimeout(delay);
            await page.getByRole('button', { name: 'ยืนยัน' }).click();
            await page.waitForTimeout(delay);
            //--------------------------------------------------------------------------------------------------------------------
            console.log('ใบลดหนี้ : สร้างเลขที่เอกสาร ใบลดหนี้')
            //await page.getByText('สร้างอัตโนมัติ').click();
            //await page.waitForTimeout(delay);
            //console.log('ใบลดหนี้ : ยกเลิกการสร้างเลขที่เอกสารอัตโนมัติ')
            //await page.waitForTimeout(delay);
            //await page.getByPlaceholder('เลขที่เอกสาร').fill('CCPA-999-00001');
            console.log('\x1b[31m%s\x1b[0m','ใบลดหนี้ : ถ้าสร้างเลขที่เอกสารเองข้อมูลอ้างอิงจากใบสั่งซื้อจะไม่ถูกดึงมาด้วย')
            //await page.waitForTimeout(delay);
            //await page.getByText('สร้างอัตโนมัติ').click();
            //console.log('\x1b[31m%s\x1b[0m','ใบลดหนี้ : สร้างเลขที่เอกสารอัตโนมัติ')
            //--------------------------------------------------------------------------------------------------------------------
            //await page.pause();
            await page.getByRole('tab', { name: 'ข้อมูลอ้างอิง ' }).getByRole('button', { name: '' }).click();
            console.log('\x1b[31m%s\x1b[0m','ใบลดหนี้ : กดเมนู ข้อมูลอ้างอิง แล้วพบ Popup "กรุณาเลือกผู้จัดจำหน่ายก่อน"')
            //--------------------------------------------------------------------------------------------------------------------
            const xpath = '//*[@id="odvCreditNotePIPanel"]/div/div/div[1]/h5';   //VerifyPage
            const elements1 = await page.$(xpath);
            if (elements1) {
               const text = await elements1.innerText();
               console.log('กำลังแสดงหน้าต่าง :', text);
            }
            //---------------------------------------------------------------------------------------------------------------------
            await page.waitForTimeout(delay);
            //await page.locator('#obtCreditNoteBrowseRefPI').click();
            await page.locator('#obtCreditNoteBrowseRefPI > img').click();
            await page.waitForTimeout(delay);
            console.log('ใบลดหนี้ : ค้นหาจากเอกสารที่มี')
            await page.locator('#oetCNPIMoDocNo').fill('PS000312300002');
            await page.waitForTimeout(delay);
            await page.locator('#ofmCreditNoteRefPIHDForm').getByRole('button').click();
            await page.waitForTimeout(delay);
            //await page.getByRole('cell', { name: 'TESTER' }).click();
            //await page.waitForTimeout(delay);
            //await page.getByRole('button', { name: 'ตกลง' }).click();
            //await page.waitForTimeout(delay);
            //await page.pause();
            
            const FindCraditNote = await page.$('#otbPITblDataDocHDList > tbody > tr > td'); 
            if (FindCraditNote) 
            {
                const text = await FindCraditNote.textContent();
                const expectedText = 'ไม่พบข้อมูล';
                if (text === expectedText) 
                {
                    console.log('ใบลดหนี้ : ไม่พบเอกสารใบสั่งซื้อที่สร้าง')
                    await page.waitForTimeout(3000);
                    
                }
            //}    
                else if (text !== expectedText) 
                {
                    
                    await page.getByRole('cell', { name: 'PS000312300002' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'ตกลง' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#oetCreditNoteXphRefExt').fill('ไม่มีเอกสารอ้างอิง');
                    await page.waitForTimeout(delay);
                    //--------------------------------------------------------------------------------------------------------------------
                    await page.getByRole('tab', { name: 'เงื่อนไข ' }).getByRole('button', { name: '' }).click();
                    console.log('ใบลดหนี้ : เงื่อนไข : ดำเนินการสร้างกลุ่มธุรกิจ')
                    const xpath = '//*[@id="odvModalContent2"]/div[1]/div/div[1]/label';   //VerifyPage
                    const elements1 = await page.$(xpath);
                    if (elements1) {
                    const text = await elements1.innerText();
                    console.log('กำลังแสดงหน้าต่าง :', text);
                    }
                    //---------------------------------------------------------------------------------------------------------------------
                    const FindCraditNote = await page.$('#otbPITblDataDocHDList > tbody > tr > td'); 
                    if (FindCraditNote) 
                    {
                        const text = await FindCraditNote.textContent();
                        const expectedText = 'ไม่พบข้อมูล';
                        if (text === expectedText) 
                        {
                            console.log('ใบลดหนี้ : ร้านค้า')
                            await page.waitForTimeout(delay);
                            await page.getByRole('button', { name: 'ปิด' }).click();      

                        }
                    }  
                    console.log('ใบลดหนี้ : เงื่อนไข : คลังสินค้า')
                    await page.locator('#obtCreditNoteBrowseWah').click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill('00003');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: '' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('cell', { name: 'Pepper Warehouse' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เลือก', exact: true }).click();
                    await page.waitForTimeout(delay);
                    console.log('\x1b[32m%s\x1b[0m', 'ใบลดหนี้ : เงื่อนไข : เลือกคลังสินค้าเรียบร้อย')
                    //await page.pause();
                  
                    console.log('ใบลดหนี้ : อื่นๆ')
                    await page.getByRole('tab', { name: 'อื่นๆ ' }).getByRole('button', { name: '' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ไม่เคยอ้างอิง' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-9-2').click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'บวกจำนวนเดิมในรายการ' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-10-1').click();
                    await page.waitForTimeout(delay);
                    await page.locator('#otaCreditNoteXphRmk').fill('Automation Test');
                    await page.waitForTimeout(delay);
                    console.log('\x1b[32m%s\x1b[0m', 'ใบลดหนี้ : ระบุข้อความอื่นๆเรียบร้อย')
                    //await page.pause();

                    //await page.getByRole('row', { name: '1 00113 A014 EA + 500.00 Remove' }).getByRole('textbox').nth(1).click();
                    //await page.getByRole('row', { name: '1 00113 A014 EA + 500.00 Remove' }).getByRole('textbox').nth(1).fill('250.00');  
                    console.log('ใบลดหนี้ : แก้ไขราคาสินค้า')                  
                    await page.locator('#odvTBodyCreditNotePdt > tr > td:nth-child(7) > input').fill('250.00');  
                    console.log('\x1b[32m%s\x1b[0m', 'ใบลดหนี้ : แก้ไขราคาสินค้าใหม่เรียบร้อย')  
                    await page.waitForTimeout(delay);      
                    console.log('ใบลดหนี้ : เพิ่มชาร์จราคาสินค้า 50 บาท')              
                    await page.getByRole('cell', { name: '+' }).getByRole('button', { name: '+' }).click();
                    await page.getByRole('cell', { name: '+' }).getByRole('button', { name: '+' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เพิ่มส่วนลด/ชาร์จ' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ลดบาท' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-16-2').click(); //กลับมาเลือกชาร์จบาท
                    //await page.getByRole('row', { name: '1 2,500.00 0.00 0.00 ชาร์จบาท Remove' }).getByRole('textbox').click();
                    //await page.getByRole('row', { name: '1 2,500.00 0.00 0.00 ชาร์จบาท Remove' }).getByRole('textbox').fill('50');
                    await page.locator('#otbDisChgDataDocDTList > tbody > tr > td:nth-child(7) > div > input').fill('50.00');
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'ตกลง' }).click();
                    await page.waitForTimeout(3000);
                    
                    //console.log('//-----------------------------------------------------------------------------------------------------------------------------------');
                    const xpathVatFunction = '//*[@id="odvCreditNoteSplPanel"]/div/div[1]/div/button/div/div/div';   
                    const ValueText = await page.$(xpathVatFunction);
                    
                    if (ValueText) 
                    {
                        const text2 = await ValueText.innerText();
                        console.log('\x1b[36m%s\x1b[0m',  'VatFunction Testing : ', text2);
                        //console.log('ใบลดหนี้ : ทดสอบการคำนวณ ExcludeVAT')   
                        await page.waitForTimeout(delay);
                        VerifyVat();
                    }  
                    //console.log('//-----------------------------------------------------------------------------------------------------------------------------------'); 
                    //await page.waitForTimeout(2000);
                    //console.log('\x1b[32m%s\x1b[0m', 'ใบลดหนี้ : เพิ่มชาร์จราคาสินค้า 50 บาท เรียบร้อย') 
                    //await page.waitForTimeout(delay);
                    //console.log('ใบลดหนี้ : ลดท้ายบิล ลดชาร์จราคาสินค้า 10 บาท')  
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'ลด/ชาร์จ' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('button', { name: 'เพิ่มส่วนลด/ชาร์จ' }).click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ลดบาท' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-17-1').click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('combobox', { name: 'ลด %' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-17-0').click(); //กลับมาเลือกลดบาท
                    await page.waitForTimeout(delay);
                    //await page.getByRole('row', { name: '1 2,550.00 0.00 0.00 ลดบาท Remove' }).getByRole('textbox').click();
                    //await page.getByRole('row', { name: '1 2,550.00 0.00 0.00 ลดบาท Remove' }).getByRole('textbox').fill('10');
                    await page.locator('#otbDisChgDataDocHDList > tbody > tr.xWCreditNoteDisChgTrTag > td:nth-child(7) > div > input').fill('10.00');
                    await page.waitForTimeout(delay);
                    ///////
                    await page.getByRole('button', { name: 'ตกลง' }).click();
                    await page.waitForTimeout(3000);
                    //console.log('//-----------------------------------------------------------------------------------------------------------------------------------');
                    
                    if (ValueText) 
                    {
                        await page.waitForTimeout(delay);
                        const text2 = await ValueText.innerText();
                        console.log('\x1b[36m%s\x1b[0m',  'VatFunction Testing : ', text2);
                        //console.log('ใบลดหนี้ : ทดสอบการคำนวณ ExcludeVAT')   
                        VerifyVat();
                        await page.waitForTimeout(delay);
                        
                        //console.log('1.>>>>>>>>>>>>>>>>>>>>>>>>>')
                    }  
                    //await page.waitForTimeout(2000);
                    //console.log('\x1b[32m%s\x1b[0m', 'ใบลดหนี้ : ลดท้ายบิล ลดชาร์จราคาสินค้า 10 บาท เรียบร้อย')
                    await page.waitForTimeout(delay); 
                    await page.getByRole('tab', { name: 'ผู้จำหน่าย ' }).getByRole('button', { name: '' }).click();
                    await page.waitForTimeout(delay);
                    //await page.getByRole('combobox', { name: 'ภาษีแยกนอก' }).click();
                    //await page.locator('#bs-select-6-0').click();
                    await page.getByRole('combobox', { name: 'ภาษีรวมใน' }).click();
                    await page.waitForTimeout(delay);
                    await page.locator('#bs-select-6-1').click(); //เลือกภาษีแบบแยกนอก
                    await page.waitForTimeout(delay);
                    //const xpathVatFunction = '//*[@id="odvCreditNoteSplPanel"]/div/div[1]/div/button/div/div/div';   
                    //const ValueText = await page.$(xpathVatFunction);
                    
                    if (ValueText) 
                    {
                        await page.waitForTimeout(delay);
                        const text2 = await ValueText.innerText();
                        console.log('\x1b[36m%s\x1b[0m',  'VatFunction Testing : ', text2);
                        //console.log('ใบลดหนี้ : ทดสอบการคำนวณ ExcludeVAT')   
                        VerifyVat();
                    }  

                    await page.waitForTimeout(2000);
                    await page.pause();
                    //console.log('ใบลดหนี้ : ทดสอบการคำนวณ ExcludeVAT เรียบร้อย กรุณาตรวจสอบการคำนวณ') 
                    await page.getByRole('button', { name: 'บันทึก' }).click();
                    await page.waitForTimeout(5000);
                    console.log('ใบลดหนี้ : บันทึกเอกสาร // ไม่อนุมัติเอกสาร]') 
                   
                    //--------------------------------------------------------------------------------------------------------------------
                    const valuepd = await page.inputValue('#oetCreditNoteDocNo');
                    await page.waitForTimeout(2000)
                    console.log('เลขที่เอกสาร ใบลดหนี้ : [ ',valuepd ,' ]') 
                    await page.waitForTimeout(2000)
                    //---------------------------------------------------------------------------------------------------------------------
                    
                    //สามารถทำคำสั่งอนุมัติเอกสารได้จากตรงนี้ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    //await page.pause();
                    //DocApprove()
                    
                    await page.locator('#oliCreditNoteTitle').click();
                    await page.waitForTimeout(delay);
                    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill(valuepd);
                    await page.waitForTimeout(delay);
                    await page.locator('#ostSearchPromotion').getByRole('button').click();     
                    await page.waitForTimeout(delay);        
                    const FindOrderDoc = await page.$('#otrPurchaseoeder0 > td:nth-child(5) > label'); 
                    if (FindOrderDoc) 
                    {
                        // Get the text content of the element
                        const text = await FindOrderDoc.textContent();
                        // Compare the text content
                        const expectedText = 'รออนมุติ';
                        if (text === expectedText) 
                        {
                            const Docnumberxpath = '//*[@id="otrPurchaseoeder0"]/td[3]';   
                            const DocNum = await page.$(Docnumberxpath);
                            const DocStaxpath = '//*[@id="otrPurchaseoeder0"]/td[5]/label';   
                            const DocSta = await page.$(DocStaxpath);

                            if (DocNum && DocSta) {
                                const text = await DocNum.innerText();
                                const text2 = await DocSta.innerText();
                                console.log('ตรวจพบเลขที่เอกสารที่ :', text ,' สถานะเอกสาร : ', text2);
                                //await page.pause();
                                //ทำคำสั่งแก้ไข
                                console.log('ใบลดหนี้ : กดปุ่มแก้ไข') 
                                await page.locator('#otrPurchaseoeder0 > td:nth-child(10) > img').click();
                                console.log('\x1b[31m%s\x1b[0m','ใบลดหนี้ : พบปัญหาการแสดงส่วนลดท้ายบิลไม่ถูกต้อง')
                                const DocEditStaxpath = '//*[@id="odvCreditNoteSubHeadDocPanel"]/div/div[8]/div[2]/label';   
                                const DocEditSta = await page.$(DocEditStaxpath);
                                if (DocEditSta) 
                                {
                                    const TextDocEditSta = await DocEditSta.innerText();
                                    console.log('ตรวจพบเลขที่เอกสารที่ :', text ,' สถานะเอกสาร : ', TextDocEditSta);
                                        
                                }
                                //ลบข้อมูลหลังการแก้ไข
                                //DocDel();

                                console.log('ใบลดหนี้ : ลบเอกสารใบลดหนี้') 
                                const valuepd = await page.inputValue('#oetCreditNoteDocNo');
                                await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                                await page.waitForTimeout(delay); 
                                await page.pause();
                                await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill(valuepd);
                                await page.waitForTimeout(delay);
                                await page.locator('#ostSearchPromotion').getByRole('button').click();      
                                await page.waitForTimeout(delay);             
                                await page.locator('#otrPurchaseoeder0 > td:nth-child(9) > img').click();
                                await page.waitForTimeout(delay); 
                                await page.locator('#osmConfirm').click();
                                console.log('\x1b[32m%s\x1b[0m', 'ใบลดหนี้ : ลบเอกสารใบลดหนี้เรียบร้อย')
                                
                                
                            } 
                        }
                    }	
        

                }
                else
                {
                    
                }
        
        
        
            }


        }
        else if (text !== expectedText) 
        {
            await page.waitForTimeout(3000); 
            // ตรวจสอบสถานะเอกสารสั่งซื้อ
            const xpathdocsta = '//*[@id="otrPurchaseoeder0"]/td[5]/label';   //ดึงข้อมูลสถานะเอกสารออกมา
            const vardocsta = await page.$(xpathdocsta);
            if (vardocsta) 
            {
                const text = await vardocsta.innerText();
                const SelectDocStaApproveVerify = 'อนุมัติแล้ว';
                const SelectDocCancelApproveVerify = 'ยกเลิก';
                const SelectDocStaWaitVerify = 'รออนมุติ';
                //console.log('\x1b[32m%s\x1b[0m','Result ', text)
                if (text === SelectDocStaApproveVerify) 
                {
                    const Docnumberxpath = '//*[@id="otrPurchaseoeder0"]/td[3]';   
                    const DocNum = await page.$(Docnumberxpath);
                    const DocStaxpath = '//*[@id="otrPurchaseoeder0"]/td[5]/label';   
                    const DocSta = await page.$(DocStaxpath);

                        if (DocNum && DocSta) 
                        {
                            const text = await DocNum.innerText();
                            const text2 = await DocSta.innerText();
                            console.log('ตรวจพบเลขที่เอกสารที่ :', text ,' สถานะเอกสาร : ', text2);
                            console.log('\x1b[32m%s\x1b[0m', 'ใบลดหนี้ : เอกสารได้ทำการอนุมัติแล้ว ไม่สามารถทำการลบได้ กรุณาเปลี่ยนเลขที่เอกสารเพื่อสร้างเอกสาใหม่')
                            
                        } 
                    
                    //await page.pause();
                }
                else if (text === SelectDocCancelApproveVerify) 
                {
                    //
                    await page.waitForTimeout(3000);
                    const Docnumberxpath = '//*[@id="otrPurchaseoeder0"]/td[3]';   
                    const DocNum = await page.$(Docnumberxpath);
                    const DocStaxpath = '//*[@id="otrPurchaseoeder0"]/td[5]/label';   
                    const DocSta = await page.$(DocStaxpath);

                        if (DocNum && DocSta) 
                        {
                            const text = await DocNum.innerText();
                            const text2 = await DocSta.innerText();
                            console.log('ตรวจพบเลขที่เอกสารที่ :', text ,' สถานะเอกสาร : ', text2);
                            console.log('\x1b[31m%s\x1b[0m', 'ใบลดหนี้ : เอกสารใบนี้ถูกยกเลิกไปแล้ว ไม่สามารถทำการลบได้')
                            
                        } 
                    
                }
                else if (text === SelectDocStaWaitVerify) 
                {
                    //
                    await page.waitForTimeout(3000);
                    const Docnumberxpath = '//*[@id="otrPurchaseoeder0"]/td[3]';   
                    const DocNum = await page.$(Docnumberxpath);
                    const DocStaxpath = '//*[@id="otrPurchaseoeder0"]/td[5]/label';   
                    const DocSta = await page.$(DocStaxpath);

                        if (DocNum && DocSta) 
                        {
                            const text = await DocNum.innerText();
                            const text2 = await DocSta.innerText();
                            console.log('ตรวจพบเลขที่เอกสารที่ :', text ,' สถานะเอกสาร : ', text2);
                            console.log('\x1b[36m%s\x1b[0m', 'ใบลดหนี้ : เอกสารใบนี้อยู่ในสถานะ รอการอนุมัติ');
                            //await page.pause();
                        } 
                    //ทำการแก้ไข
                    //หรือ
                    //ทำการลบ    
                    console.log('ใบสั่งซื้อ : เอกสารยังไม่ได้ทำการอนุมัติ สามารถทำการลบใบสั่งซื้อได้')
                    //await page.locator('#otrPurchaseInvoice0 > td:nth-child(8) > img').click();
                    //await page.waitForTimeout(delay);
                    //await page.getByRole('button', { name: 'ยืนยัน' }).click();
                    //console.log('\x1b[32m%s\x1b[0m', 'ใบสั่งซื้อ : ทำการลบใบสั่งซื้อแล้วร้อยแล้ว')
                    //ทำคำสั่งแก้ไข
                    console.log('ใบลดหนี้ : กดปุ่มแก้ไข') 
                    await page.locator('#otrPurchaseoeder0 > td:nth-child(10) > img').click();
                    console.log('\x1b[31m%s\x1b[0m','ใบลดหนี้ : พบปัญหาการแสดงส่วนลดท้ายบิลไม่ถูกต้อง')
                    const DocEditStaxpath = '//*[@id="odvCreditNoteSubHeadDocPanel"]/div/div[8]/div[2]/label';   
                    const DocEditSta = await page.$(DocEditStaxpath);

                        if (DocEditSta) 
                        {
                            const TextDocEditSta = await DocEditSta.innerText();
                            console.log('ตรวจพบเลขที่เอกสารที่ :', text ,' สถานะเอกสาร : ', TextDocEditSta);
                        }
                    
                    //ลบข้อมูล
                    await page.pause();
                    await page.waitForTimeout(3000);
                    console.log('ใบลดหนี้ : ลบเอกสารใบลดหนี้') 
                    await page.getByRole('button', { name: 'ย้อนกลับ' }).click();
                    await page.waitForTimeout(delay); 
                    await page.getByRole('textbox', { name: 'กรอกคำค้นหา' }).fill(Doc);
                    await page.waitForTimeout(delay); 
                    await page.locator('#ostSearchPromotion').getByRole('button').click();      
                    await page.waitForTimeout(delay);             
                    await page.locator('#otrPurchaseoeder0 > td:nth-child(9) > img').click();
                    await page.waitForTimeout(delay); 
                    await page.locator('#osmConfirm').click();
                    console.log('\x1b[32m%s\x1b[0m', 'ใบลดหนี้ : ลบเอกสารใบลดหนี้เรียบร้อย')


                }


                else
                {
                    console.log('//------------------- Unknow 1 --------------------');
                }
            }
        }
        else
        {
            console.log('//------------------- Unknow 2 --------------------');
            await page.pause();
        }
    }
    else
    {
        console.log('//------------------- Unknow 3 --------------------');
        await page.pause();
        
    }
//-----------------------------------------------------------------------------------------------------------------------------------
async function subFunctionVat() {

    const SelectVat = await page.$('#oulCreditNoteListVat > li > label.pull-right');
    const SelectsumVat = await page.$('#olbCrdditNoteVatSum');
    if (SelectVat && SelectsumVat)
    {
        const text1 = await SelectVat.textContent();
        const text2 = await SelectsumVat.textContent();
        if (text1 === text2) 
        {
            //console.log("ภาษีที่คำนวณได้ : ", text1 ,"  เท่ากับ ยอดรวมภาษีมูลค่าเพิ่ม : " , text2 , " Status Test : PASS" );            
            console.log('ภาษีที่คำนวณได้ : ', text1 , '  เท่ากับ ยอดรวมภาษีมูลค่าเพิ่ม : ', text2 );
            console.log('\x1b[32m%s\x1b[0m', 'Result : PASS');
            console.log('//-----------------------------------------------');
            
            //console.log('\x1b[36m%s\x1b[0m', 'Hello ChatGPT'); // สีฟ้า
            //console.log('\x1b[32m%s\x1b[0m', 'Hello ChatGPT'); // สีเขียว
            //console.log('\x1b[31m%s\x1b[0m', 'Hello ChatGPT'); // สีแดง
        }
        else
        {
            //console.log("ภาษีที่คำนวณได้ : ", text1 ,"  ไม่เท่ากับ ยอดรวมภาษีมูลค่าเพิ่ม : " , text2 , " Status Test : FAIL");            
            console.log('ภาษีที่คำนวณได้ : ', text1 , '  ไม่เท่ากับ ยอดรวมภาษีมูลค่าเพิ่ม : ', text2 );
            console.log('\x1b[31m%s\x1b[0m', 'Result : FAIL');
            console.log('//-----------------------------------------------');
            
        }
    }
    
}   
//-----------------------------------------------------------------------------------------------------------------------------------
async function GetVat() {
    const chkVat = '//*[@id="oulCreditNoteListVat"]/li/label[1]';   
    const ReChkVat = await page.$(chkVat);
    const chkVat01 = '//*[@id="oulCreditNoteListVat"]/li/label[2]';   
    const ReChkVat01 = await page.$(chkVat01);
    const chkVat02 = '//*[@id="olbCrdditNoteVatSum"]';   
    const ReChkVat02 = await page.$(chkVat02);
    const Price = '//*[@id="olbCrdditNoteCalFCXphGrand"]';   
    const PriceResult = await page.$(Price);
    const BeforePrice = '//*[@id="olbCrdditNoteSumFCXtdNet"]';   
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

  
  async function VerifyVat() {
    await page.waitForTimeout(delay);
     
    //console.log('\x1b[36m%s\x1b[0m', 'ใบรับของ-ใบซื้อสินค้า/บริการ : ทดสอบการ Recal Vat โดยการเปลี่ยนราคาต่อหน่วย จากเดิม 600 เป็น 1000')
    const BeforePrice = '//*[@id="olbCrdditNoteSumFCXtdNetAfHD"]';   //ยอดรวมหลัง ลด/ชาร์จ
    const PriceBefore = await page.$(BeforePrice);
    if (PriceBefore) {
        const Price = await PriceBefore.innerText();  //เก็บค่ายอดรวมหลัง ลด/ชาร์จ
        const PriceAsNumber: number = parseFloat(Price.replace(",", "")); //เก็บค่ายอดรวมหลัง ลด/ชาร์จ แปลงเป็นชนิด Double
        const chkVat01 = '//*[@id="oulCreditNoteListVat"]/li/label[1]';   //Left - ภาษี 7% Left
        const ReChkVat01 = await page.$(chkVat01); 
        const sumVatAmount = '//*[@id="olbCrdditNoteCalFCXphGrand"]'; //จำนวนเงินรวมทั้งสิ้น *ไม่ได้ใช้งาน
        const TotalVatAmount = await page.$(sumVatAmount); //จำนวนเงินรวมทั้งสิ้น *ไม่ได้ใช้งาน
        if (ReChkVat01 && TotalVatAmount) {
            const textVat = await ReChkVat01.innerText();
            const FinalVatAmount = await TotalVatAmount.innerText(); //จำนวนเงินรวมทั้งสิ้น *ไม่ได้ใช้งาน
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

             console.log('ยอดรวมหลังลด/ชาร์จ :', Price ,' ภาษี ', textVat);
            //console.log(`Total amount (include VAT): ${totalAmountIncludeVat.toFixed(2)}`);
            //console.log(`Total amount (exclude VAT): ${totalAmountExcludeVat.toFixed(2)}`);
            //.toFixed(2)

            const SelectsumVat = await page.$('#olbCrdditNoteVatSum');     //ยอดรวมภาษีมูลค่าเพิ่ม
            
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