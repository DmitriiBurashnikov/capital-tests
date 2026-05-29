import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const email = process.env.user_email!;
const password = process.env.user_password!;

test('User sees error with invalid email', async ({ page }) => {
  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button', { name: 'Open account' }).click();
  await page.getByRole('textbox', { name: 'email' }).fill('invalid-email');
  await page.getByRole('textbox', { name: 'password' }).fill('somepassword');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Проверяем что появилось сообщение об ошибке
  await expect(page.getByText('Email or password is invalid.')).toBeVisible();
});

test('User sees error with empty fields', async ({ page }) => {
  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button', { name: 'Open account' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('The email address domain is invalid')).toBeVisible();
});

test('User can log in with valid credentials', async ({ page, browserName }) => {
  test.skip(browserName === 'chromium', 'Capital.com blocks automation in Chromium');
  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'email' }).fill(email);
  await page.getByRole('textbox', { name: 'password' }).click();
  await page.getByRole('textbox', { name: 'password' }).fill(password);
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Log out')).toBeVisible({timeout: 15000});
  });