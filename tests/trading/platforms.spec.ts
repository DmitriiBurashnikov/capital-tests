import { test, expect } from '@playwright/test';

test('Web platform page opens succesfully', async ({ page }) => {

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'Web platform'}).waitFor();
  await page.getByRole('link' , { name : 'Web platform'}).click();
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/web-platform');
});

test('Mobile app page opens succesfully', async ({ page }) => {

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'Mobile app'}).waitFor();
  await page.getByRole('link' , { name : 'Mobile app'}).click();
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/mobile-apps');
});

test('Trading view page opens succesfully', async ({ page }) => {

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'TradingView'}).first().waitFor();
  await page.getByRole('link' , { name : 'TradingView'}).first().click();
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/trading-view');
});

test('MT4 page opens succesfully', async ({ page }) => {

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'MT4'}).first().waitFor();
  await page.getByRole('link' , { name : 'MT4'}).first().click();
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/mt4');
});

test('MT5 page opens succesfully', async ({ page }) => {

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'MT5'}).first().waitFor();
  await page.getByRole('link' , { name : 'MT5'}).first().click();
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/mt5');
});

test('API access page opens succesfully', async ({ page }) => {

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'API access'}).waitFor();
  await page.getByRole('link' , { name : 'API access'}).click();
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/api-development-guide');
});