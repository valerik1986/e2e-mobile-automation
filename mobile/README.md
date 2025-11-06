Mobile E2E Automation Project
🧪 Automated end-to-end tests for the Fundix mobile application (Android/iOS)

This project provides a full-scale mobile automation framework built with WebdriverIO + Appium + Mocha + Chai, designed for both Android and iOS testing.
It uses the Page Object Model (POM) architecture for reusability, readability, and easy maintenance.


🚀 Tech Stack
Category -	Technology
Programming language -	JavaScript (Node.js)
Test runner	- Mocha
Assertion library -	Chai
Automation framework -	WebdriverIO (v8)
Mobile driver -	Appium (UiAutomator2 / XCUITest)
Design pattern - Page Object Model (POM)
Reporting- (optionally) Allure Reporter / Spec Reporter
Environment config - dotenv
CI-ready - BrowserStack / Azure DevOps / Jenkins

📂 Project Structure
e2e-engage365-mobile/
├── test/
│   ├── helpers/
│   │   └── assert.js
│   ├── locators/
│   │   ├── signinpage-locators.js
│   │   ├── homepage-locators.js
│   │   ├── marketspage-locators.js
│   │   ├── portfoliopage-locators.js
│   │   └── morepage-locators.js
│   │   └── profilepage-locators.js
│   ├── pageobjects/
│   │   ├── base-page.js
│   │   ├── signin-page.js
│   │   ├── home-page.js
│   │   ├── markets-page.js
│   │   ├── more-page.js
│   │   ├── portfolio-page.js
│   │   └── profile-page.js
│   ├── specs/
│   │   └── test.e2e.js
│   └── suites/
│       └── engageRegression.js
│
├── apps/
│   ├── ios/
│   │   └── Engage_3.0.148.ipa
│   └── android/
│       └── Engage_3.0.148.apk
│
├── wdio.conf.js
├── package.json
├── .env.qa
└── README.md

🧠 Test Scenario
File: test/specs/test.e2e.js

Main end-to-end scenario:

1. Login to the app

- Verify login screen

- Enter credentials

- Wait for Home screen

2. Navigate through tabs

 - Portfolio → More → Markets

3. Perform Sell flow in USD/JPY market

- Select market, open item, set amount, sell now

4. Verify and close position in Portfolio

- Validate open position

- Close it and confirm

- Verify empty state

5. Logout from Profile

- Tap avatar

- Validate user info

- Confirm logout


👤 Author

Valery Maksimovich
QA Automation Engineer
📧 valerymaks1986@gmail.com

💬 Telegram: @valerik1986