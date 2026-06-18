import { Page } from '@playwright/test';

export class TradingMenu {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openMenuItem(name: string) {
    await this.page.getByRole('button' , { name : 'Trading'}).first().hover();
    await this.page.locator('#header-holder').getByRole('link', { name: name }).waitFor();
    await this.page.locator('#header-holder').getByRole('link', { name: name }).click({ force: true });
  }
}