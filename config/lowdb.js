import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({
  scrapeErrors: [],
  scrapeReports: [],
  team: [],
  teamErrors: [],
  liq: [],
}).write();

export default db;
