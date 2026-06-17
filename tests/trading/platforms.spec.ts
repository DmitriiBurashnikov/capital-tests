import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://capital.com/en-eu');

 // 1. Закрываем гео-модалку "Stay here" (появляется на CI в США)
 const StayHereButton = page.locator('[data-type="wrong_location_cancel"]');
 try { await StayHereButton.waitFor({ state: 'visible', timeout: 5000 });
    await StayHereButton.click();
} catch {
  // Модалки нет (при запуске из EU) - это нормально
}
 
  // 2. Закрываем cookie-баннер, если есть
  const rejectButton = page.locator('[data-action="reject"]');
  if (await rejectButton.isVisible().catch(() => false)) {
    await rejectButton.click();
  }

  // 3. Прячем risk-disclaimer (он перекрывает меню при hover)
  await page.evaluate(() => {
    const disclaimer = document.querySelector('#header [data-sentry-component="Main"]');
    if (disclaimer) {
      (disclaimer as HTMLElement).style.display = 'none';
    }
  });
});

test('Web platform page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link', { name: 'Web platform' }).waitFor();
  await page.locator('#header-holder').getByRole('link', { name: 'Web platform' }).click({ force: true });
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/web-platform');
});

test('Mobile app page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link', { name: 'Mobile app' }).waitFor();
  await page.locator('#header-holder').getByRole('link', { name: 'Mobile app' }).click({ force: true });
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/mobile-apps');
});

test('Trading view page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link', { name: 'Tradingview' }).waitFor();
  await page.locator('#header-holder').getByRole('link', { name: 'Tradingview' }).click({ force: true });
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/trading-view');
});

test('MT4 page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link', { name: 'MT4' }).waitFor();
  await page.locator('#header-holder').getByRole('link', { name: 'MT4' }).click({ force: true });
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/mt4');
});

test('MT5 page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link', { name: 'MT5' }).waitFor();
  await page.locator('#header-holder').getByRole('link', { name: 'MT5' }).click({ force: true });
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/mt5');
});

test('API access page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link', { name: 'API access' }).waitFor();
  await page.locator('#header-holder').getByRole('link', { name: 'API access' }).click({ force: true });
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/api-development-guide');
});