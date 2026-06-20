import { test, expect } from '@playwright/test';
import { TradingMenu } from '../pages/TradingMenu';
import { preparePage } from '../preparePage';

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test('Verify that the page "Web platform" opens succesfully and the button "Explore platform" provides to sign up menu', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('Web platform');
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/web-platform');
  await page.getByRole('button' , { name : 'Explore platform'}).click();
  await expect(page.getByText('Sign up')).toBeVisible();
});

test('Mobile app page opens succesfully', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('Mobile app');
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/mobile-apps');
});

test('Trading view page opens succesfully', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('Tradingview');
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/trading-view');
});

test('Verify that the page "MT4" opens succesfully and the button "Explore MT4" provides to sign up menu', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('MT4');
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/mt4');
  await page.getByRole('button' , { name : 'Explore MT4'}).click();
  await expect(page.getByText('Sign up')).toBeVisible();
});

test('Verify that the page "MT5" opens succesfully and the button "Explore MT5" provides to sign up menu', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('MT5');
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/mt5');
  await page.getByRole('button' , { name : 'Explore MT5'}).click();
  await expect(page.getByText('Sign up')).toBeVisible();
});

test('API access page opens succesfully', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('API access');
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/api-development-guide');
});