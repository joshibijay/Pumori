import { test, expect } from '@playwright/test';
import { Login } from '../../pages/login.ts';


test.describe('LC transaction -Issuance', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin('100130', 'software', '777');
    await expect(page).toHaveTitle('Pumori');

    await page.getByRole('button', { name: 'Letter of Credits' }).click();
    await page.waitForTimeout(1000);
    await page.getByText('L/C Issuance').click();
    // await page.getByRole('button', { name: 'Add' }).click();
  });

  test('Verify L/C Issuance Create', async ({ page }) => {

    await expect(page.getByText('Branch Code*' ,{exact:true}) ).toBeVisible();
    await expect(page.getByText('Branch Name')).toBeVisible();
    await page.getByText('1',{exact:true}).click();
    await page.locator('td:nth-child(1)').first().click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Client Name').first()).toBeVisible();

  }); 

});