import { test, expect } from '@playwright/test'
//Test Case 10: Verify Subscription in home page
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Scroll down to footer
//5. Verify text 'SUBSCRIPTION'
//6. Enter email address in input and click arrow button
//7. Verify success message 'You have been successfully subscribed!' is visible


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

    test("Verify Subscription in home page", async () => {
        //4. Scroll down to footer
        
        // Sayfa sonuna gitmek için JavaScript kodunu kullanıyoruz
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight); //tam dibi
          //window.scrollTo(0, 500);//biraz -birsayfa- aşağı kaydırmak için
        });

        //5. Verify text 'SUBSCRIPTION'
        expect(await page.getByText('SUBSCRIPTION').isVisible()).toBeTruthy();
        //6. Enter email address in input and click arrow button
        await page.getByPlaceholder('Your email address').pressSequentially("testMS@gmail.com", { delay: 100 })
        await page.locator('#subscribe').click()
        //7. Verify success message 'You have been successfully subscribed!' is visible
        expect(await page.getByText('successfully subscribed!').isVisible()).toBeTruthy();

        
        
        
        
        


    })

})
