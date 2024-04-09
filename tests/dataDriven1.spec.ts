import { test, expect } from '@playwright/test'
import form from "../login.json"



test.describe('Playwright ile DataDriven Test ', () => {
    
    const testdata = JSON.parse(JSON.stringify(form))


    for (const data of testdata) {
        test.describe(`Login ${data.id}`, () => {
            test('negative', async ({ page }) => {

                await page.goto('/');
                await page.getByRole('link', { name: 'login' }).click();


                const loginForm = page.locator('.login-form')
                await loginForm.getByPlaceholder('Email Address').fill(data.email)
                await loginForm.getByPlaceholder('Password').fill(data.psw)
                console.log("negativePSW_Data==> ", data.psw)
                await loginForm.getByRole('button', { name: "Login" }).click()


                const failMessage = await loginForm.locator('p').innerText()
                expect(failMessage).toBe('Your email or password is incorrect!')

            })


        })

    }

    

})
