import { test, expect } from '@playwright/test'
//Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Scroll down page to bottom
//5. Verify 'SUBSCRIPTION' is visible
//6. Scroll up page to top
//7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', () => {

    test("Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'
        //3. Verify that home page is visible successfully
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);

    });

    test("Verify Subscription in home page", async () => {
        //4. Scroll down to buttom

        // Sayfa sonuna gitmek için JavaScript kodunu kullanıyoruz
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight); //tam dibi
            //window.scrollTo(0, 500);//biraz -birsayfa- aşağı kaydırmak için
        });

        //5. Verify text 'SUBSCRIPTION'
        expect(await page.getByText('SUBSCRIPTION').isVisible()).toBeTruthy();

        //6. Scroll up page to top
        await page.evaluate(() => {
            window.scrollTo(0, 0); //en üst
            //window.scrollTo(0, 500);//biraz -birsayfa- aşağı kaydırmak için
        });

        //7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
        
        expect(await page.locator('[class=col-sm-6] h2', {hastext:'Full-Fledged practice website for Automation Engineers'}).first().isVisible()).toBeTruthy();
        await page.screenshot({ path: 'screenshot.png' });
        await page.screenshot({ path: 'screenshotFullPage.png', fullPage: true });



    })

})
