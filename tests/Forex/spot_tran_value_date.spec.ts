import { test, expect } from '@playwright/test';
import { Login } from '../../pages/login.ts';


test.describe('Spot Transaction value date', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin('100130', 'software', '777');
    await expect(page).toHaveTitle('Pumori');

    // Navigate to Forex > Add Spot Trans
    await page.getByRole('button', { name: 'Forex' }).click();
    await page.waitForTimeout(1000);
    await page.getByText('Spot Trans Value Date').click();
    await page.getByRole('button', { name: 'Add' }).click();
  });

  test('Verify Spot Transaction value date Create ', async ({ page }) => {
    const branchField = page.getByPlaceholder('Branch Name');
    if (await branchField.isVisible()) {
      console.log('Branch field is visible');
    }

    const parent_deal = page.getByPlaceholder('Parent Deal');
    await expect(parent_deal).toBeEmpty();
    await parent_deal.fill('1234567890');

    await page.locator('div').filter({ hasText: /^Confirming BankSelect\.\.\.$/ }).getByRole('paragraph').click();
    await page.waitForTimeout(1000); // Wait for the bank selection to complete
    await page.locator('td:nth-child(1)').first().click();
    await expect(page.getByRole('textbox', { name: 'Bank Name' })).toBeVisible();
    await page.locator('input[name="reconReference"]').fill('recon123');
    //await page.locator('.css-19bb58m').first().selectOption('2');
    await page.getByRole('spinbutton').fill('0.835');
    await page.locator('input[name="crossRate"]').click();

 // Transaction -Source (Debit )-----------------------------
    await page.locator('input[name="createNewS"]').check();
    await page.getByText('select').first().click();
    await page.locator('td:nth-child(1)').first().click();
    await expect(page.locator('input[name="acTypeS"]')).toBeVisible();
    await expect(page.locator('input[name="curTypeS"]')).toBeVisible();
    await expect(page.locator('input[name="dealNameS"]')).toBeVisible();
    //bank
    await page.getByText('select').nth(1).click();
    await page.locator('td:nth-child(1)').first().click();
    await page.waitForTimeout(500);
    //amount 
    await page.locator('input[name="amountS"]').fill('1000');
    //rate
    await page.locator('input[name="rateS"]').fill('0.835');
    await page.locator('input[name="interestRateS"]').fill('0.5');  
    //mature on
    await page.locator('[id="headlessui-popover-button-:r13:"]').getByTestId('eng-date-picker').click();
    
});

});