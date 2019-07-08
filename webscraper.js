const puppeteer = require("puppeteer");

const preparePageForTests = async page => {
    // Pass the User-Agent Test.
    const userAgent =
        "Mozilla/5.0 (X11; Linux x86_64)" +
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
    await page.setUserAgent(userAgent);
};

(async () => {
    const extractListOfSearchedItems = async url => {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });
        await page.waitForSelector("div.search__results__page");
        // await page.screenshot({ path: "example.png" });
        const items = await page.evaluate(() =>
            Array.from(document.querySelectorAll("div.product-card")).map(item => ({
                itemLink: item.querySelector("a.product-card__image").href,
                itemName: item.querySelector("div.item-details__name").innerText,
                itemPrice: item.querySelector("div.item-details__price").innerText,
                country: item.querySelector("div.item-details__country").innerText
            }))
        );

        await page.close();
        return items;
    };
    const browser = await puppeteer.launch();
    const url = "https://www.airfrov.com/search?category=Lifestyle%20Gadgets";
    const items = await extractListOfSearchedItems(url);

    console.log(items);
    console.log(items.length);
    await browser.close();
})();
