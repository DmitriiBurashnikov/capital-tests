import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import dotenv from 'dotenv';
dotenv.config();

test.skip(!!process.env.CI, 'Skipping login tests in CI environment');

const email = process.env.user_email!;
const password = process.env.user_password!;
const toolong_user_email = process.env.toolong_user_email!;
const invalid_email = process.env.invalid_email!;
const email_with_gaps = process.env.email_with_gaps!;
const invalid_password = process.env.invalid_password!;
const gab_email = process.env.gab_email!;
const gab_password = process.env.gab_password!;

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
  test.skip(browserName === 'chromium' || browserName === 'firefox', 'Capital.com blocks automation in Chromium');

  const loginPage = new LoginPage(page);
  await loginPage.openLoginForm();
  await loginPage.fillLoginForm(email, password);
  await expect(page.getByText('Log out')).toBeVisible({ timeout: 20000 });
});

test('User cannot log in with too long email',async ({ page, browserName }) => {
  test.skip(browserName === 'chromium' || browserName === 'firefox', 'Capital.com blocks automation in Chromium');

  const loginPage = new LoginPage(page)
  await loginPage.openLoginForm();
  await loginPage.fillLoginForm(toolong_user_email, password);
  await expect(page.getByText('Email or password is invalid.')).toBeVisible({ timeout: 20000 });
});

test('User cannot log in with invalid email', async ({ page , browserName }) => {
    test.skip(browserName === 'chromium' || browserName === 'firefox', 'Capital.com blocks automation in Chromium');

  const loginPage = new LoginPage(page)
  await loginPage.openLoginForm();
  await loginPage.fillLoginForm(invalid_email, password);
  await expect(page.getByText('Email or password is invalid.')).toBeVisible();
});

test('User cannot log in with email with gaps', async ({ page }) => {

  const loginPage = new LoginPage(page)
  await loginPage.openLoginForm();
  await loginPage.fillLoginForm(email_with_gaps, password);
  await expect(page.getByText('Email or password is invalid.')).toBeVisible();
});

test('User cannot log in with valid email and invalid password', async ({ page , browserName}) => {
    test.skip(browserName === 'chromium' || browserName === 'firefox', 'Capital.com blocks automation in Chromium');

  const loginPage = new LoginPage(page)
  await loginPage.openLoginForm();
  await loginPage.fillLoginForm(email, invalid_password);
  await expect(page.getByText('Email or password is invalid.')).toBeVisible({ timeout: 20000 });
});

test('User cannot log in with spaces in fields', async ({ page }) => {

  const loginPage = new LoginPage(page)
  await loginPage.openLoginForm();
  await loginPage.fillLoginForm(gab_email, gab_password);
  await expect(page.getByText('Email or password is invalid.')).toBeVisible();
});