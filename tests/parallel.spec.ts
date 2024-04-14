
import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

//tc3 ve tc5 i paralel çalıştıracağız. 4 testi 2 worker çalıştıracaktır.
//crossBrowser için ==> Running 12 tests using 6 workers
//terminalden kod: npx playwright test parallel.spec.ts --headed  ==>4 testi 3 browser (yani 12 test ) 6 worker çalıştırır


test.describe.configure({ mode: 'parallel' });

test.describe('TC3_Login User with incorrect email and password', () => {
    test.describe.configure({ mode: 'serial' });
    let randomFullName, randomEmail;
    let page; // Tarayıcı oturumunu burada tanımlıyoruz
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
    });
    test("Navigate url", async () => {
        //2. Navigate to url 'http://automationexercise.com'
        //3. Verify that home page is visible successfully

        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

    test('Click on Login button', async () => {
        //4. Click on 'Signup / Login' button
        //5. Verify 'Login to your account' is visible
        await page.getByRole('link', { name: ' Signup ' }).click()
        await expect(page.getByRole('heading', { name: "Login to your account" })).toBeVisible()

        //6. Enter incorrect email address and password
        //7. Click 'login' button
        //form alanını tanımladık 

        const singUpForm = page.locator('.login-form').first()
        await singUpForm.getByPlaceholder('Email Address').pressSequentially("negative@gmai.com", { delay: 100 })
        await singUpForm.getByPlaceholder('Password').fill('psw777')
        await singUpForm.getByRole('button', { name: 'Login' }).click()
        //8. Verify error 'Your email or password is incorrect!' is visible
        await page.waitForTimeout(1000) //5 sn bekler
        await expect(page.getByText('is incorrect!')).toBeVisible

    })

})
test.describe('TC5_Register User with existing email', () => {
    test.describe.configure({ mode: 'serial' });
    let randomFullName;
    let page; // Tarayıcı oturumunu burada tanımlıyoruz
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
    });
    test("Navigate url", async () => {

        //Navigate to url 'http://automationexercise.com' AND Verify that home page is visible successfully
        await page.goto('/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

    test('Click on Signup button - negative', async () => {

        //await page.getByText("Login").click()
        //veya
        await page.getByRole('link', { name: ' Signup ' }).click()
        await expect(page.getByRole('heading', { name: "New User Signup!" })).toBeVisible()

        //6. Enter name and already registered email address
        //7. Click 'Signup' button

        //form alanını tanımladık 

        randomFullName = faker.person.fullName()
        console.log(randomFullName)
        console.log('registeredEmail', process.env.EMAIL)

        const singUpForm = page.locator('.signup-form').first()
        await singUpForm.getByPlaceholder('Name').pressSequentially(randomFullName, { delay: 100 })
        await singUpForm.getByPlaceholder('Email Address').fill(process.env.EMAIL)
        await singUpForm.getByRole('button', { name: 'Signup' }).click()

        //8. Verify error 'Email Address already exist!' is visible
        await expect(singUpForm.getByText('Email Address already exist!')).toBeVisible()
    })

})


