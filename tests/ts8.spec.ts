import { test, expect } from '@playwright/test'
//Test Case 8: Verify All Products and product detail page
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click on 'Products' button
//5. Verify user is navigated to ALL PRODUCTS page successfully
//6. The products list is visible
//7. Click on 'View Product' of first product
//8. User is landed to product detail page
//9. Verify that detail detail is visible: product name, category, price, availability, condition, brand


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('TC8_Verify All Products and product detail page', () => {

    test("Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'
        //3. Verify that home page is visible successfully
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);

    });

    test("Product Page", async () => {
        //4. Click on 'Products' button
        //5. Verify user is navigated to ALL PRODUCTS page successfully
        await page.getByRole('link', { name: 'Products' }).click()
        //reklam
        await page.goBack()
        await page.goForward()
        await page.waitForTimeout(2000)
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible()
        //6. The products list is visible
        const productList=page.locator('.single-products')
        //listedeki tüm ürünlerin görünürlüğünü test ediyoruz
        for (const product of await productList.all()) {
            //console.log(product)
            expect(await product.isVisible()).toBeTruthy()
        }

        //7. Click on 'View Product' of first product
        const items = page.locator('.features_items')
        await items.getByText('View Product').first().click()

         //reklam
         await page.goBack()
         await page.goForward()
         await page.waitForTimeout(2000)

        //8. User is landed to product detail page
        //9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
        
        
        console.log("başlık2: ", await page.title())
        await expect(page).toHaveTitle(/Product Details/);
        
       
        //Xpath ile çalışıldı
        let title=page.locator('(//h2)[3]')
        let catagory=page.locator('//p[text()="Category: Women > Tops"]')
        let price=page.locator('(//span)[13]')
        let availability=page.locator('//b[text()="Availability:"]')
        let condition=page.locator('//b[text()="Condition:"]')
        let brand=page.locator('//b[text()="Brand:"]')

        // Tüm elementleri bir diziye yerleştirme
        const elements = [title, catagory, price, availability, condition, brand];

        // Her bir elementin görünürlüğünü kontrol etme
        for (const element of elements) {
            if (element)
                expect(await element.isVisible()).toBeTruthy();
            else
                console.error(element,': Element bulunamadı!');
        }


    })

})
