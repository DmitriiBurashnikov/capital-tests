import { test, expect } from '@playwright/test';
import { TradingMenu } from '../pages/TradingMenu';
import { preparePage } from '../preparePage';

test.beforeEach(async ({ page }) => {
  await preparePage(page);
});

test('Verify that the page "Trade CFDs" opens succesfully and the button "Explore markets" provides to sign up form', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('Trade CFDs');
  await expect(page).toHaveURL('https://capital.com/en-eu/ways-to-trade/cfd-trading');
  await page.getByRole('button' , { name : 'Explore markets'}).click();
  await expect(page.getByText('Sign up')).toBeVisible();
});

test('Verify that the page "Trade knock-outs" opens succesfully and the button "Access knock-outs" provides to sign up form', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('Trade knock-outs');
  await expect(page).toHaveURL('https://capital.com/en-eu/ways-to-trade/knock-outs');
  await page.getByRole('button' , { name : 'Access knock-outs'}).click();
  await expect(page.getByText('Sign up')).toBeVisible();
});

test('Verify that the page "Demo account" opens succesfully and the button "Explore demo trading" provides to sign up form', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('Demo account');
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/demo-account');
  await page.getByRole('button' , { name : 'Explore demo trading'}).click();
  await expect(page.getByText('Sign up')).toBeVisible();
});

test('Verify that the page "Pro account" opens succesfully and the button "Apply" provides to sign up form', async ({ page }) => {

  const menu = new TradingMenu(page);
  await menu.openMenuItem('Pro account');
  await expect(page).toHaveURL('https://capital.com/en-eu/professional-clients');
  await page.getByRole('button' , { name : 'Apply'}).click();
  await expect(page.getByText('Sign up')).toBeVisible();
});