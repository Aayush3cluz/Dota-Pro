import express from "express";
import bodyparser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send({ status: 200, msg: "Welcome to dotaPro backend" });
});

app.listen(3000, () => {
  console.log("App started on port 3000");
});
