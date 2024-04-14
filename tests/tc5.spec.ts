
import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

//Test Case 5: Register User with existing email
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click on 'Signup / Login' button
//5. Verify 'New User Signup!' is visible
//6. Enter name and already registered email address
//7. Click 'Signup' button
//8. Verify error 'Email Address already exist!' is visible

test.describe.configure({ mode: 'serial' });

let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});

test.describe('TC5_Register User with existing email', () => {
    let randomFullName;
    test("Navigate url", async () => {

        //Navigate to url 'http://automationexercise.com' AND Verify that home page is visible successfully
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

    test('Click on Signup button - negative', async () => {

        //await page.getByText("Login").click()
        //veya
        await page.getByRole('link', { name: ' Signup ' }).click()
        await expect(page.getByRole('heading', { name: "New User Signup!" })).toBeVisible()

        //6. Enter name and already registered email address
        //7. Click 'Signup' button

        //form alanını tanımladık 

        randomFullName = faker.person.fullName()
        console.log(randomFullName)
        console.log('registeredEmail', process.env.EMAIL)

        const singUpForm = page.locator('.signup-form').first()
        await singUpForm.getByPlaceholder('Name').pressSequentially(randomFullName, { delay: 100 })
        await singUpForm.getByPlaceholder('Email Address').fill(process.env.EMAIL)
        await singUpForm.getByRole('button', { name: 'Signup' }).click()

        //8. Verify error 'Email Address already exist!' is visible
        await expect(singUpForm.getByText('Email Address already exist!')).toBeVisible()
    })

})

