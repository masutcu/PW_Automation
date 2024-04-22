import { test, expect } from '@playwright/test'

//Test Case 20: Search Products and Verify Cart After Login
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Click on 'Products' button
//4. Verify user is navigated to ALL PRODUCTS page successfully
//5. Enter product name in search input and click search button
//6. Verify 'SEARCHED PRODUCTS' is visible
//7. Verify all the products related to search are visible
//8. Add those products to cart
//9. Click 'Cart' button and verify that products are visible in cart
//10. Click 'Signup / Login' button and submit login details
//11. Again, go to Cart page
//12. Verify that those products are visible in cart after login as well


let page; // Tarayıcı oturumunu burada tanımlıyoruz
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
});
test.afterAll(async () => {
    //await page.close();
});


test.describe('Test Case 20: Search Products and Verify Cart After Login', () => {

    let ilkUrun;
    let ikinciUrun;

    test("Navigate url and Products Field", async () => {
        //reklam - reklam çıkmadan önceki adımda eklenmelidir.
        await page.route("**/*", route => {
            route.request().url().startsWith("https://googleads.") ?
                route.abort() : route.continue();
            return;
        })

        //2. Navigate to url 'http://automationexercise.com'       
        await page.goto('/');

        await page.getByRole('link', { name: 'Products' }).click()




    });

    test("Products - Search Input", async () => {

        //4. Verify user is navigated to ALL PRODUCTS page successfully
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/All Products/);

        //5. Enter product name in search input and click search button
        let aranan = "Jeans"
        await page.getByPlaceholder('Search Product').pressSequentially(aranan, { delay: 100 })

        await page.locator('#submit_search').click()

        //6. Verify 'SEARCHED PRODUCTS' is visible
        expect(await page.getByText('Searched Products').isVisible()).toBeTruthy()

        //7. Verify all the products related to search are visible
        const titleList = page.locator("div[class='single-products'] p")
        //veya: page.$$("div[class='single-products'] p") ile locate alabiliriz.bu şekilde bir list döner ve loop içinde all() metodu kullanmaya gerek kalmaz.
        let found = false
        for (let title of await titleList.all()) {
            let kelime = await title.innerText()
            console.log("baslık : ", kelime)
            if (kelime.includes(aranan)) {
                found = true;
            }
        }
        expect(found).toBe(true);

        //8. Add those products to cart
        //scroll
        await page.evaluate(() => {
            window.scrollTo(0, 500)
        })

        //çıkan ürün sayısınca hepsini ekleyecek 
        let numberOfElements = await page.locator("[class='productinfo text-center']").count()
        console.log('Ürün sayısı: ', numberOfElements)


        for (let num = 0; num < numberOfElements; num++) {
            await page.locator('.single-products').nth(num).hover()
            await page.locator("[class='overlay-content'] [class='btn btn-default add-to-cart']").nth(num).click()
            await page.getByRole('button', { name: 'Continue Shopping' }).click()

        }


    })
    test("Cart ", async () => {

        //9. Click 'Cart' button and verify that products are visible in cart
        await page.getByRole('link', { name: 'Cart' }).click()
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Checkout/);

        //ilk ürün görünürlüğü
        expect(await page.locator('td[class="cart_description"]').first().isVisible()).toBeTruthy();
        ilkUrun = await page.locator('td[class="cart_description"]').first().textContent()
        console.log('ilk ürün :', ilkUrun)
        expect(await page.locator('td[class="cart_description"]').last().isVisible()).toBeTruthy();



    })
    test('Click on Login button', async () => {
        //10. Click 'Signup / Login' button and submit login details

        await page.getByRole('link', { name: ' Login ' }).click()
        await expect(page.getByRole('heading', { name: "Login to your account" })).toBeVisible()

        //form alanını tanımladık 

        const singUpForm = page.locator('.login-form').first()
        await singUpForm.getByPlaceholder('Email Address').pressSequentially(process.env.EMAIL, { delay: 100 })
        await singUpForm.getByPlaceholder('Password').fill(process.env.PSW)
        await singUpForm.getByRole('button', { name: 'Login' }).click()

        //11. verify login and  go to Cart page
        await page.waitForTimeout(1000) //5 sn bekler
        await expect(page.getByText(' Logged in as ')).toBeVisible
        await expect(page.getByText(process.env.USERNAME)).toBeVisible

        await page.getByRole('link', { name: 'Cart' }).click()

        //12. Verify that those products are visible in cart after login as well
        expect(await page.locator('td[class="cart_description"]').first().isVisible()).toBeTruthy();
        ikinciUrun = await page.locator('td[class="cart_description"]').first().textContent()
        console.log('ikinci ilk ürün :', ikinciUrun)
        expect(ilkUrun).toEqual(ikinciUrun);


    })


})