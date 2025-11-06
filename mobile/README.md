# 📱 Mobile E2E Automation Project  
🧪 **Automated end-to-end tests for the Fundix mobile application (Android/iOS)**

This project provides a full-scale mobile automation framework built with **WebdriverIO + Appium + Mocha + Chai**, designed for both Android and iOS testing.  
It uses the **Page Object Model (POM)** architecture for reusability, readability, and easy maintenance.

---

## 🚀 Tech Stack

| Category | Technology |
|-----------|-------------|
| Programming language | JavaScript (Node.js) |
| Test runner | Mocha |
| Assertion library | Chai |
| Automation framework | WebdriverIO (v8) |
| Mobile driver | Appium (UiAutomator2 / XCUITest) |
| Design pattern | Page Object Model (POM) |
| Reporting | Allure Reporter / Spec Reporter (optional) |
| Environment config | dotenv |
| CI-ready | BrowserStack / Azure DevOps / Jenkins |

---

## 📁 Project Structure

```text
e2e-AUTOMATION/
│
├── test/
│   ├── helpers/
│   ├── locators/
│   │   ├── signinpage-locators.js
│   │   ├── homepage-locators.js
│   │   ├── marketspage-locators.js
│   │   ├── portfoliopage-locators.js
│   │   ├── morepage-locators.js
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
│       └── test.e2e.js
│   
├── apps/
│   ├── ios/
│   │   └── 
│   └── android/
│       └── 
│
├── wdio.conf.js
├── package.json
├── .env.qa
└── README.md


---

## 🧠 Test Scenario  
**File:** `test/specs/test.e2e.js`

### Main end-to-end scenario:

#### 1️⃣ Login to the app
- Verify login screen  
- Enter credentials  
- Wait for Home screen  

#### 2️⃣ Navigate through tabs
- Portfolio → More → Markets  

#### 3️⃣ Perform Sell flow in USD/JPY market
- Select market  
- Open item  
- Set amount  
- Tap “Sell now”  

#### 4️⃣ Verify and close position in Portfolio
- Validate open position  
- Close it and confirm  
- Verify empty state  

#### 5️⃣ Logout from Profile
- Tap avatar  
- Validate user info  
- Confirm logout  

---

## 👤 Author

**Valery Maksimovich**  
*QA Automation Engineer*  

📧 [valerymaks1986@gmail.com](mailto:valerymaks1986@gmail.com)  
💬 Telegram: [@valerik1986](https://t.me/valerik1986)

---
