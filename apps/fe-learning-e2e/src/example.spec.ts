import { test, expect } from '@playwright/test';

test('renders the shell and lets the cotizaciones microfrontend mount', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Fe Learning como contenedor de microfrontends' })).toBeVisible();

  await page.locator('a[href="/cotizaciones"]').click();

  await expect(page.getByRole('heading', { name: 'Cotizaciones' })).toBeVisible();
});
