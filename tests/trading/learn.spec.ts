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

test('Trading strategies page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link', { name: 'Trading strategies' }).waitFor();
  await page.locator('#header-holder').getByRole('link', { name: 'Trading strategies' }).click({ force: true });
  await expect(page).toHaveURL('https://capital.com/en-eu/learn/trading-strategies');
});

test('Technical analysis page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link', { name: 'Technical analysis' }).waitFor();
  await page.locator('#header-holder').getByRole('link', { name: 'Technical analysis' }).click({ force: true });
  await expect(page).toHaveURL('https://capital.com/en-eu/learn/technical-analysis');
});

test('Trading psychology page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link', { name: 'Trading psychology' }).waitFor();
  await page.locator('#header-holder').getByRole('link', { name: 'Trading psychology' }).click({ force: true });
  await expect(page).toHaveURL('https://capital.com/en-eu/learn/trading-psychology');
});

test('All resources page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link', { name: 'All resources' }).waitFor();
  await page.locator('#header-holder').getByRole('link', { name: 'All resources' }).click({ force: true });
  await expect(page).toHaveURL('https://capital.com/en-eu/learn');
});