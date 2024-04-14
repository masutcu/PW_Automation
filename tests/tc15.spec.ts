import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
/*
Test Case 15: Place Order: Register before Checkout
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Signup / Login' button
5. Fill all details in Signup and create account
6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
7. Verify ' Logged in as username' at top
8. Add products to cart
9. Click 'Cart' button
10. Verify that cart page is displayed
11. Click Proceed To Checkout
12. Verify Address Details and Review Your Order
13. Enter description in comment text area and click 'Place Order'
14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
15. Click 'Pay and Confirm Order' button
16. Verify success message 'Your order has been placed successfully!'
17. Click 'Delete Account' button
18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
*/


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 15: Place Order: Register before Checkout', () => {
    let fullName, randomEmail;
    test("Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'
        //3. Verify that home page is visible successfully
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);

    });

    test('Click on Signup  button ', async () => {
        //4. Click 'Signup / Login' button
        await page.getByRole('link', { name: ' Signup ' }).click()
        
        //const randomFullName1 = faker.person.fullName({ firstName: 'Ali' })//ismi ali olsun soy isim değişik
        //const randomFullName2 = faker.person.fullName({ sex: 'female' })//cinsiyet hep bayan
        fullName = faker.person.fullName({ lastName: process.env.surname, sex: 'male' })//soyismi sutcu olan erkek olsun
        console.log(fullName)
        randomEmail = `${fullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
        console.log('randomEmail', randomEmail)


        const singUpForm = page.locator('.signup-form').first()
        await singUpForm.getByPlaceholder('Name').pressSequentially(fullName, { delay: 100 })
        await singUpForm.getByPlaceholder('Email Address').fill(randomEmail)
        await singUpForm.getByRole('button', { name: 'Signup' }).click()
    
    })

    test('Fill all details in Signup and create account', async () => {
        //5. Fill all details in Signup and create account
        //6. Verify 'ACCOUNT CREATED!' and click 'Continue' button   
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

        //Select checkbox 'Sign up for our newsletter!'
        await loginForm.getByRole('checkbox', { name: "newsletter" }).click()

        //Select checkbox 'Receive special offers from our partners!'
        await loginForm.locator("#optin").click()

        //Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        await loginForm.locator('#first_name').fill('Mehmet')
        await loginForm.locator('#last_name').fill(process.env.surname)
        await loginForm.locator('#company').fill(process.env.company)
        await loginForm.locator('#address1').fill(process.env.street)
        await loginForm.locator('#address2').fill(process.env.state)

        //country dropdown
        const country = loginForm.locator('#country')
        await country.selectOption(process.env.country)

        await loginForm.locator('#state').fill(process.env.state)
        await loginForm.locator('#city').fill(process.env.city)
        await loginForm.locator('#zipcode').fill(process.env.zipcode)
        await loginForm.locator('#mobile_number').fill(process.env.tel)

        //Click 'Create Account button'

        await loginForm.getByRole('button', { name: 'Create Account' }).click()

        // Verify that 'ACCOUNT CREATED!' is visible and click continue button
        await expect(page.getByRole('heading', { name: "Account Created!" })).toBeVisible()
        await page.getByRole('link', { name:'Continue'}).click()
        //7. Verify ' Logged in as username' at top
        await expect(page.getByText(' Logged in as ')).toBeVisible
        await expect(page.getByText(fullName)).toBeVisible
    })

    test("Add Products", async () => {
        //8. Add products to cart     
        //reklam
        await page.goBack()
        await page.goForward()
        await page.waitForTimeout(2000)

        //Hover over first product and click 'Add to cart'
        //Click 'Continue Shopping' button
        await page.getByText('View Product').first().scrollIntoViewIfNeeded()
        await page.locator('.single-products').first().hover()
        await page.locator('.add-to-cart').first().click()
        await page.getByRole('button', { name: 'Continue Shopping' }).click()
        //Hover over second product and click 'Add to cart'
        await page.locator('(//div[@class="single-products"])[2]').hover()
        await page.getByText('Add to cart').nth(3).click()
        await page.getByRole('button', { name: 'Continue Shopping' }).click()
        //9. Click 'Cart' button
        await page.getByRole('link', {name:'Cart'}).click()
        //10. Verify that cart page is displayed
        expect(await page.getByText('Shopping Cart').isVisible()).toBeTruthy();
        //11. Click Proceed To Checkout
        await page.getByText('Proceed To Checkout').click()

        
    })
    test('Verify Address Details and Review Your Order', async () => {
        //12. Verify Address Details and Review Your Order
        const addressBox = await page.locator('#address_delivery').innerText();
        let surname=process.env.surname
        let state=process.env.state
        let city=process.env.city
        let street=process.env.street
        let tel=process.env.tel
        let company=process.env.company
        const variables = [surname, state, city, street, tel, company];
        //lambda ile bool bir değişken 
        const containsAllVariables = variables.every(variable => addressBox.includes(variable));
        expect(containsAllVariables).toBeTruthy();

        //verify order (burası task de istenmiyor )
        const price1 = await page.locator('.cart_price').first().textContent()
        const num1 = parseInt(price1.split(' ')[1]);
        console.log('price1: ', num1);

        const price2 = await page.locator('.cart_price').last().textContent()
        const num2 = parseInt(price2.split(' ')[1]);
        console.log('price2: ', num2);

        const quantity1 = await page.locator('.cart_quantity').first().textContent()
        const qua1 = parseInt(quantity1);
        console.log('quantity1: ', qua1);

        const quantity2 = await page.locator('.cart_quantity').last().textContent()
        const qua2 = parseInt(quantity2);
        console.log('quantity2: ', qua2);

        const total1 = await page.locator('.cart_total_price').first().textContent()
        const top1 = parseInt(total1.split(' ')[1]);
        console.log('total1: ', top1);

        const total2 = await page.locator('.cart_total_price').nth(1).textContent()
        const top2 = parseInt(total2.split(' ')[1]);
        console.log('total2: ', top2);

        const total3 = await page.locator('.cart_total_price').nth(2).textContent()
        const top3 = parseInt(total3.split(' ')[1]);
        console.log('totalALL: ', top3);


        expect(top1).toEqual(num1 * qua1)
        expect(top2).toEqual(num2 * qua2)
        expect(top3).toEqual(top1 + top2)


    });
    test('Comment Text - Place Order', async () => {
        //13. Enter description in comment text area and click 'Place Order'
        await page.locator('.form-control').fill('Kırmadan dökmeden getirin lütfen. Thanks...')
        await page.getByRole('link', { name: 'Place Order' }).click()
        //reklam
        await page.goBack()
        await page.goForward()

    });
    test('Payment Detail Form', async () => {
        //14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        //15. Click 'Pay and Confirm Order' button
        await page.locator('.form-control').first().fill(fullName)
        await page.locator('.form-control').nth(1).fill('1234123412341234')
        await page.locator('.form-control').nth(2).fill('123')
        await page.locator('.form-control').nth(3).fill('01')
        await page.locator('.form-control').nth(4).fill('2054')
        await page.waitForTimeout(1000)
        await page.locator('.form-control').nth(5).click()
        await page.waitForTimeout(1000)
        await page.goBack()
        

        //16. Verify success message 'Your order has been placed successfully!'  
        const message = await page.locator("div[id='success_message'] div[class='alert-success alert']").innerText();     
        console.log("message: ", message)
        expect(message).toContain("Your order has been placed successfully!")
        await page.goForward()
    })

    test('Delete Account', async () => {

        //17. Click 'Delete Account' button
        await page.locator('.fa-trash-o').click()
        //18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        expect(await page.locator('h2 b').innerText()).toBe('ACCOUNT DELETED!')

    });


});












