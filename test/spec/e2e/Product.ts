import { searchPhrase, alertMessage, deletedProductMessage } from "../../config/data";
import { helionHomeUrl, searchProductUrl, cartUrl } from "../../config/pagesUrl";
import SearchbarPage from "../../pages/compoments/SearchbarPage";
import ResultPages from "../../pages/ResultPages";
import ProductPage from "../../pages/ProductPage";
import CartPage from "../../pages/CartPage";

describe("E2E - Products", async () => {
    let productTitle: string = "";
    let price: string = "";

    before(() => {
        browser.url(helionHomeUrl);
    })

it("Should type search phrase and click search icon", async() =>  {
    await SearchbarPage.typeSearchPhrase(searchPhrase);
    await SearchbarPage.clickOnSearchIcon();
    await expect(browser).toHaveUrl(searchProductUrl);
    
})

    it("Should click on first book", async() =>  {
        await ResultPages.clickOnFirstBookItem();
        await ProductPage.productTitleIsVisible();
        await ProductPage.addToCartBtnVisible();
        productTitle = await ProductPage.getProductTitleValue();
        price = await ProductPage.getProductPrice();

    })

    it("Should click on add to cart button",async () => {
        await ProductPage.clickOnAddCartBtn();
        await expect(browser).toHaveUrlContaining(cartUrl);
        await expect(await CartPage.getSuccessAlertValue()).toContain(productTitle);
        await expect(await CartPage.getTotalPriceValue()).toContain(price);

    })

    it("Should delete product from cart", async() => {
        await CartPage.clickOnCheckbox();
        await CartPage.clickOnDeleteSelectedLabel();
        await expect(await browser.getAlertText()).toContain(alertMessage);
        await CartPage.acceptDeleteAlert();
        await expect(await CartPage.getDeletedAlertMessageValue()).toContain(deletedProductMessage);
    })

})