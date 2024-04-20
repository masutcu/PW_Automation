import { test, expect } from '@playwright/test'

//Test Case 22: Add to cart from Recommended items
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Scroll to bottom of page
//4. Verify 'RECOMMENDED ITEMS' are visible
//5. Click on 'Add To Cart' on Recommended product
//6. Click on 'View Cart' button
//7. Verify that product is displayed in cart page


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 22: Add to cart from Recommended items', () => {



    test("Navigate url and scroll buttom", async () => {
        //reklam - reklam çıkmadan önceki adımda eklenmelidir.
        await page.route("**/*", route => {
            route.request().url().startsWith("https://googleads.") ?
                route.abort() : route.continue();
            return;
        })

        //2. Navigate to url 'http://automationexercise.com'       
        await page.goto('/');
        //3. Scroll to bottom of page
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight)
        })



    });

    test("Review Field", async () => {

        //4. Verify 'RECOMMENDED ITEMS' are visible
        let recomendedItems = page.locator('.recommended_items')
        expect(await recomendedItems.isVisible()).toBeTruthy();

        //5. Click on 'Add To Cart' on Recommended product (2. ürünü baz alalım) 
        let titleSecondProduct = await page.locator('[class="recommended_items"] p').nth(1).innerText()
        console.log("ikinci tavsiye urunu : ", titleSecondProduct)
        await recomendedItems.locator("[data-product-id='2']").click()

        //6. Click on 'View Cart' button
        await page.getByText('View Cart').click()

        //7. Verify that product is displayed in cart page

        let displayedProduct = await page.locator('#cart_info .cart_description a').innerText()
        console.log("Cart da goruntulenen urun : ", displayedProduct)

        expect(titleSecondProduct).toEqual(displayedProduct)


    })


})