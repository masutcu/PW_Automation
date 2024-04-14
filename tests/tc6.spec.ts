import { test, expect } from '@playwright/test'

/*
BU TASK İÇERİSİNDE loadFile, alert window, iframe, navigate browser,
Test Case 6: Contact Us Form
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Contact Us' button
5. Verify 'GET IN TOUCH' is visible
6. Enter name, email, subject and message
7. Upload file
8. Click 'Submit' button
9. Click OK button
10. Verify success message 'Success! Your details have been submitted successfully.' is visible
11. Click 'Home' button and verify that landed to home page successfully
*/
test.describe.configure({ mode: 'serial' });

let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 6: Contact Us Form', () => {
    
    test("Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'
        //3. Verify that home page is visible successfully
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);
        console.log("widht : ", await page.viewportSize().widht)
        console.log("height", await page.viewportSize().height)
    });

    test('Contact Us', async () => {

        //4. Click on 'Contact Us' button
        //5. Verify 'GET IN TOUCH' is visible
        await page.getByRole('link', { name: ' Contact us ' }).click()
        await expect(page.getByRole('heading', { name: "Get In Touch" })).toBeVisible()

        //6. Enter name, email, subject and message
        //form alanını tanımladık 

        const singUpForm = page.locator('.contact-form.row')
        await singUpForm.getByPlaceholder('Name').pressSequentially("Mehmet Sutcu", { delay: 100 })
        await singUpForm.getByPlaceholder('Email').fill("testMS@test.com")
        await singUpForm.getByPlaceholder('Subject').fill("Test Subject 00")
        await singUpForm.getByPlaceholder('Your Message Here').fill("This test is executing by Playwright Automation Tool.")

        //7. Upload file
        // Dosya yükleme input elementine tıkla
        const fileInput = await singUpForm.locator('.form-control').last();
        //await fileInput.click();

        // Dosya yolu belirt
        const filePath = 'C:/Users/Lenovo/Desktop/PlayWright/PW_AutomationExercises/onyazılımlıgo.png' // Yüklemek istediğiniz dosyanın yolu
        await fileInput.setInputFiles(filePath);

         // Alert'i kabul et
         page.on('dialog', async (d)=>{
            expect(d.type()).toContain("confirm")          
            console.log(d.message());
            expect(d.message()).toContain("Press OK to proceed!")
            await d.accept() //diğer seçenek dissmiss()
    
        })
      
        await singUpForm.getByText('Submit').click()
              
        // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
        await page.waitForTimeout(3000)
        const text = await page.locator(".status.alert-success").textContent();
        console.log(text);      
        expect(text).toBe("Success! Your details have been submitted successfully.");
        
        // 11. Click 'Home' button and verify that landed to home page successfully
        await page.locator('.fa-angle-double-left').click({ force: true });
        
        //burada iframe reklam açılıyor, reload() ile olmadı
    
        await page.goBack()
        await page.goForward()
        await page.waitForTimeout(2000)
        
        await page.waitForTimeout(2000)
        //Burada iframe var
        /*
        const allframes= await page.frames()
        console.log("frame sayısı : ",allframes.length)
        const frame=page.iframe('aswift_1')
        await frame.locator("#dismiss-button").click({force:true})
        */

        // "Home" sayfasının yüklendiğini kontrol et
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);


    })
})