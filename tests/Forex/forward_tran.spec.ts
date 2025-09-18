import { test, expect } from '@playwright/test';
import { Login } from '../../pages/login.ts';


test.describe('Forward Transaction Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin('100130', 'software', '777');
    await expect(page).toHaveTitle('Pumori');

    // Navigate to Forex > Add Spot Trans
    await page.getByRole('button', { name: 'Forex' }).click();
    await page.waitForTimeout(1000);
    await page.getByText('Forward Trans',{exact:true}).click();
    await page.getByRole('button', { name: 'Add' }).click();
  });

  test('Verify Forward Transaction Create', async ({ page }) => {
     


  });

});