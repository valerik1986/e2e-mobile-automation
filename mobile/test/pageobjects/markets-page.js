const BasePage = require('./base-page');
const selectors = require('../locators/marketspage-locators');

/**
 * Markets Page — trading instruments screen
 */
class MarketsPage extends BasePage {
  constructor() {
    super();
    this.selectors = selectors;
  }

  /**
   * Wait until the Markets header is visible
   */
  async waitForMarketsHeader(timeout = this.defaultTimeout) {
    console.log('Waiting for Markets header...');
    await this.isElementDisplayed('marketsTitleText', timeout, '❌ Markets header not visible');
    console.log('✅ Markets header is visible.');
  }

  /**
   * Scroll to a specific market item and tap it
   * @param {string} name - locator key (default: USD/JPY)
   * @param {object} options - scroll options
   */
  async openMarketItem(name = 'usdJpyMarketsListItem', options = { maxAttempts: 8 }) {
    console.log(`🔍 Searching for market item: "${name}"...`);
    const element = await this.scrollToElement(name, options);
    await element.click();
    console.log(`Clicked on "${name}" successfully.`);
  }

  /**
   * Tap on the "1H" timeframe button
   */
  async tapOneHourTimeframe() {
    await this.click('oneHour');
  }

  /**
   * Tap on the "Sell" button
   */
  async tapSellButton() {
    await this.click('sellButton');
  }

  /**
   * Wait until the Buy/Sell bottom sheet is displayed
   */
  async waitForBuySellBottomSheetDisplayed(timeout = this.defaultTimeout) {
    await this.isElementDisplayed(
      'detailBuySellBottomSheet',
      timeout,
      '❌ Buy/Sell bottom sheet not visible'
    );
  }

  /**
   * Select an amount for the trade
   */
  async chooseAmount() {
    await this.click('buySellAmountCard');
  }

  /**
   * Tap on the "Sell Now" button
   */
  async tapSellNowButton() {
    await this.click('sellNowButton');
  }
}

module.exports = new MarketsPage();
