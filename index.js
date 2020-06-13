import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import getData from "./api/Lib/getMatchData";
const app = express();

app.use(cors());
app.use(bodyparser.json());

app.get("/", async (req, res) => {
  getData();
});

app.listen(3000, () => {
  console.log("App started on port 3000");
});
