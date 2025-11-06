const { $, $$, driver } = require('@wdio/globals');

/**
 * 🧩 BasePage — shared utility class for all page objects
 * Handles selectors, waits, scrolling, gestures, and common UI interactions.
 */
class BasePage {
  constructor() {
    this.platform = this.getPlatform();
    this.isAndroid = this.platform === 'Android';
    this.defaultTimeout = 10000;
  }

  /* -------------------- Platform -------------------- */

  getPlatform() {
    const platform = process.env.PLATFORM;
    if (!platform || !['Android', 'IOS'].includes(platform)) {
      throw new Error('❌ PLATFORM must be set to "Android" or "IOS"');
    }
    return platform;
  }

  /* -------------------- Selector Resolver -------------------- */

  resolveSelector(name) {
    const platformKey = `${name}${this.platform}`;
    const selector = this.selectors?.[platformKey];
    if (!selector) {
      throw new Error(`❌ Selector "${name}" not found for ${this.platform}`);
    }
    return selector;
  }

  /* -------------------- Element Getters -------------------- */

  async getElement(name) {
    const locator = this.resolveSelector(name);
    return await $(locator);
  }

  async waitForElement(name, timeout = this.defaultTimeout) {
    const locator = this.resolveSelector(name);
    const el = await $(locator);
    await el.waitForDisplayed({ timeout });
    return el;
  }

  async findElements(name, timeout = 2000) {
    const locator = this.resolveSelector(name);
    await driver
      .waitUntil(async () => (await $$(locator)).length > 0, {
        timeout,
        timeoutMsg: `❌ Elements "${name}" not found within ${timeout} ms`,
      })
      .catch(() => {});
    return await $$(locator);
  }

  /* -------------------- Universal Visibility Helpers -------------------- */

  /**
   * Check if an element is visible on the screen
   * @param {string} name - locator key
   * @param {number} timeout - timeout in ms
   * @returns {Promise<boolean>}
   */
  async isVisible(name, timeout = this.defaultTimeout) {
    try {
      const el = await this.waitForElement(name, timeout);
      return await el.isDisplayed();
    } catch {
      return false;
    }
  }

  /**
   * Wait until an element becomes visible
   * @param {string} name - locator key
   * @param {number} timeout - timeout in ms
   * @param {string} message - optional custom error message
   */
  async waitUntilVisible(name, timeout = this.defaultTimeout, message) {
    const visible = await this.isVisible(name, timeout);
    if (!visible) {
      throw new Error(message || `❌ Element "${name}" not visible within ${timeout} ms`);
    }
    return true;
  }

  /**
   * Wait until an element disappears from screen
   * @param {string} name - locator key
   * @param {number} timeout - timeout in ms
   * @param {string} message - optional custom error message
   */
  async waitUntilHidden(name, timeout = this.defaultTimeout, message) {
    await driver.waitUntil(async () => !(await this.isVisible(name, 1000)), {
      timeout,
      timeoutMsg: message || `❌ Element "${name}" still visible after ${timeout} ms`,
    });
  }

  /* -------------------- Checks -------------------- */

  async isElementDisplayed(name, timeout = 2000) {
    try {
      const el = await this.waitForElement(name, timeout);
      return await el.isDisplayed();
    } catch (err) {
      console.warn(`⚠️ Element "${name}" not displayed: ${err.message}`);
      return false;
    }
  }

  async isButtonEnabled(name, expected = true) {
    const el = await this.waitForElement(name);
    const actual = await el.isEnabled();
    return actual === expected;
  }

  async isTextMatching(name, expectedText, exact = true) {
    const el = await this.waitForElement(name);
    const actualText = await el.getText();
    if (!actualText) return false;
    return exact ? actualText === expectedText : actualText.includes(expectedText);
  }

  /* -------------------- Actions -------------------- */

  /**
   * Click an element by name or direct element reference
   */
  async click(nameOrElement) {
    const el =
      typeof nameOrElement === 'string'
        ? await this.waitForElement(nameOrElement)
        : nameOrElement;
    await el.click();
  }

  /**
   * Clear and set text value into an input field
   */
  async setValue(name, value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new Error(`❌ setValue() expects string or number, got ${typeof value}`);
    }

    const el = await this.waitForElement(name);
    await el.clearValue();
    await el.setValue(value.toString());
  }

  /**
   * Get attribute from element
   */
  async getAttribute(nameOrElement, attribute) {
    const el =
      typeof nameOrElement === 'string'
        ? await this.waitForElement(nameOrElement)
        : nameOrElement;
    return await el.getAttribute(attribute);
  }

  /* -------------------- Fast Scrolling -------------------- */

  /**
   * Quickly scroll to an element with swipe gestures
   */
  async scrollToElement(name, { maxAttempts = 6, direction = 'up' } = {}) {
    console.log(`🔍 Scrolling to "${name}"...`);
    for (let i = 0; i < maxAttempts; i++) {
      const elements = await this.findElements(name);
      if (elements.length > 0) {
        const element = elements[0];
        if (await element.isDisplayed()) {
          console.log(`✅ Found "${name}" on attempt ${i + 1}`);
          return element;
        }
      }
      console.log(`🔄 Swipe ${direction} (${i + 1}/${maxAttempts})`);
      await this.fastSwipe(direction);
      await driver.pause(200);
    }
    throw new Error(`❌ Element "${name}" not found after ${maxAttempts} scrolls`);
  }

  /* -------------------- Gestures -------------------- */

  async fastSwipe(direction) {
    const { width, height } = await driver.getWindowRect();
    const coords = this.getSwipeCoords(width, height, direction, true);
    await this.performSwipe(coords, 200);
  }

  async swipe(direction) {
    const { width, height } = await driver.getWindowRect();
    const coords = this.getSwipeCoords(width, height, direction, false);
    await this.performSwipe(coords, 500);
    await driver.pause(300);
  }

  /**
   * Define coordinates for swipe directions
   */
  getSwipeCoords(width, height, direction, fast = false) {
    const delta = fast ? 0.2 : 0.3;
    const map = {
      up: {
        startX: width * 0.5,
        startY: height * (1 - delta),
        endX: width * 0.5,
        endY: height * delta,
      },
      down: {
        startX: width * 0.5,
        startY: height * delta,
        endX: width * 0.5,
        endY: height * (1 - delta),
      },
      left: {
        startX: width * (1 - delta),
        startY: height * 0.5,
        endX: width * delta,
        endY: height * 0.5,
      },
      right: {
        startX: width * delta,
        startY: height * 0.5,
        endX: width * (1 - delta),
        endY: height * 0.5,
      },
    };

    if (!map[direction]) {
      throw new Error(`❌ Invalid swipe direction: ${direction}`);
    }

    return map[direction];
  }

  /**
   * Perform a swipe gesture (cross-platform)
   */
  async performSwipe(coords, duration) {
    if (this.platform === 'IOS') {
      await driver.execute('mobile: dragFromToForDuration', {
        fromX: coords.startX,
        fromY: coords.startY,
        toX: coords.endX,
        toY: coords.endY,
        duration: duration / 1000,
      });
    } else {
      await driver.performActions([
        {
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: coords.startX, y: coords.startY },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerMove', duration, x: coords.endX, y: coords.endY },
            { type: 'pointerUp', button: 0 },
          ],
        },
      ]);
    }
  }
}

module.exports = BasePage;
