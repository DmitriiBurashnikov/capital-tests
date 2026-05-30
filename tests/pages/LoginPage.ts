import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async openLoginForm() {
    await this.page.goto('https://capital.com/en-eu');
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }
  async fillLoginForm(email: string, password: string) {
  await this.page.getByRole('button', { name: 'Email address' }).click();
  await this.page.getByRole('textbox', { name: 'email' }).fill(email);
  await this.page.getByRole('textbox', { name: 'password' }).click();
  await this.page.getByRole('textbox', { name: 'password' }).fill(password);
  await this.page.getByRole('button', { name: 'Continue' }).click();
}
}