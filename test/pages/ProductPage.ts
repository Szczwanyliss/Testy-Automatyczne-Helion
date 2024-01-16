class ProductPage {
    get productTitle() {
    return $("div.title-group >h1 >span");
    }

    get addToCartBtn() {
        return $("a#addToBasket_tefust");
    }

    get productPrice() {
        return $("ins#cena_d");
    }

    async getProductPrice():Promise<string> {
        const price:WebdriverIO.Element = await this.productPrice;
        await price.waitForDisplayed();
        return await price.getText();
    }

    async getProductTitleValue() {
        const title:WebdriverIO.Element = await this.productTitle;
        await title.waitForDisplayed();
        return await title.getText();

    }

    async clickOnAddCartBtn() {
        const btn:WebdriverIO.Element =await this.addToCartBtn;
        await btn.waitForDisplayed();
        await btn.click();
    }

    async addToCartBtnVisible() {
        const btn:WebdriverIO.Element =await this.addToCartBtn;
        await btn.waitForDisplayed();
    }

    async productTitleIsVisible() {
        const title:WebdriverIO.Element = await this.productTitle;
        await title.waitForDisplayed();
    }

}

export default new ProductPage();