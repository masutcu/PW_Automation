import { test, expect } from '@playwright/test'
//Test Case 18: View Category Products
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that categories are visible on left side bar
//4. Click on 'Women' category
//5. Click on any category link under 'Women' category, for example: Dress
//6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
//7. On left side bar, click on any sub-category link of 'Men' category
//8. Verify that user is navigated to that category page


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 18: View Category Products', () => {

    test("Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'       
        await page.goto('/');

    });

    test("Catagories Part - Women", async () => {
        //3. Verify that categories are visible on left side bar 
        const leftsidebar = page.locator('.left-sidebar')
        expect(await leftsidebar.getByText('Category').isVisible()).toBeTruthy()
        //4. Click on 'Women' category
        await leftsidebar.getByText('WOMEN').click()
        //5. Click on any category link under 'Women' category, for example: Dress
        const womanbar = page.locator('#Women')
        expect(await womanbar.getByText('Dress ').isVisible()).toBeTruthy()
        expect(await womanbar.getByText('Tops ').isVisible()).toBeTruthy()
        await womanbar.getByText('Tops ').click()
        
        //6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
        //reklam
        await page.route("**/*", route => {
            route.request().url().startsWith("https://googleads.") ?
              route.abort() : route.continue();
            return;
          })
        //await page.goBack()
        //await page.goForward()
        //await page.waitForTimeout(1000)
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Tops Products/);

        expect(await page.locator('[class="title text-center"]').innerText()).toBe('WOMEN - TOPS PRODUCTS')




    })
    test("Catagories Part - Men", async () => {
        //7. On left side bar, click on any sub-category link of 'Men' category     
        const leftsidebar = page.locator('.left-sidebar')
        await leftsidebar.locator('[href="#Men"]').click()
        //8. Verify that user is navigated to that category page
        const menbar = page.locator('#Men')
        expect(await menbar.getByText('Tshirts ').isVisible()).toBeTruthy()
        expect(await menbar.getByText('Jeans ').isVisible()).toBeTruthy()
        await menbar.getByText('Jeans ').click()

        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Jeans Products/);

        expect(await page.locator('[class="title text-center"]').innerText()).toBe('MEN - JEANS PRODUCTS')

    })

})
