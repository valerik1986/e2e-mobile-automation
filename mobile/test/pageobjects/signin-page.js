const { driver } = require('@wdio/globals');
const BasePage = require('./base-page');
const selectors = require('../locators/signinpage-locators');

/**
 * Sign In Page — login screen of the app
 */
class SignInPage extends BasePage {
  constructor() {
    super();
    this.selectors = selectors;
  }

  /**
   * Wait until the Sign-In screen is displayed
   */
  async waitForScreen(timeout = this.defaultTimeout) {
    await this.waitUntilVisible('emailField', timeout, '❌ Sign-In screen not visible');
  }

  /**
   * Enter email into the input field
   * @param {string} email - user email
   */
  async enterEmail(email) {
    console.log(`Entering email: ${email}`);
    await this.setValue('emailField', email);
  }

  /**
   * Enter password into the input field
   * @param {string} password - user password
   */
  async enterPassword(password) {
    console.log('Entering password');
    await this.setValue('passwordField', password);
  }

  /**
   * Tap the "Continue" or "Login" button
   */
  async tapLoginButton(timeout = this.defaultTimeout) {
    try {
      await driver.hideKeyboard();
      console.log('⌨Keyboard hidden');
    } catch {
      console.log('Keyboard was not open');
    }

    await this.waitUntilVisible('continueButton', timeout, '❌ Continue button not visible');
    await this.click('continueButton');
    console.log('✅ Continue button clicked');
  }

  /**
   * Perform the full login flow (email + password + submit)
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    await this.waitForScreen();
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.tapLoginButton();
  }
}

module.exports = new SignInPage();
