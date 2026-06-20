import { Page } from '@playwright/test';
 
export async function preparePage(page: Page) {
  await page.goto('https://capital.com/en-eu');

    // 1. Закрываем гео-модалку "Stay here" (появляется на CI в США)
  const stayHereButton = page.locator('[data-type="wrong_location_cancel"]');
    try { await stayHereButton.waitFor({ state: 'visible', timeout: 5000 });
    await stayHereButton.click();
    } catch {
    // Модалки нет (при запуске из EU) - это нормально
    }
 
    // 2. Закрываем cookie-баннер, если есть
  const rejectButton = page.locator('[data-action="reject"]');
    if (await rejectButton.isVisible().catch(() => false)) {
    await rejectButton.click();
    }

    // 3. Прячем risk-disclaimer (он перекрывает меню при hover)
  await page.evaluate(() => {
  const disclaimer = document.querySelector('#header [data-sentry-component="Main"]');
    if (disclaimer) {
    (disclaimer as HTMLElement).style.display = 'none';
    }
    });
}