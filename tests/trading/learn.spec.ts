import { test, expect } from '@playwright/test';

test('Trading strategies page opens succesfully', async ({ page }) => {

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'Trading strategies'}).click();
  await expect(page).toHaveURL('https://capital.com/en-eu/learn/trading-strategies');
});

test('Technical analysis page opens succesfully', async ({ page }) => {

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'Technical analysis'}).click();
  await expect(page).toHaveURL('https://capital.com/en-eu/learn/technical-analysis');
});

test('Trading psychology page opens succesfully', async ({ page }) => {

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'Trading psychology'}).click();
  await expect(page).toHaveURL('https://capital.com/en-eu/learn/trading-psychology');
});

test('All resources page opens succesfully', async ({ page }) => {

  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button' , { name : 'Trading'}).first().hover();
  await page.getByRole('link' , { name : 'All resources'}).click();
  await expect(page).toHaveURL('https://capital.com/en-eu/learn');
});