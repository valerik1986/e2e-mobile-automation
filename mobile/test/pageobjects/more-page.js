const BasePage = require('./base-page');
const selectors = require('../locators/morepage-locators');

/**
 * More Page — main screen after login
 */
class MorePage extends BasePage {
  constructor() {
    super();
    this.selectors = selectors;
  }

  /**
   * Waiting for more page to load
   */
  async waitForMorePageDisplayed(timeout = this.defaultTimeout) {
    await this.waitUntilVisible(
      'moreTitleText',
      timeout,
      '❌ More page not visible'
    );
  }
}

module.exports = new MorePage();
