const { fstat } = require("fs");
const puppeteer = require("puppeteer");
const fs = require("fs/promises");
async function getVisual(cities) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    for (const c of cities) {
      const url = `https://www.yelp.com/search?find_desc=Restaurants&find_loc=${c[0]}%2C+${c[1]}`;
      await page.goto(url);
      console.log(url);
      const city = await page.evaluate(() => {
        const cityName = Array.from(
          document.querySelectorAll("div h1 span")
        ).map((x) => x.textContent);
        const restruant = Array.from(
          document.querySelectorAll("h3 span a")
        ).map((x) => x.textContent);
        return cityName.concat(restruant);
      });
      console.log(city);

      await fs.appendFile("fruit.txt", city.join("\r\n"));
      await fs.appendFile("fruit.txt", "\r\n");
    }

    await browser.close();
  } catch (error) {
    console.log(error);
  }
}
cities = [
  ["Paris", "France"],
  ["London", "United Kingdom"],
];
getVisual(cities);
