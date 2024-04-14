import { test, expect } from '@playwright/test'

//Test Case 4: Logout User
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click on 'Signup / Login' button
//5. Verify 'Login to your account' is visible
//6. Enter correct email address and password
//7. Click 'login' button
//8. Verify that 'Logged in as username' is visible
//9. Click 'Logout' button
//10. Verify that user is navigated to login page
test.describe.configure({ mode: 'serial' });

let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    //1. Launch browser
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    await page.close();
});


test.describe('Logout User', () => {
    let randomFullName, randomEmail;
    test("TC4_Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'
        //3. Verify that home page is visible successfully

        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

    test('Click on Login button', async () => {
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
        await page.waitForTimeout(1000) //5 sn bekler
        await expect(page.getByText(' Logged in as ')).toBeVisible
        await expect(page.getByText(process.env.USERNAME)).toBeVisible
        //9. Click 'Logout' button
        await page.getByText(' Logout').click()

        //10. Verify that user is navigated to login page
        await expect(page).toHaveTitle(/Login/)

       
      

    })

})


