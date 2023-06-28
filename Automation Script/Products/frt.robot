*** Settings ***
Library     Selenium2Library


*** Variables ***
${browser}      Chrome
${url_google}   https://www.google.com/
${test_fb}      Facebook
${user_fb}      Your E-mail
${pass_fb}      Your Password


*** Keywords ***
Open Google
  Open Browser  ${url_google}   ${browser}
  Maximize Browser Window
    set Selenium Speed  0.3
Search Facebook

  Input Text      name=q   ${test_fb}
  Click Button    name=btnK
  Wait Until Page Contains    ${test_fb}
  Click Link  https://th-th.facebook.com/

Insert user and password
  Input Text  name=email  ${user_fb} 
  Input Text  name=pass   ${pass_fb}

Click login btn
  Click Element  name=login


*** Test Cases ***
Open Google
Search Facebook
Insert user and password
Click login btn


settings = การเรียกใช้ Library ต่างๆที่มีอยู่ รวมถึง System operation ด้วย
valiables = การกำหนดตัวแปรใหกับค่าที่เราต้องการ เช่น เก็บข้อมูลวันเกิดไว้ในตัวแปร ${bd}
Keyword = เปรียบเสมือน Function หรือ sub ใน vba.net ซึ่งสามารถกำหนดชื่อ Function ได้เองตามใจชอบ
Test case = คือการลงรายละเอียด step การทดสอบระบบ
ซึ่งสามารถเรียกใช้ชื่อ Function จาก Keyword ได้ทันที เมื่อเราได้ทำการสร้าง Function  การทำงานไว้ใน Keyword ดังกล่าวแล้ว
หรือสามารถเรียกใช้ Valiable ก็ได้เช่นกัน ทั้งนี้ สามารถสร้าง ตัวแปร หรือ Function ไว้ในส่วนนี้ก็ได้ แล้วแต่ความถนัดและความเข้าใจของคนทำระบบ