import axios from "axios";
import cheerio from "cheerio";
const url = `https://www.mediawiki.org/w/api.php?`;

const getData = async () => {
  const resolveData = null;
  const errors = [];
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
    const { text } = data;
    text = parseData(text);
    resolveData = text;
  } catch (error) {
    errors.push(error);
  }
  const result = new Promise((resolve, reject) => {
    if (errors.length > 0) reject(errors);
    else resolve(resolveData);
  });
};

const urlHelper = (options) => {
  let copy = url;
  for (let prop in options) {
    copy += `${prop}=${options[prop]}&`;
  }
  return copy;
};

const parseData = (data) => {
  $ = cheerio.load(data['*']);

};
export default getData;
