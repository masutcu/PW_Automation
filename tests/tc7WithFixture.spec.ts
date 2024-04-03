import { expect} from '@playwright/test'
import {test} from '../test-options'

//Test Case 7: Verify Test Cases Page
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click on 'Test Cases' button
//5. Verify user is navigated to test cases page successfully//


test.describe('TC7_Verify Test Cases Page', () => {

    test("Test Cases Page", async ({page, automationExerciseURL}) => {
        //2. Navigate fixture dosyasından 
        //3. Verify that home page is visible successfully      
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle(/Automation Exercise/);
        await page.getByRole('button', { name: 'Test Cases' }).click()
        //burada reklam çıkıyor
        await page.goBack()
        await page.goForward()
        await page.waitForTimeout(2000)
        const title1 = await page.title();
        console.log("Sayfa Başlığı:", title1);
        await expect(page).toHaveTitle(/Test Cases/);

    })

})
