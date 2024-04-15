import { test, expect } from '@playwright/test'
//Test Case 17: Remove Products From Cart
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Add products to cart
//5. Click 'Cart' button
//6. Verify that cart page is displayed
//7. Click 'X' button corresponding to particular product
//8. Verify that product is removed from the cart


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 17: Remove Products From Cart', () => {

    test("Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'
        //3. Verify that home page is visible successfully
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);

    });

    test("Add Products", async () => {
        //4. Add products to cart      

        await page.getByText('View Product').first().scrollIntoViewIfNeeded()
        await page.locator('.single-products').first().hover()
        await page.locator('.add-to-cart').first().click()
        await page.getByRole('button', { name: 'Continue Shopping' }).click()
        // Hover over second product and click 'Add to cart'
        await page.locator('(//div[@class="single-products"])[2]').hover()
        await page.getByText('Add to cart').nth(3).click()
        await page.getByRole('button', { name: 'Continue Shopping' }).click()

    })
    test("Cart ", async () => {

        //5. Click 'Cart' button
        await page.getByRole('link', { name: 'Cart' }).click()
        //6. Verify that cart page is displayed
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Checkout/);

        //7. Click 'X' button corresponding to particular product
        let firstProductLabel = await page.locator('.cart_description h4').first().textContent()
        console.log('firstProduct :', firstProductLabel)

        await page.locator('.cart_quantity_delete').first().click()
        await page.waitForTimeout(1000)

        //8. Verify that product is removed from the cart
        let newFirstProductLabel = await page.locator('.cart_description h4').first().textContent()
        console.log('newfirstProduct :', newFirstProductLabel)

        expect(firstProductLabel).not.toBe(newFirstProductLabel)


    })

})
