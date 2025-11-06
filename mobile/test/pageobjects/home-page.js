const BasePage = require('./base-page');
const selectors = require('../locators/homepage-locators');

/**
 * Home Page — main screen after login
 */
class HomePage extends BasePage {
  constructor() {
    super();
    this.selectors = selectors;
  }

  /**
   * Waiting for homepage to load
   */
  async waitForHomePageDisplayed(timeout = this.defaultTimeout) {
    await this.waitUntilVisible(
      'headerLeftContainer',
      timeout,
      '❌ Home page not visible'
    );
  }

  /**
   * Clicking on any tab in the bottom menu
   * @param {string} tabName — locator key (for example: "portfolioTab")
   */
  async tapTab(tabName) {
    await this.click(tabName);
  }

  /**
   * Clicking on the user's avatar in the header
   */
  async tapHeaderAvatar() {
    await this.click('headerAvatar');
  }
}

module.exports = new HomePage();
