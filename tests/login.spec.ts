import { test, expect, describe } from '@playwright/test';
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

const negativeCases = [
{ name: 'invalid email', email: invalid_email, password: password, skipBrowsers: [] },
{ name: 'too long email', email: toolong_user_email, password: password, skipBrowsers: ['chromium', 'firefox'] },
{ name: 'email with gaps', email: email_with_gaps, password: password, skipBrowsers: [] },
{ name: 'valid email, invalid password', email: email, password: invalid_password, skipBrowsers: ['chromium', 'firefox'] },
{ name: 'spaces in the fields', email: gab_email, password: gab_password, skipBrowsers: [] },
];

describe('Positive cases',() => {

test('User can log in with valid credentials', async ({ page, browserName }) => {
  test.skip(browserName === 'chromium' || browserName === 'firefox' || browserName === 'webkit', 'Capital.com blocks automation in Chromium');

  const loginPage = new LoginPage(page);
  await loginPage.openLoginForm();
  await loginPage.fillLoginForm(email, password);
  await expect(page.getByText('Log out')).toBeVisible({ timeout: 20000 });
});

});

describe('Negative cases',() => {

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

for (const testCase of negativeCases) {
  test(`User cannot log in: ${testCase.name}`, async ({page , browserName}) => {
    test.skip(testCase.skipBrowsers.includes(browserName), 'Capital.com blocks automation on this browser');
    const loginPage = new LoginPage(page)
    await loginPage.openLoginForm();
    await loginPage.fillLoginForm(testCase.email, testCase.password);
    await expect(page.getByText('Email or password is invalid.')).toBeVisible({ timeout: 20000 });
});
}

});