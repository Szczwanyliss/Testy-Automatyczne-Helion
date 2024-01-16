import GlobalPages from "../../pages/GlobalPages";
import SearchbarPage from "../../pages/compoments/SearchbarPage";
import ResultPages from "../../pages/ResultPages";
import { helionHomeUrl, notFoundUrl, searchPageUrl } from "../../config/pagesUrl";
import { helionSearchUrl } from "../../config/pagesUrl";
import { incorrectSearchPhrase, notFoundMessage, searchPhrase, searchResultTitle } from "../../config/data";




describe("E2E - SearchBar", async () => {
    it("Should open helion home page and verify url and visible searchbar", async () => {
        await GlobalPages.openPage(helionHomeUrl, helionHomeUrl );
        await SearchbarPage.searchBarIsVisible();
    })

    it("Should click on search icon, and verify url", async () => {
        await SearchbarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(helionSearchUrl);

    })

    it("Should type search value and verify visible popup", async () => {
        await SearchbarPage.typeSearchPhrase(searchPhrase);
        await SearchbarPage.suggestPopupIsVisible();

    })

    it("Should click on see all books button", async () => {
        await SearchbarPage.clickOnSeeAllBooksBtn();
        await expect(browser).toHaveUrl( searchPageUrl);

    })

    it("Should verify visible correctly title and number of books",async () => {
        const title:string = await ResultPages.getPageTitle();
        const numberOfBooks:number =await ResultPages.getNumberOfBooks();
        await expect(title).toContain(searchResultTitle)
        await expect(numberOfBooks).toEqual(120);
        
    })

    it("Should input value",async () => {
        await SearchbarPage.clearSearchBar();
        await expect(await SearchbarPage.getInputValue()).toContain("");
        
    })

    it("Should type incorrect book name and verify alert", async () => {
        await SearchbarPage.typeSearchPhrase(incorrectSearchPhrase);
        await SearchbarPage.clickOnSearchIcon();
        await expect(await SearchbarPage.getNotFoundAlertText()).toContain(notFoundMessage);
    }) 

    it("Should clear input value and click on search icon", async() => {
        await SearchbarPage.clearSearchBar();
        await SearchbarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(notFoundUrl);
        await expect(await SearchbarPage.getInputValue()).toContain("");
    })

})