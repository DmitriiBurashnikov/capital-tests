import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://capital.com/en-eu');

  // 1. Закрываем cookie-баннер, если есть
  const rejectButton = page.locator('[data-action="reject"]');
  if (await rejectButton.isVisible().catch(() => false)) {
    await rejectButton.click();
  }

  // 2. Прячем risk-disclaimer (он перекрывает меню при hover)
  await page.evaluate(() => {
    const disclaimer = document.querySelector('#header [data-sentry-component="Main"]');
    if (disclaimer) {
      (disclaimer as HTMLElement).style.display = 'none';
    }
  });
});

test('Trade CFDs page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link' , { name : 'Trade CFDs'}).waitFor();
  await page.locator('#header-holder').getByRole('link' , { name : 'Trade CFDs'}).click({force: true});
  await expect(page).toHaveURL('https://capital.com/en-eu/ways-to-trade/cfd-trading');
});

test('Trade knock-outs page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link' , { name : 'Trade knock-outs'}).waitFor();
  await page.locator('#header-holder').getByRole('link' , { name : 'Trade knock-outs'}).click({force: true});
  await expect(page).toHaveURL('https://capital.com/en-eu/ways-to-trade/knock-outs');
});

test('Demo account page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link', { name: 'Demo account' }).waitFor();
  await page.locator('#header-holder').getByRole('link', { name: 'Demo account' }).click({ force: true });
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/demo-account');
});

test('Pro account page opens succesfully', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link' , { name : 'Pro account'}).waitFor();
  await page.locator('#header-holder').getByRole('link' , { name : 'Pro account'}).click({force: true});
  await expect(page).toHaveURL('https://capital.com/en-eu/professional-clients');
});

test('Verify that the button "Explore markets" provides to sign up form', async ({ page }) => {

  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.locator('#header-holder').getByRole('link' , { name : 'Trade CFDs'}).waitFor();
  await page.locator('#header-holder').getByRole('link', { name: 'Trade CFDs' }).click({force:true});
  await expect(page).toHaveURL('https://capital.com/en-eu/ways-to-trade/cfd-trading');
  await page.getByRole('button' , { name : 'Explore markets'}).click();
  await expect(page.getByText('Sign up')).toBeVisible();
});