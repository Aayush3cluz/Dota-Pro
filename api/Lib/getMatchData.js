import axios from "axios";
import cheerio from "cheerio";

let getData = async () => {
  let resolveData = null;
  let errors = [];
  try {
    const { data } = await axios.get(
      "https://liquipedia.net/dota2/api.php?action=parse&page=Liquipedia:Upcoming%20and%20ongoing%20matches&format=json",
      {
        headers: {
          "Accept-Encoding": "gzip",
          "User-Agent": "aayush3cluzz@gmail.com",
        },
      }
    );
    let text = data.parse.text["*"];
    resolveData = parseData(text);
  } catch (error) {
    errors.push(error);
  }
  const result = new Promise((resolve, reject) => {
    if (errors.length > 0) reject(errors);
    else resolve(resolveData);
  });

  return await result;
};
const parseData = (data) => {
  const $ = cheerio.load(data);
  const items = [];
  const upcoming = $("div[data-toggle-area-content=1]");
  const concluded = $("div[data-toggle-area-content=3]");
  const upcomingMatches = parseDiv($, upcoming, true);
  const concludedMatches = parseDiv($, concluded, false);
  items.push(...upcomingMatches, ...concludedMatches);
  return items;
};
const valiDateItem = (item) => {
  if (item.leftName === undefined) {
    item.leftName = "TBD";
    item.leftInitial = "TBD";
    item.leftImage = "Default";
  }
  if (item.rightName === undefined) {
    item.rightName = "TBD";
    item.rightInitial = "TBD";
    item.rightImage = "Default";
  }
  if (item.concluded === false) {
    item.stream = "";
  }
  return item;
};
const parseDiv = ($, div, flag) => {
  let items = [];
  $(div)
    .find("table.wikitable.wikitable-striped.infobox_matches_content")
    .each((index, element) => {
      let item = {};
      const firstRow = $(element).find("tr").eq(0);
      const secondRow = $(element).find("tr").eq(1);
      item.leftInitial = $(firstRow)
        .find("td.team-left > span > span > a")
        .text();
      item.rightInitial = $(firstRow)
        .find("td.team-right > span > span > a")
        .text();
      item.leftName = $(firstRow)
        .find("td.team-left > span > span > a")
        .attr("title");
      item.rightName = $(firstRow)
        .find("td.team-right > span > span > a")
        .attr("title");
      item.leftImage =
        "https://liquipedia.net" +
        $(firstRow)
          .find("td.team-left > span > span.team-template-image > a > img")
          .attr("src");
      item.rightImage =
        "https://liquipedia.net" +
        $(firstRow)
          .find("td.team-right > span > span.team-template-image > a > img")
          .attr("src");
      item.score = flag
        ? $(firstRow).find("td.versus > div").eq(0).text()
        : $(firstRow).find("td.versus").text();
      item.bestOf = $(firstRow).find("td.versus > div").eq(1).text();
      item.stream = $(secondRow)
        .find("td > span > span")
        .attr("data-stream-twitch");
      item.time = $(secondRow).find("td > span > span").text();
      item.leagueImage =
        "https://liquipedia.net" +
        $(secondRow).find("td > div > span > span > a > img").attr("src");
      item.leagueName = $(secondRow).find("td > div > div > a").attr("title");
      item.concluded = flag;
      item = valiDateItem(item);

      items.push(item);
    });
  return items;
};

// parseData();
export default getData;
