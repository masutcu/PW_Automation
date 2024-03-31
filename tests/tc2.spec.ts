import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'


//Test Case 2: Login User with correct email and password
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click on 'Signup / Login' button
//5. Verify 'Login to your account' is visible
//6. Enter correct email address and password
//7. Click 'login' button
//8. Verify that 'Logged in as username' is visible
//9. Click 'Delete Account' button
//10. Verify that 'ACCOUNT DELETED!' is visible
test.describe.configure({ mode: 'serial' });

let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    //1. Launch browser
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    await page.close();
  });


test.describe('TC2_Login User with correct email and password', () => {
    let randomFullName, randomEmail;
    test( "Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'
        //3. Verify that home page is visible successfully
        
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);
    });
    
    test('Click on Signup / Login button And Verify New User Signup', async () => {
        //4. Click on 'Signup / Login' button
        //5. Verify 'Login to your account' is visible
        await page.getByRole('link', { name: ' Signup ' }).click()
        await expect(page.getByRole('heading', { name: "Login to your account" })).toBeVisible()

        //6. Enter correct email address and password
        //7. Click 'login' button
        //form alanını tanımladık 



        const singUpForm = page.locator('.login-form').first()
        await singUpForm.getByPlaceholder('Email Address').pressSequentially(process.env.EMAIL, { delay: 100 })
        await singUpForm.getByPlaceholder('Password').fill(process.env.PSW)
        await singUpForm.getByRole('button', { name: 'Login' }).click()
        //8. Verify that 'Logged in as username' is visible
        await page.waitForTimeout(1000) //1 sn bekler
        await expect(page.getByText(' Logged in as ')).toBeVisible
        await expect(page.getByText(process.env.USERNAME)).toBeVisible
        //9. Click 'Delete Account' button
        //10. Verify that 'ACCOUNT DELETED!' is visible
        //mail ve kullanıcı bilgileri silinmemesi için yoruma alındı
        //await page.getByRole('link', { name: 'Delete Account' }).click()
        //await expect(page.getByRole('heading', { name: "Account Deleted!" })).toBeVisible()
        
    })   

})


