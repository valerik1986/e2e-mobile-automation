const { expect } = require('chai');
const SignInPage = require('../pageobjects/signin-page');
const HomePage = require('../pageobjects/home-page');
const MarketsPage = require('../pageobjects/markets-page');
const PortfolioPage = require('../pageobjects/portfolio-page');
const ProfilePage = require('../pageobjects/profile-page');
const MorePage = require('../pageobjects/more-page');

describe('Fundix App - End-to-End Flow', () => {

  it('Should log in successfully', async () => {
    await SignInPage.waitForScreen();
    await SignInPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    await HomePage.waitForHomePageDisplayed();
  });

  it('Should navigate between Portfolio and More tabs', async () => {
    await HomePage.tapTab('portfolioTab');
    await PortfolioPage.waitForPortfolioPageDisplayed();
    await HomePage.tapTab('moreTab');
    await MorePage.waitForMorePageDisplayed();
  });

  it('Should open Markets tab and verify Markets header', async () => {
    await HomePage.tapTab('marketsTab');
    await MarketsPage.waitForMarketsHeader();
  });

  it('Should scroll to USD/JPY market item and open it', async () => {
    await MarketsPage.openMarketItem('usdJpyMarketsListItem', { maxAttempts: 8 });
  });

  it('Should perform Sell flow inside USD/JPY market', async () => {
    await MarketsPage.tapOneHourTimeframe();
    await MarketsPage.tapSellButton();
    await MarketsPage.waitForBuySellBottomSheetDisplayed();

    expect(await MarketsPage.isVisible('detailBuySellBottomSheet')).to.be.true;

    await MarketsPage.chooseAmount();
    await MarketsPage.tapSellNowButton();
  });

  it('Should verify and close position from Portfolio tab', async () => {
    await HomePage.tapTab('portfolioTab');
    await PortfolioPage.waitForPortfolioPageDisplayed();

    expect(await PortfolioPage.isPortfolioHeaderTitleMatching('$5,000')).to.be.true;

    await PortfolioPage.tapOnPosition();
    expect(await PortfolioPage.isOpenPositionHeaderMatching('Open position')).to.be.true;

    await PortfolioPage.tapClosePositionButton();
    await PortfolioPage.waitForClosePositionScreenDisplayed();

    expect(await PortfolioPage.isClosePositionAmountMatching('5000')).to.be.true;

    await PortfolioPage.tapConfirmClosePositionButton();
    expect(await PortfolioPage.isEmptyPortfolioTitleMatching('No open positions')).to.be.true;
  });

  it('Should log out from Profile', async () => {
    await HomePage.tapHeaderAvatar();

    expect(await ProfilePage.isProfileFullNameMatching('Trader ')).to.be.true;

    await ProfilePage.scrollAndTapSignOutButton();
    await ProfilePage.waitForLogOutPopUpDisplayed();

    expect(await ProfilePage.isVisible('logOutPopUp')).to.be.true;

    await ProfilePage.tapLogOutButton();
    await SignInPage.waitForScreen();

    expect(await SignInPage.isVisible('emailField')).to.be.true;
  });
});
