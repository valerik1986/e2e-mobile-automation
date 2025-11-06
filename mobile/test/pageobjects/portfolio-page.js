const BasePage = require('./base-page');
const selectors = require('../locators/portfoliopage-locators');

/**
 * Portfolio Page — handles portfolio cards, open positions, and close flow
 */
class PortfolioPage extends BasePage {
  constructor() {
    super();
    this.selectors = selectors;
  }

    /**
   * Waiting for portfolio page to load
   */
  async waitForPortfolioPageDisplayed(timeout = this.defaultTimeout) {
    await this.waitUntilVisible(
      'portfolioHeaderText',
      timeout,
      '❌ Portfolio page not visible'
    );
  }

  /**
   * Wait until portfolio header card is visible
   */
  async waitForPortfolioPageDisplayed(timeout = this.defaultTimeout) {
    await this.isElementDisplayed(
      'portfolioHeaderCard',
      timeout,
      '❌ Portfolio header card not visible'
    );
  }

  /**
   * Verify portfolio header title matches expected text
   * @param {string} expectedText
   */
  async isPortfolioHeaderTitleMatching(expectedText) {
    return await this.isTextMatching('portfolioHeaderCardTitleText', expectedText);
  }

  /**
   * Tap on a specific portfolio position card (e.g. USD/JPY)
   */
  async tapOnPosition() {
    await this.click('usdJpyCard');
  }

  /**
   * Verify open position window header matches expected text
   * @param {string} expectedText
   */
  async isOpenPositionHeaderMatching(expectedText) {
    return await this.isTextMatching('openPositionWindowHeader', expectedText);
  }

  /**
   * Tap on the close position button
   */
  async tapClosePositionButton() {
    await this.click('portfolioPositionCloseButton');
  }

  /**
   * Wait until close position screen is displayed
   */
  async waitForClosePositionScreenDisplayed(timeout = this.defaultTimeout) {
    await this.isElementDisplayed(
      'closePositionScreen',
      timeout,
      '❌ Close position screen not visible'
    );
  }

  /**
   * Verify close position amount input matches expected value
   * @param {string} expectedText
   */
  async isClosePositionAmountMatching(expectedText) {
    return await this.isTextMatching('closePositionAmountInput', expectedText);
  }

  /**
   * Confirm position closing
   */
  async tapConfirmClosePositionButton() {
    await this.click('closePositionConfirmButton');
  }

  /**
   * Verify portfolio empty state text matches expected
   * @param {string} expectedText
   */
  async isEmptyPortfolioTitleMatching(expectedText) {
    return await this.isTextMatching('portfolioEmptyListTitleText', expectedText);
  }
}

module.exports = new PortfolioPage();
