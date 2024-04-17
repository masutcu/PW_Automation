import { test, expect } from '@playwright/test'
//Test Case 19: View & Cart Brand Products
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Click on 'Products' button
//4. Verify that Brands are visible on left side bar
//5. Click on any brand name
//6. Verify that user is navigated to brand page and brand products are displayed
//7. On left side bar, click on any other brand link
//8. Verify that user is navigated to that brand page and can see products


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 19: View & Cart Brand Products', () => {

    test("Navigate url and Products Field", async () => {
        //2. Navigate to url 'http://automationexercise.com'       
        await page.goto('/');
        //reklam - reklam çıkmadan önceki adımda eklenmelidir.
        await page.route("**/*", route => {
            route.request().url().startsWith("https://googleads.") ?
                route.abort() : route.continue();
            return;
        })
        await page.getByRole('link', { name: 'Products' }).click()

    });

    test("Brands Part", async () => {
        //4. Verify that Brands are visible on left side bar
        const leftsidebar = page.locator('.left-sidebar')

        expect(await leftsidebar.getByText('Brands').isVisible()).toBeTruthy()

        //5. Click on any brand name
        await leftsidebar.getByText('Madame').click()

        //6. Verify that user is navigated to brand page and brand products are displayed
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Madame Products/);

        expect(await page.getByText('Brand - Madame Products ').isVisible()).toBeTruthy()

        //7. On left side bar, click on any other brand link
        await leftsidebar.getByText('Kookie Kids').click()
        //8. Verify that user is navigated to that brand page and can see products
        const title2 = await page.title();
        console.log("Sayfa Başlığı:", title2);
        await expect(page).toHaveTitle(/Kookie Kids/);

        expect(await page.getByText('Brand - Kookie Kids Products').isVisible()).toBeTruthy()

    })


})
