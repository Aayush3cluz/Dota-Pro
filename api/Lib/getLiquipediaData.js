import axios from "axios";
// import data from './db.json'
import cheerio from "cheerio";
// Set some defaults (required if your JSON file is empty)
// filterTeams();
const getLiqData = async (player) => {
  player = player.replace(" ", "%20");
  const result = new Promise(async (resolve, reject) => {
    const base = `https://liquipedia.net/dota2/api.php?action=parse&page=${player}&format=json`;
    console.log(base);
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
        reject(err);
      });
  });
  return await result;
};

const parser = (params) => {
  const html = params;
  const $ = cheerio.load(html);
  let flags = [
    "name",
    "roman",
    "birth",
    "country",
    "status",
    "team",
    "role",
    "earnings",
    "history",
  ];
  let item = {};
  let histflag = 0;
  $("div.fo-nttax-infobox-wrapper.infobox-dota2 > div > div ").each((i, e) => {
    let text = $(e).text();
    let test = text.toLowerCase().trim();
    flags.forEach((f, i) => {
      if (test.indexOf(f) !== -1) {
        if (test === "history") {
          histflag = 1;
          return;
        } else {
          if (!item[f]) item[f] = processText(text, f);
        }
      }
      if (histflag === 1) {
        item["history"] = processText(text, "hist");
        histflag = 0;
      }
    });
  });
  return item;
};

const processText = (text, f) => {
  const methods = {
    generic: (name) => {
      return name.split("\n")[2].trim();
    },
    role: (str) => {
      str = str.split("\n")[2].trim();
      str = str.split(/(?=[A-Z])/);
      return str;
    },
    history: (str) => {
      str = str.split("\n");
      str = str.filter((s) => s !== "");
      let index = str.indexOf("Dota 2:");
      if (index === -1) {
      } else {
        str = str.splice(index + 1, str.length);
      }
      str = str.map((s) => {
        s = s.trim();
        return s;
      });

      return str;
    },
  };
  if (f === "role") {
    let ret = methods.role(text);
    return ret;
  } else if (f === "hist") {
    return methods.history(text);
  } else {
    let ret = methods.generic(text);
    return ret;
  }
};
export default getLiqData;
