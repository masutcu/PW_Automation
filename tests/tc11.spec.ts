import { test, expect } from '@playwright/test'
//Test Case 11: Verify Subscription in Cart page
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click 'Cart' button
//5. Scroll down to footer
//6. Verify text 'SUBSCRIPTION'
//7. Enter email address in input and click arrow button
//8. Verify success message 'You have been successfully subscribed!' is visible


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 10: Verify Subscription in home page', () => {

    test("Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'
        //3. Verify that home page is visible successfully
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);

    });

    test("Verify Subscription in Cart page", async () => {
        //4. Click 'Cart' button
        await page.getByRole('link', { name: ' Cart ' }).click()

        //5. Scroll down to footer

        //belirli bir alana kadar gitmek isteniyorsa
        await page.getByPlaceholder('Your email address').scrollIntoViewIfNeeded();
        /*
                // Sayfa sonuna gitmek için JavaScript kodunu kullanıyoruz
                await page.evaluate(() => {
                  window.scrollTo(0, document.body.scrollHeight); //tam dibi
                  //window.scrollTo(0, 500);//biraz -birsayfa- aşağı kaydırmak için
                });
        */
        //6. Verify text 'SUBSCRIPTION'
        expect(await page.getByText('SUBSCRIPTION').isVisible()).toBeTruthy();
        //7. Enter email address in input and click arrow button
        await page.getByPlaceholder('Your email address').pressSequentially("testMS@gmail.com", { delay: 100 })
        await page.locator('#subscribe').click()
        //8. Verify success message 'You have been successfully subscribed!' is visible
        expect(await page.getByText('successfully subscribed!').isVisible()).toBeTruthy();

    })

})
