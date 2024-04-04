import { test, expect } from '@playwright/test'
//Test Case 9: Search Product
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click on 'Products' button
//5. Verify user is navigated to ALL PRODUCTS page successfully
//6. Enter product name in search input and click search button
//7. Verify 'SEARCHED PRODUCTS' is visible
//8. Verify all the products related to search are visible


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 9: Search Product', () => {

    test("Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'
        //3. Verify that home page is visible successfully
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);

    });

    test("Search Product", async () => {
        //4. Click on 'Products' button
        //5. Verify user is navigated to ALL PRODUCTS page successfully
        await page.getByRole('link', { name: 'Products' }).click()
        //reklam
        await page.goBack()
        await page.goForward()
        await page.waitForTimeout(2000)
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible()

        //6. Enter product name in search input and click search button
        //7. Verify 'SEARCHED PRODUCTS' is visible
        //8. Verify all the products related to search are visible
        const searchText = "Jeans"
        await page.getByRole('textbox', { name: 'search' }).pressSequentially(searchText, { delay: 100 })
        await page.locator('#submit_search').click()

        expect(await page.getByText('Searched Products').isVisible()).toBeTruthy()

        //const productTitleList = page.locator("//div[@class='productinfo text-center']//p")
        const productTitleList = page.locator("div[class='productinfo text-center']")

        // Her bir elementin text içeriğini kontrol et
        for (const title of await productTitleList.all()) {
            const elementText = await title.innerText();
            if (elementText.includes(searchText)) {
                console.log("Element içinde '"+searchText+"' kelimesi bulundu.");
            } else {
                console.log(`Element içinde '${searchText}' kelimesi bulunamadı.`); //farklı kullanımlar
                //console.log("Element içinde '" , searchText , "' kelimesi bulunamadı.");
            }
        }











    })

})
