import axios from "axios";
import cheerio from "cheerio";

const getData = async (team) => {
  const result = new Promise(async (resolve, reject) => {
    const base = `https://liquipedia.net/dota2/api.php?action=parse&page=${team}&format=json`;
    axios
      .get(base, {
        headers: {
          "Accept-Encoding": "gzip",
          "User-Agent": "aayush3cluzz@gmail.com",
        },
      })
      .then(({ data }) => {
        if (data.error) {
          resolve(null);
        } else {
          const html = data.parse.text["*"];
          resolve(parser(html));
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
  return await result;
};

const parser = (html) => {
  let $ = cheerio.load(html);
  let table = $("table.wikitable.wikitable-striped.roster-card > tbody").eq(0);
  let items = [];
  $(table)
    .find("tr.Player")
    .each((i, e) => {
      let item = {};
      item.id = $(e).find("td").eq(0).text().trim();
      item.name = $(e).find("td").eq(1).text();
      item.pos = $(e).find("td").eq(2).text();
      item.join = $(e).find("td").eq(3).text();
      item.link = $(e).find("#player > a").attr("href");
      items.push(item);
    });
  return items;
};

export default getData;
