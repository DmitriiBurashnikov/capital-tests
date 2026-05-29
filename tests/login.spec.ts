import { test, expect } from '@playwright/test';

test('User sees error with invalid email', async ({ page }) => {
  await page.goto('https://capital.com/en-eu');
  await page.getByRole('button', { name: 'Open account' }).click();
  await page.getByRole('textbox', { name: 'email' }).fill('invalid-email');
  await page.getByRole('textbox', { name: 'password' }).fill('somepassword');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Проверяем что появилось сообщение об ошибке
  await expect(page.getByText('Email or password is invalid.≠')).toBeVisible();
});