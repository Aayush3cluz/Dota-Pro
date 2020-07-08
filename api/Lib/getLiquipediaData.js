const getLiqData = async (player) => {
  const result = new Promise(async (resolve, reject) => {
    const base = `https://liquipedia.net/dota2/api.php?action=parse&page=${player}&format=json`;
    axios
      .get(base, {
        headers: {
          "Accept-Encoding": "gzip",
          "User-Agent": "aayush3cluzz@gmail.com",
        },
      })
      .then(({ data }) => {
        const html = data.parse.text["*"];
        const result = parser(html);
      });
  });
};

const parser = (html) => {
  const $ = cheerio.load(html);
  const table = $("div.fo-nttax-infobox-wrapper.infobox-dota2 > div").eq(0);
  const player = {};
  player.name = $(table)
    .find("div:nth-child(5) > div.infobox-cell-2:nth-child(2)")
    .text();
  player.birth = $(table)
    .find("div:nth-child(6) > div.infobox-cell-2:nth-child(2)")
    .text();
  player.country = $(table)
    .find("div:nth-child(7) > div.infobox-cell-2:nth-child(2)")
    .text();
  player.status = $(table)
    .find("div:nth-child(8) > div.infobox-cell-2:nth-child(2)")
    .text();
  player.team = $(table)
    .find("div:nth-child(9) > div.infobox-cell-2:nth-child(2)")
    .text();
  player.roles = $(table)
    .find("div:nth-child(10) > div.infobox-cell-2:nth-child(2)")
    .text();
  player.earnings = $(table)
    .find("div:nth-child(12) > div.infobox-cell-2:nth-child(2)")
    .text();
  const histDiv = $(table).find("div:nth-child(16) > div.infobox-center");
  player.history = [];
  $(histDiv)
    .find("div")
    .each((i, e) => {
      if (i % 4 === 0) {
        let date = $(e).find("div").eq(0).text();
        let team = $(e).find("div").eq(1).text();
        player.history.push({ date, team });
      }
    });
  return player;
};
