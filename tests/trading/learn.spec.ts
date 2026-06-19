import { test, expect } from '@playwright/test';
import { TradingMenu } from '../pages/TradingMenu';

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

test('Verify that the page "Trading strategies" opens succesfully and the buttons "Create account" and "Try demo account" lead to Sign up form', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('Trading strategies'); 
  await expect(page).toHaveURL('https://capital.com/en-eu/learn/trading-strategies');
  await page.getByRole('button' , { name : 'Create account'}).click();
  await expect(page.getByText('Sign up')).toBeVisible();
  await page.locator('[data-type="SIGN_UP_close"]').click();
  await page.locator('[data-type="SIGN_UP_close"]').waitFor({ state: 'hidden'});
  await page.getByRole('button' , { name : 'Try demo account'}).click();
  await expect(page.getByText('Sign up')).toBeVisible();
});

test('Technical analysis page opens succesfully', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('Technical analysis');
  await expect(page).toHaveURL('https://capital.com/en-eu/learn/technical-analysis');
});

test('Trading psychology page opens succesfully', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('Trading psychology');
  await expect(page).toHaveURL('https://capital.com/en-eu/learn/trading-psychology');
});

test('Verify that the page "All resources" opens succesfully and the buttons "Open an account" and "Try demo account" lead to Sign up form', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('All resources');
  await expect(page).toHaveURL('https://capital.com/en-eu/learn');
  await page.getByRole('button' , { name : 'Open an account'}).click();
  await expect(page.getByText('Sign up')).toBeVisible();
  await page.locator('[data-type="SIGN_UP_close"]').click();
  await page.locator('[data-type="SIGN_UP_close"]').waitFor({ state: 'hidden'});
  await page.getByRole('button' , { name : 'Try demo account'}).click();
  await expect(page.getByText('Sign up')).toBeVisible();
});