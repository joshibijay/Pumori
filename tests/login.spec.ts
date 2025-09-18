import { test, expect } from '@playwright/test';
import { Login } from '../pages/login.ts';

test.describe('Login form validation and branch code handling', () => {

  const validUsername = '100130';
  const validPassword = 'software';
  const validBranch = '777';

  test('Valid username & password, invalid branch code', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin(validUsername, validPassword, '999');

    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/invalid branch code/i);
  });

  test('Invalid username, valid password and branch code', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin('wrongUser', validPassword, validBranch);

    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/invalid username/i);
  });

  test('Valid username/branch, invalid password', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin(validUsername, 'Wrong@123', validBranch);

    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/invalid password/i);
  });

  test('Reject special characters in branch code', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin(validUsername, validPassword, '!@#');

    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/invalid branch code/i);
  });

  test('Reject alphabetic branch code', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin(validUsername, validPassword, 'abc');

    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/invalid branch code/i);
  });

  test('Reject alphanumeric branch code', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin(validUsername, validPassword, '123abc');

    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/invalid branch code/i);
  });

  test('Should not login with empty username', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin('', validPassword, validBranch);
    const errorMessage = page.locator('small.text-red-300');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('User ID is required');
  });

  test('Should not login with empty password', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin(validUsername, '', validBranch);

    const errorMessage = page.locator('small.text-start.font-normal.text-xs.leading-6.text-red-300');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Password is required');
    if ( await errorMessage.isVisible()) {
      console.log('Validation error message is displayed:', await errorMessage.textContent());
    }
    else {
      console.log('Validation error message is not displayed');
    }
  });

  test('Verify if the password hide/unide button is working or not', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin('', validPassword, validBranch);
    const eyebutton=page.locator('div.absolute.top-1\\/2.right-3.z-10.-translate-y-1\\/2.transform svg');
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'password');
    await eyebutton.click();
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'text');
    console.log('Password visibility toggle button is working correctly');
  });

    test('Should not login with empty branchcode', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin(validUsername, validPassword, '');

    const errorMessage = page.locator('small.text-red-300');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Branch Code is required');
    if ( await errorMessage.isVisible()) {
      console.log('Validation error message is displayed:', await errorMessage.textContent());
    }
    else {
      console.log('Validation error message is not displayed');
    }
  });

      test('Verify if the branch code is less than 3 digits', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin(validUsername, validPassword, validBranch.slice(0, 2));

    const errorMessage = page.locator('small.text-red-300');
    await expect(errorMessage).toBeVisible();
    //await expect(errorMessage).toContainText('Branch Code is required');
    // if ( await errorMessage.isVisible()) {
    //   console.log('Validation error message is displayed:', await errorMessage.textContent());
    // }
    // else {
    //   console.log('Validation error message is not displayed');
    // }
  });

   test('Verify if the branch code is more than 3 digits', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin(validUsername, validPassword, validBranch + '123');

    const errorMessage = page.locator('small.text-red-300');
    await expect(errorMessage).toBeVisible();
    //await expect(errorMessage).toContainText('Branch Code is required');
    // if ( await errorMessage.isVisible()) {
    //   console.log('Validation error message is displayed:', await errorMessage.textContent());
    // }
    // else {
    //   console.log('Validation error message is not displayed');
    // }
  });
  test('Successful login with valid credentials', async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.coreLogin(validUsername, validPassword, validBranch);

    await expect(page).toHaveTitle('Pumori'); 
    //await expect(page.locator('text=Welcome')).toBeVisible(); 
  });

});
