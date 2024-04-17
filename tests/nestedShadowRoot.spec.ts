import { test, expect } from '@playwright/test'


test.describe('Shadow Root Combinations', () => {
    test.describe.configure({ mode: 'serial' });
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.selectorshub.com/iframe-in-shadow-dom/')
    })

    test('Shadow Root', async ({ page }) => {
        await page.locator('#userName #kils').fill('Mehmet')
    })
    test('Shadow Root - Iframe Combination', async ({ page }) => {
        await page.locator('#userName').frameLocator('#pact1').locator('#glaf').fill('Deneme')
    })

    test('Nested Shadow Root ', async ({ page }) => {
        await page.locator('#userName #app2 #pizza').fill('margherita')
    })

})


