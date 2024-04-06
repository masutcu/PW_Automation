import { test, expect } from '@playwright/test'
//Test Case 13: Verify Product quantity in Cart
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click 'View Product' for any product on home page
//5. Verify product detail is opened
//6. Increase quantity to 4
//7. Click 'Add to cart' button
//8. Click 'View Cart' button
//9. Verify that product is displayed in cart page with exact quantity


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 13: Verify Product quantity in Cart', () => {

    test("Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'
        //3. Verify that home page is visible successfully
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);

    });

    test("Verify Product quantity in Cart", async () => {

        //4. Click 'View Product' for any product on home page    
        await page.locator('[href="/product_details/3"]').click()

        //reklam
        await page.goBack()
        await page.goForward()
        await page.waitForTimeout(2000)

        //5. Verify product detail is opened
        await page.waitForSelector('p b');
        
        let baslıklar=page.locator('.product-details p b')

        let found = false;
        for (let baslık of await baslıklar.all()){
             let kelime=await baslık.innerText()
            console.log("baslık: ",kelime)
            if (kelime.includes("Availability:") || kelime.includes("Condition:") || kelime.includes("Brand:")) {
                found = true;
            }  
        }
        expect(found).toBe(true);

        //6. Increase quantity to 4
        
        //await page.locator('#quantity').fill('4')
        
        //veya BURADA JSCRİPT İLE ELEMENT VALUE DEĞERİ DEĞİŞİKLİĞİ
        // Input alanının value özelliğini değiştir
        const inputElement = await page.locator('#quantity');
        
        await inputElement.evaluate((element: HTMLInputElement) => {
            element.value = '4';
        });

        //7. Click 'Add to cart' button
        await page.getByRole('button', {name:"Add to cart"}).click()
        //8. Click 'View Cart' button
        await page.getByRole('link', {name:"View Cart"}).click()
        //9. Verify that product is displayed in cart page with exact quantity
        let actualQuantity=await page.locator('.disabled').innerText()
        console.log("actual Quantity: ", actualQuantity)
        expect('4').toBe(actualQuantity)


    })

})
