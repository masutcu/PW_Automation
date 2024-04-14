import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
/*
Test Case 14: Place Order: Register while Checkout
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Add products to cart
5. Click 'Cart' button
6. Verify that cart page is displayed
7. Click Proceed To Checkout
8. Click 'Register / Login' button
9. Fill all details in Signup and create account
10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
11. Verify ' Logged in as username' at top
12.Click 'Cart' button
13. Click 'Proceed To Checkout' button
14. Verify Address Details and Review Your Order
15. Enter description in comment text area and click 'Place Order'
16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
17. Click 'Pay and Confirm Order' button
18. Verify success message 'Your order has been placed successfully!'
19. Click 'Delete Account' button
20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
*/


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 14: Place Order: Register while Checkout', () => {
    let fullName, randomEmail;
    let state = 'California'
    let city = 'San Francisco'
    let tel = '+1 415-239-5065'
    let street = 'Rose Street'
    let company = 'IBM'
    let surname = 'SUTCU'

    test("Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'
        //3. Verify that home page is visible successfully
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);

    });

    test("Add 2 Product to Cart", async () => {

        //4. Add products to cart    
        await page.getByText('View Product').first().scrollIntoViewIfNeeded()
        //await page.evaluate(()=>{window.scrollTo(0,500)})

        await page.locator('.single-products').first().hover()
        await page.locator('.add-to-cart').first().click()
        await page.getByRole('button', { name: 'Continue Shopping' }).click()


        await page.locator('.single-products').nth(1).hover()
        await page.getByText('Add to cart').nth(3).click()
        //5. Click 'Cart' button
        await page.getByText('View Cart').click()
        //6. Verify that cart page is displayed
        // URL'nin "viewcart" uzantısını içerip içermediğini kontrol et
        if (page.url().includes('view_cart')) {
            console.log('Sayfa adresi "viewcart" uzantısını içeriyor.');
        } else {
            console.log('Sayfa adresi "viewcart" uzantısını içermiyor.');
        }

        //7. Click Proceed To Checkout
        await page.getByText('Proceed To Checkout').click()
        //8. Click 'Register / Login' button
        await page.getByRole('link', { name: 'Register' }).click()


    })
    test("Sing Up", async () => {

        //9. Fill all details in Signup and create account

        //form alanını tanımladık 

        fullName = "Test bySutcu"
        randomEmail = `${fullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
        console.log('randomEmail', randomEmail)

        const singUpForm = page.locator('.signup-form').first()
        await singUpForm.getByPlaceholder('Name').pressSequentially(fullName, { delay: 100 })
        await singUpForm.getByPlaceholder('Email Address').fill(randomEmail)
        await singUpForm.getByRole('button', { name: 'Signup' }).click()
        await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible()

    })
    test('Create ACCOUNT - Login Form ', async () => {
        //10. Verify 'ACCOUNT CREATED!' and click 'Continue' button

        const loginForm = page.locator('.login-form')
        //radio button
        await loginForm.getByRole('radio', { name: 'Mr.' }).first().check()
        //password alanı dolduruyoruz
        await loginForm.getByRole('textbox', { name: "Password" }).pressSequentially(process.env.PSW1, { delay: 100 })
        //dropdown
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
        await loginForm.locator('#first_name').fill('Testby')
        await loginForm.locator('#last_name').fill(surname)
        await loginForm.locator('#company').fill(company)
        await loginForm.locator('#address1').fill(street)
        await loginForm.locator('#address2').fill(state)

        //country dropdown
        const country = loginForm.locator('#country')
        await country.selectOption('United States')

        await loginForm.locator('#state').fill(state)
        await loginForm.locator('#city').fill(city)
        await loginForm.locator('#zipcode').fill('94102')
        await loginForm.locator('#mobile_number').fill(tel)

        //Click 'Create Account button'

        await loginForm.getByRole('button', { name: 'Create Account' }).click()

        //Verify that 'ACCOUNT CREATED!' is visible
        await expect(page.getByRole('heading', { name: "Account Created!" })).toBeVisible()
        await page.getByRole('link', { name: 'Continue' }).click()


    })

    test('Logged in as username and Delete Account', async () => {
        //11. Verify ' Logged in as username' at top
        //top dediği için header da aradık
        await expect(page.locator('#header')).toContainText('Logged in as')
        await expect(page.locator('#header')).toContainText(fullName)
        //await expect(page.getByText(' Logged in as ')).toBeVisible
        //await expect(page.getByText(randomFullName)).toBeVisible
        //12.Click 'Cart' button
        await page.getByRole('link', { name: ' Cart ' }).click()
        //13. Click 'Proceed To Checkout' button
        await page.getByText('Proceed To Checkout').click()



    });
    test('Verify Address Details and Review Your Order', async () => {
        //14. Verify Address Details and Review Your Order
        const addressBox = await page.locator('#address_delivery').innerText();
        const variables = [surname, state, city, street, tel, company];
        //lambda ile bool bir değişken 
        const containsAllVariables = variables.every(variable => addressBox.includes(variable));
        expect(containsAllVariables).toBeTruthy();

        //verify order
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
        //15.Enter description in comment text area and click 'Place Order'
        await page.locator('.form-control').fill('Kırmadan dökmeden getirin lütfen. Thanks...')
        await page.getByRole('link', { name: 'Place Order' }).click()
        //reklam
        await page.goBack()
        await page.goForward()

    });
    test('Payment Detail Form', async () => {
        //16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        //17. Click 'Pay and Confirm Order' button
        await page.locator('.form-control').first().fill(fullName)
        await page.locator('.form-control').nth(1).fill('1234123412341234')
        await page.locator('.form-control').nth(2).fill('123')
        await page.locator('.form-control').nth(3).fill('01')
        await page.locator('.form-control').nth(4).fill('2054')
        /*Bu bİr ALERT Message
        page.on('dialog', async (d) => {
            console.log("message: ", d.message());
            expect(d.message()).toContain("Your order has been placed successfully!")
        })*/
        await page.waitForTimeout(1000)
        await page.locator('.form-control').nth(5).click()
        await page.waitForTimeout(1000)
        await page.goBack()
        

        //18. Verify success message 'Your order has been placed successfully!'  
        //div[id='success_message'] 
        const message = await page.locator("div[id='success_message'] div[class='alert-success alert']").innerText();
        //xpath:"//div[contains(text(),'Your order has been placed successfully!')]"       
        console.log("message: ", message)
        expect(message).toContain("Your order has been placed successfully!")
        await page.goForward()
    })
    test('Delete Account', async () => {

        //19. Click 'Delete Account' button
        await page.locator('.fa-trash-o').click()
        //20. Verify 'ACCOUNT DELETED!' and click 'Continue' button

        expect(await page.locator('h2 b').innerText()).toBe('ACCOUNT DELETED!')

    });

});












