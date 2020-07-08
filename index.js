import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import keys from "./config/Development";

import ScheduleRoutes from "./api/Routes/MatchSchedule";
import TeamRoutes from "./api/Routes/Teams";
import PlayerRoutes from "./api/Routes/Players";

//Initialize app
const app = express();
// import "./api/Jobs/MatchScheduleJobs";
// import "./api/Jobs/PlayerScrapeJobs";
//Middleware
app.use(cors());
app.use(bodyparser.json());
//Default route
app.get("/", async (req, res) => {
  res.send({ status: 200, msg: "Welcome to Dota Pro Backend" });
});

//Connect Mongoosegit
mongoose
  .connect(keys.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongo"))
  .catch((err) => console.log(err));

//Use routes
app.use("/api/schedule/", ScheduleRoutes);
app.use("/api/teams/", TeamRoutes);
app.use("/api/players/", PlayerRoutes);

//Start server
app.listen(4000, () => {
  console.log("App started on port 3000");
});
export default app;
