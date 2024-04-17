
import { test, expect } from '@playwright/test'


//crossBrowser için ==> npx playwright test morgenmrk.spec.ts --headed

test.describe.configure({ mode: 'parallel' }); // bu tanımlama ile bir dosyada 1 den fazla worker çalıştıracağız.

test.describe('TC1_Cross Browser Test - Main Page', () => {
    test.describe.configure({ mode: 'serial' }); // bu tanımlama ile her test için worker görevlendirmesini engelliyor ve testleri birbirine bağlıyoruz.
    
    let page; // Tarayıcı oturumunu burada tanımlıyoruz
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage(); // Tarayıcı oturumunu başlatıyoruz
    });
    test("Navigating Main Page", async () => {

        await page.goto('https://morgenmarkt.de/');
        const title = await page.title();
        console.log("Sayfa Başlığı:", title);
        await expect(page).toHaveTitle('Türkisch orientalischer Online Supermarkt bei morgenmarkt.de');
    });

    test('Kampanen button', async () => {
     
        await page.getByRole('link', { name: 'Kampagnen' }).click()
        await page.locator('[class="col-6 col-md-3"]').last().click()
     

    })

})