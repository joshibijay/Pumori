import { test, expect } from '@playwright/test';
import { Login } from '../../pages/login.ts';


test.describe('Spot Transaction same date Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin('100130', 'software', '777');
    await expect(page).toHaveTitle('Pumori');

    // Navigate to Forex > Add Spot Trans
    await page.getByRole('button', { name: 'Forex' }).click();
    await page.waitForTimeout(1000);
    await page.getByText('Spot Trans Same Date').click();
    await page.getByRole('button', { name: 'Add' }).click();
  });

  test('Verify Spot Transaction same date Create ', async ({ page }) => {
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
        await page.waitForTimeout(1000);
    await expect(page.locator('input[name="acTypeS"]')).toBeVisible();
    await expect(page.locator('input[name="curTypeS"]')).toBeVisible();
    await expect(page.locator('input[name="dealNameS"]')).toBeVisible();
    await page.getByText('select').nth(1).click();
    await page.locator('td:nth-child(1)').first().click();
    await page.waitForTimeout(1000);
    await page.locator('input[name="desc1S"]').fill('Test Description 1');
    await page.locator('input[name="desc2S"]').fill('Test Description 2');
    await page.locator('input[name="desc3S"]').fill('Test Description 3');

    await page.locator('div').filter({ hasText: /^Bank NameSelect\.\.\.$/ }).getByRole('paragraph').click();
    await page.locator('td:nth-child(1)').first().click();
    await page.waitForTimeout(1000);

    await page.locator('input[name="bankAddS"]').fill('Test Bank Address');


    // Transaction -Source (Credit )-----------------------------
    await page.locator('input[name="normalDrD"]').check();
    await page.locator('input[name="createNewD"]').check();

        //main code
    await page.getByText('select').first().click();
    await page.locator('td:nth-child(1)').nth(1).click();
        await page.waitForTimeout(1000);
    await expect(page.locator('input[name="acTypeD"]')).toBeVisible();
    await expect(page.locator('input[name="curTypeD"]')).toBeVisible();
    await expect(page.locator('input[name="dealNameD"]')).toBeVisible();
         //bank
    // await page.locator('div').filter({ hasText: /^BankSelect\.\.\.$/ }).getByRole('paragraph').click();
    // await page.locator('td:nth-child(1)').nth(2).click();

    await page.locator('input[name="amountD"]').fill('1000');
    await page.locator('input[name="rateD"]').fill('0.835');
    await page.pause();
      //recieving bank
    await page.locator('div').filter({ hasText: /^Receiving BankSelect\.\.\.$/ }).getByRole('paragraph').click();
            await page.waitForTimeout(1000);

    await page.locator('td:nth-child(2)').first().click();
        await page.waitForTimeout(1000);
       //beneficiary bank
    await page.locator('div').filter({ hasText: /^Beneficiary BankSelect\.\.\.$/ }).getByRole('paragraph').click();
    await page.pause();
    await page.locator('td:nth-child(1)').first().click();
        await page.waitForTimeout(1000);


    await page.locator('input[name="desc1D"]').fill('Test Description 1');
    await page.locator('input[name="desc2D"]').fill('Test Description 2');
    await page.locator('input[name="desc3D"]').fill('Test Description 3');
       //bank name
    // await page.locator('div').filter({ hasText: /^Bank NameSelect\.\.\.$/ }).getByRole('paragraph').click();
    // await page.locator('td:nth-child(1)').first().click();

    await page.locator('input[name="bankAddD"]').fill('Test Bank Address');
       //their bank
    await page.locator('div').filter({ hasText: /^Their BankSelect\.\.\.$/ }).getByRole('paragraph').click();
    await page.locator('td:nth-child(1)').first().click();
    await page.waitForTimeout(500);
    //finally submit the form
    await page.getByRole('button', { name: 'Save' }).click();
    //discard the form
    // await page.getByRole('button', { name: 'Discard' }).click();
  });
});