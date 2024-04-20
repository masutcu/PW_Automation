import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'


/*Test Case 23: Verify address details in checkout page
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Fill all details in Signup and create account
6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
7. Verify ' Logged in as username' at top
8. Add products to cart
9. Click 'Cart' button
10. Verify that cart page is displayed
11. Click Proceed To Checkout
12. Verify that the delivery address is same address filled at the time registration of account
13. Verify that the billing address is same address filled at the time registration of account
14. Click 'Delete Account' button
15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
*/
test.describe.configure({ mode: 'serial' });

let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 23: Verify address details in checkout page', () => {
    let randomFullName, randomEmail;
    test("Navigate url", async () => {
        //reklam
        await page.route("**/*", route => {
            route.request().url().startsWith("https://googleads.") ?
                route.abort() : route.continue();
            return;
        })

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

        //5. Fill all details in Signup and create account

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
    })

    test('Login Form Fill all details', async () => {


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
        await loginForm.getByRole('checkbox', { name: "newsletter" }).click()
        await loginForm.locator("#optin").click()
        await loginForm.locator('#first_name').fill('Test')
        await loginForm.locator('#last_name').fill('BySUTCU')
        await loginForm.locator('#company').fill('IBM')
        await loginForm.locator('#address1').fill('Rose Street')
        await loginForm.locator('#address2').fill('California')
        const country = loginForm.locator('#country')
        await country.selectOption('United States')
        await loginForm.locator('#state').fill('California')
        await loginForm.locator('#city').fill('San Francisco')
        await loginForm.locator('#zipcode').fill('94102')
        await loginForm.locator('#mobile_number').fill('+1 415-239-5065')

        // Click 'Create Account button'

        await loginForm.getByRole('button', { name: 'Create Account' }).click()

        //Verify that 'ACCOUNT CREATED!' is visible
        await expect(page.getByRole('heading', { name: "Account Created!" })).toBeVisible()
    })
    test('Logged in as username and Delete Account', async () => {
        // Click 'Continue' button
        await page.getByRole('link', { name: 'Continue' }).click()

        // Verify that 'Logged in as username' is visible
        await expect(page.getByText(' Logged in as ')).toBeVisible
        await expect(page.getByText(randomFullName)).toBeVisible

    });
    test("Add Products in Cart", async () => {
        //8. Add products to cart

        await page.getByRole('link', { name: 'Products' }).click()
        await page.getByText('View Product').first().scrollIntoViewIfNeeded()

        await page.locator('.single-products').first().hover()
        await page.locator('.add-to-cart').first().click()
        await page.getByRole('button', { name: 'Continue Shopping' }).click()

        await page.locator('(//div[@class="single-products"])[2]').hover()
        await page.getByText('Add to cart').nth(3).click()
        //9. Click 'Cart' button
        await page.getByRole('link', { name: 'Cart' }).click()
        //10. Verify that cart page is displayed
        expect(await page.getByText('Shopping Cart').isVisible()).toBeTruthy();
        //11. Click Proceed To Checkout
        await page.getByText('Proceed To Checkout').click()


    })




    test('Verify Address Details', async () => {

        //12. Verify that the delivery address is same address filled at the time registration of account
        const addressBox = await page.locator('#address_delivery').first().innerText();
        console.log("adres innertext",addressBox)

        let state = process.env.state
        console.log('state: ', process.env.state)
        let city = process.env.city
        console.log('city: ', process.env.city)
        let street = process.env.street
        console.log('street: ', process.env.street)
        let tel = process.env.tel
        console.log('tel: ', process.env.tel)
        let company = process.env.company
        console.log('company: ', process.env.company)
        const variables = [state, city, street, tel, company];
        
        //lambda ile bool bir değişken 
        const containsAllVariables = variables.every(variable => addressBox.includes(variable));
        expect(containsAllVariables).toBeTruthy();
        //13. Verify that the billing address is same address filled at the time registration of account

        const invoiceBox = await page.locator('#address_invoice').innerText();
        console.log("invoice innertext",invoiceBox)
        
        //lambda ile bool bir değişken 
        const containsAllVariablesInInvoice = variables.every(variable => invoiceBox.includes(variable));
        expect(containsAllVariablesInInvoice).toBeTruthy();


    });

    test('Delete account', async () => {

        //14. Click 'Delete Account' button
        await page.getByRole('link', { name: 'Delete Account' }).click()

        //15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await expect(page.getByRole('heading', { name: "Account Deleted!" })).toBeVisible()


    });




})

