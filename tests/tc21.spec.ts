import { test, expect } from '@playwright/test'

//Test Case 21: Add review on product
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Click on 'Products' button
//4. Verify user is navigated to ALL PRODUCTS page successfully
//5. Click on 'View Product' button
//6. Verify 'Write Your Review' is visible
//7. Enter name, email and review
//8. Click 'Submit' button
//9. Verify success message 'Thank you for your review.'


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 21: Add review on product', () => {



    test("Navigate url and Products Field", async () => {
        //reklam - reklam çıkmadan önceki adımda eklenmelidir.
        await page.route("**/*", route => {
            route.request().url().startsWith("https://googleads.") ?
                route.abort() : route.continue();
            return;
        })

        //2. Navigate to url 'http://automationexercise.com'       
        await page.goto('/');

        await page.getByRole('link', { name: 'Products' }).click()

    });

    test("Review Field", async () => {

        //4. Verify user is navigated to ALL PRODUCTS page successfully
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/All Products/);

        //5. Click on 'View Product' button      
        await page.getByText('View Product').nth(3).click()

        //6. Verify 'Write Your Review' is visible
        expect(await page.getByText('Write Your Review').isVisible()).toBeTruthy()

        //7. Enter name, email and review
        await page.getByPlaceholder('Your Name').fill('Test BySutcu')
        await page.getByPlaceholder('Email Address').first().fill('tester@test.com')
        await page.getByPlaceholder('Add Review Here!').fill('Harika bir site. Tesekkur ederim.')
        //8. Click 'Submit' button
        await page.getByRole('button', { name: 'Submit' }).click()
        //9. Verify success message 'Thank you for your review.'
        expect(await page.getByText('Thank you for your review.').isVisible()).toBeTruthy()


    })


})