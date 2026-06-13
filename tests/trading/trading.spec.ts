import { test, expect } from '@playwright/test';

test('Trade CFDs page opens succesfully', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Bug: Firefox does not navigate to Trade CFD page')

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'Trade CFDs'}).waitFor();
  await page.getByRole('link' , { name : 'Trade CFDs'}).click();
  await expect(page).toHaveURL('https://capital.com/en-eu/ways-to-trade/cfd-trading');
});

test('Trade knock-outs page opens succesfully', async ({ page }) => {

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'Trade knock-outs'}).waitFor();
  await page.getByRole('link' , { name : 'Trade knock-outs'}).click();
  await expect(page).toHaveURL('https://capital.com/en-eu/ways-to-trade/knock-outs');
});

test('Demo account page opens succesfully', async ({ page }) => {

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'Demo account'}).waitFor();
  await page.getByRole('link' , { name : 'Demo account'}).click();
  await expect(page).toHaveURL('https://capital.com/en-eu/trading-platforms/demo-account');
});

test('Pro account page opens succesfully', async ({ page }) => {

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'Pro account'}).waitFor();
  await page.getByRole('link' , { name : 'Pro account'}).click();
  await expect(page).toHaveURL('https://capital.com/en-eu/professional-clients');
});