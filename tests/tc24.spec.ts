import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'





/*Test Case 24: Download Invoice after purchase order
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
19. Click 'Download Invoice' button and verify invoice is downloaded successfully.
20. Click 'Continue' button
21. Click 'Delete Account' button
22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
*/
test.describe.configure({ mode: 'serial' });

let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 24: Download Invoice after purchase order', () => {
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

    test("Add Products in Cart", async () => {
        //4. Add products to cart
        //await page.getByRole('link', { name: 'Products' }).click()
        await page.getByText('View Product').first().scrollIntoViewIfNeeded()

        await page.locator('.single-products').first().hover()
        await page.locator('.add-to-cart').first().click()
        await page.getByRole('button', { name: 'Continue Shopping' }).click()

        await page.locator('(//div[@class="single-products"])[2]').hover()
        await page.getByText('Add to cart').nth(3).click()
        //5. Click 'Cart' button
        await page.getByRole('link', { name: 'Cart' }).click()
        //6. Verify that cart page is displayed
        expect(await page.getByText('Shopping Cart').isVisible()).toBeTruthy();
        //7. Click Proceed To Checkout
        await page.getByText('Proceed To Checkout').click()


    })


    test('Click Register / Login button ', async () => {

        await page.getByText("Register / Login").last().click()
        await expect(page.getByRole('heading', { name: "New User Signup!" })).toBeVisible()

        // Fill all details in Signup and create account

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
        // Click 'Continue' button
        await page.getByRole('link', { name: 'Continue' }).click()
    })
    test('verify Logged in as username', async () => {

        // 11.Verify that 'Logged in as username' 
        await expect(page.getByText(' Logged in as ')).toBeVisible
        await expect(page.getByText(randomFullName)).toBeVisible

    });

    test('Click Cart Button and Proceed to Checkout', async () => {

        //12. Click 'Cart' button
        await page.getByRole('link', { name: 'Cart' }).click()
        //Verify that cart page is displayed
        expect(await page.getByText('Shopping Cart').isVisible()).toBeTruthy();
        //13. Click Proceed To Checkout
        await page.getByText('Proceed To Checkout').click()

    });

    test('Verify Address Details and Review Your Order', async () => {
        //14. Verify Address Details and Review Your Order
        const addressBox = await page.locator('#address_delivery').innerText();
        let surname = process.env.surname
        let state = process.env.state
        let city = process.env.city
        let street = process.env.street
        let tel = process.env.tel
        let company = process.env.company
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
        //15. Enter description in comment text area and click 'Place Order'
        //await page.locator('.form-control').fill('Kırmadan dökmeden getirin lütfen. Thanks...')
        await page.type('.form-control','Kırmadan dökmeden getirin lütfen. Thanks...')
        await page.getByRole('link', { name: 'Place Order' }).click()

    });
    test('Payment Detail Form', async () => {
        //16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        //17. Click 'Pay and Confirm Order' button
        await page.locator('.form-control').first().fill("Test BySUTCU")
        await page.locator('.form-control').nth(1).fill('1234123412341234')
        await page.locator('.form-control').nth(2).fill('123')
        await page.locator('.form-control').nth(3).fill('01')
        await page.locator('.form-control').nth(4).fill('2054')
        await page.waitForTimeout(1000)
        await page.locator('.form-control').nth(5).click()
        await page.waitForTimeout(1000)
        await page.goBack()
        


        //18. Verify success message 'Your order has been placed successfully!'  
        const message = await page.locator("div[id='success_message'] div[class='alert-success alert']").innerText();
        console.log("message: ", message)
        expect(message).toContain("Your order has been placed successfully!")
        await page.goForward()

    })
    test('Download Invoice', async () => {

        //19. Click 'Download Invoice' button and verify invoice is downloaded successfully.
        //20. Click 'Continue' button
        
        // Start waiting for download before clicking. Note no await.
        const downloadPromise = page.waitForEvent('download');
        await page.getByText('Download Invoice').click();
        const download = await downloadPromise;
        const downloadName= await download.suggestedFilename()
      
        // Wait for the download process to complete and save the downloaded file somewhere.
        //await download.saveAs('C:/Users/Lenovo/Desktop/' + download.suggestedFilename()); //masaüstüne indirmek için
        
        console.log("downloadName: ", downloadName)
        //await download.saveAs('C:/Users/Lenovo/Desktop/PlayWright/PW_AutomationExercises/' + download.suggestedFilename());
        await download.saveAs('C:/Users/Lenovo/Desktop/PlayWright/PW_AutomationExercises/' + downloadName);
       
        //yükleme işlemini doğrulamak için 
        const fs = require('fs');
        const path = require('path');

        const dosyaYolu = 'C:\\Users\\Lenovo\\Desktop\\PlayWright\\PW_AutomationExercises\\'+downloadName;

        // Dosyanın varlığını kontrol et
        fs.access(dosyaYolu, fs.constants.F_OK, (err) => {
            if (err) {
            console.error('Dosya bulunamadı:', err);
            } else {
            console.log('Dosya bulundu');
        }
        });
   
        await page.getByText('Continue').click()

    });


    test('Delete account', async () => {

        //21. Click 'Delete Account' button
        //22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await page.getByRole('link', { name: 'Delete Account' }).click()
        await expect(page.getByRole('heading', { name: "Account Deleted!" })).toBeVisible()

    });




})

