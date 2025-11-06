const BasePage = require('./base-page');
const selectors = require('../locators/profilepage-locators');

/**
 * Profile Page — user profile and sign-out flow
 */
class ProfilePage extends BasePage {
  constructor() {
    super();
    this.selectors = selectors;
  }

  /**
   * Verify profile header full name matches expected text
   * @param {string} expectedText
   */
  async isProfileFullNameMatching(expectedText) {
    return await this.isTextMatching('profileHeaderFullName', expectedText);
  }

  /**
   * Scroll to and tap the "Sign Out" button
   * @param {string} name - locator key (default: signOutButton)
   * @param {object} options - scroll options (e.g. maxAttempts)
   */
  async scrollAndTapSignOutButton(name = 'signOutButton', options = { maxAttempts: 8 }) {
    const element = await this.scrollToElement(name, options);
    await element.click();
    console.log('Sign Out button clicked.');
  }

  /**
   * Wait until the "Log Out" pop-up is visible
   */
  async waitForLogOutPopUpDisplayed(timeout = this.defaultTimeout) {
    try {
      await this.isElementDisplayed('logOutPopUp', timeout, '❌ Log Out pop-up not visible');
      console.log('Log Out pop-up is visible.');
      return true;
    } catch (err) {
      console.warn(`Log Out pop-up not visible: ${err.message}`);
      return false;
    }
  }

  /**
   * Tap on the "Log Out" confirmation button
   */
  async tapLogOutButton() {
    await this.click('logOutButton');
    console.log('✅ Log Out confirmed.');
  }
}

module.exports = new ProfilePage();
