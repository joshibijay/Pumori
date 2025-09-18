import { Page, Locator } from '@playwright/test';

export class Login {
    private page: Page;
    private username: Locator;
    private password: Locator;
    private branch: Locator;
    private loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('input[name="userId"]');
        this.password = page.locator('input[name="password"]');
        this.branch = page.locator('input[name="branchCode"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async coreLogin(user_name: string, pass_word: string, branch_code: string): Promise<void> {
        await this.page.goto('http://172.31.1.30/web',{ timeout: 100000 });
        await this.username.fill(user_name);
        await this.password.fill(pass_word);
        await this.branch.fill(branch_code);
        await this.loginButton.click();
    }
   
}
