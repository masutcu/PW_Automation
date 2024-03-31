import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'


/*Test Case 1: Register User
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'New User Signup!' is visible
6. Enter name and email address
7. Click 'Signup' button
8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
9. Fill details: Title, Name, Email, Password, Date of birth
10. Select checkbox 'Sign up for our newsletter!'
11. Select checkbox 'Receive special offers from our partners!'
12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
13. Click 'Create Account button'
14. Verify that 'ACCOUNT CREATED!' is visible
15. Click 'Continue' button
16. Verify that 'Logged in as username' is visible
17. Click 'Delete Account' button
18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
*/
test.describe.configure({ mode: 'serial' });

let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('TC1_Register User', () => {
    let randomFullName, randomEmail;
    test("Navigate url", async () => {

        //Navigate to url 'http://automationexercise.com' AND Verify that home page is visible successfully
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

    test('Click on Signup / Login button And Verify New User Signup', async () => {

        //await page.getByText("Login").click()
        //veya
        await page.getByRole('link', { name: ' Signup ' }).click()

        await expect(page.getByRole('heading', { name: "New User Signup!" })).toBeVisible()

        //6. Enter name and email address
        //7. Click 'Signup' button
        //form alanını tanımladık 

        randomFullName = faker.person.fullName()
        console.log(randomFullName)
        //farklı kullanımlar
        //const randomFullName1 = faker.person.fullName({ firstName: 'Ali' })//ismi ali olsun soy isim değişik
        //const randomFullName2 = faker.person.fullName({ sex: 'female' })//cinsiyet hep bayan
        //const randomFullName3 = faker.person.fullName({ lastName: 'SUTCU', sex: 'male' })//soyismi sutcu olan erkek olsun
        randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
        console.log('randomEmail', randomEmail)


        const singUpForm = page.locator('.signup-form').first()
        await singUpForm.getByPlaceholder('Name').pressSequentially(randomFullName, { delay: 100 })
        await singUpForm.getByPlaceholder('Email Address').fill(randomEmail)
        await singUpForm.getByRole('button', { name: 'Signup' }).click()
        //8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible()
    })

    test('Login Form Fill details: Title, Name, Email, Password, Date of birth', async () => {

        //9. Fill details: Title, Name, Email, Password, Date of birth     
        const loginForm = page.locator('.login-form')
        //radio button
        await loginForm.getByRole('radio', { name: 'Mr.' }).first().check()
        //password alanı dolduruyoruz
        await loginForm.getByRole('textbox', { name: "Password" }).pressSequentially(process.env.PSW, { delay: 100 })

        //dropdown
        //page.locator('#days').click()
        const days = loginForm.locator('#days')
        await days.selectOption('13')
        const month = loginForm.locator('#months')
        await month.selectOption('August')
        const year = loginForm.locator('#years')
        await year.selectOption('1990')

        //10. Select checkbox 'Sign up for our newsletter!'
        await loginForm.getByRole('checkbox', { name: "newsletter" }).click()

        //11. Select checkbox 'Receive special offers from our partners!'
        await loginForm.locator("#optin").click()

        //12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        await loginForm.locator('#first_name').fill('mehmet')
        await loginForm.locator('#last_name').fill('sutcu')
        await loginForm.locator('#company').fill('IBM')
        await loginForm.locator('#address1').fill('Rose Strret')
        await loginForm.locator('#address2').fill('California')

        //country dropdown
        const country = loginForm.locator('#country')
        await country.selectOption('United States')

        await loginForm.locator('#state').fill('California')
        await loginForm.locator('#city').fill('San Francisco')
        await loginForm.locator('#zipcode').fill('94102')
        await loginForm.locator('#mobile_number').fill('+1 415-239-5065')

        //13. Click 'Create Account button'

        await loginForm.getByRole('button', { name: 'Create Account' }).click()

        //14. Verify that 'ACCOUNT CREATED!' is visible
        await expect(page.getByRole('heading', { name: "Account Created!" })).toBeVisible()
    })
    test('Logged in as username and Delete Account', async () => {
        //15. Click 'Continue' button
        await page.getByRole('link', { name: 'Continue' }).click()

        //16. Verify that 'Logged in as username' is visible
        await expect(page.getByText(' Logged in as ')).toBeVisible
        await expect(page.getByText(randomFullName)).toBeVisible

        //17. Click 'Delete Account' button
        //await page.getByRole('link', { name: 'Delete Account' }).click()

        //18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        //await expect(page.getByRole('heading', { name: "Account Deleted!" })).toBeVisible()

    });

})

