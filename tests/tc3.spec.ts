
import { test, expect } from '@playwright/test'

//Test Case 3: Login User with incorrect email and password
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click on 'Signup / Login' button
//5. Verify 'Login to your account' is visible
//6. Enter incorrect email address and password
//7. Click 'login' button
//8. Verify error 'Your email or password is incorrect!' is visible

test.describe.configure({ mode: 'serial' });

let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    //1. Launch browser
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    await page.close();
});


test.describe('Register User', () => {
    let randomFullName, randomEmail;
    test("Navigate url", async () => {
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

        //6. Enter incorrect email address and password
        //7. Click 'login' button
        //form alanını tanımladık 

        const singUpForm = page.locator('.login-form').first()
        await singUpForm.getByPlaceholder('Email Address').pressSequentially("negative@gmai.com", { delay: 100 })
        await singUpForm.getByPlaceholder('Password').fill('psw777')
        await singUpForm.getByRole('button', { name: 'Login' }).click()
        //8. Verify error 'Your email or password is incorrect!' is visible
        await page.waitForTimeout(1000) //5 sn bekler
        await expect(page.getByText('is incorrect!')).toBeVisible

    })

})


