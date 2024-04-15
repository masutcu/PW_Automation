import { test, expect } from '@playwright/test'
//Test Case 12: Add Products in Cart
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click on 'Products' button
//5. Hover over first product and click 'Add to cart'
//6. Click 'Continue Shopping' button
//7. Hover over second product and click 'Add to cart'
//8. Click 'View Cart' button
//9. Verify both products are added to Cart
//10. Verify their prices, quantity and total price


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 12: Add Products in Cart', () => {

    test("Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'
        //3. Verify that home page is visible successfully
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);

    });

    test("Add Products in Cart", async () => {
        //4. Click on 'Products' button  
        
        //reklam
        await page.route("**/*", route => {
            route.request().url().startsWith("https://googleads.") ?
              route.abort() : route.continue();
            return;
          })
        
        await page.getByRole('link', { name: 'Products' }).click()

        //5. Hover over first product and click 'Add to cart'
        //6. Click 'Continue Shopping' button
        await page.getByText('View Product').first().scrollIntoViewIfNeeded()

        await page.locator('.single-products').first().hover()
        await page.locator('.add-to-cart').first().click()
        await page.getByRole('button', { name: 'Continue Shopping' }).click()
        //7. Hover over second product and click 'Add to cart'
        await page.locator('(//div[@class="single-products"])[2]').hover()
        await page.getByText('Add to cart').nth(3).click()
        //8. Click 'View Cart' button
        await page.getByText('View Cart').click()
        //9. Verify both products are added to Cart
        const elements = await page.locator('.cart_description').count();
        // Locator uzunluğunu kontrol et
        expect(elements).toBe(2);

        //10. Verify their prices, quantity and total price
        const price1 = await page.locator('.cart_price').first().textContent()
        const num1 = parseInt(price1.split(' ')[1]);
        console.log('price1: ', num1);

        const price2 = await page.locator('.cart_price').last().textContent()
        const num2 = parseInt(price2.split(' ')[1]);
        console.log('price2: ', num2);

        const quantity1 = await page.locator('.cart_quantity').first().textContent()
        const qua1 = parseInt(quantity1);
        console.log('quantity1: ', qua1);

        const quantity2 = await page.locator('.disabled').last().textContent()
        const qua2 = parseInt(quantity2);
        console.log('quantity2: ', qua2);

        const total1 = await page.locator('.cart_total_price').first().textContent()
        const top1 = parseInt(total1.split(' ')[1]);
        console.log('total1: ', top1);

        const total2 = await page.locator('.cart_total_price').last().textContent()
        const top2 = parseInt(total2.split(' ')[1]);
        console.log('total2: ', top2);


        expect(top1).toEqual(num1 * qua1)
        expect(top2).toEqual(num2 * qua2)


    })

})
