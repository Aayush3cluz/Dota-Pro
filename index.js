import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import ScheduleRoutes from "./api/Routes/MatchSchedule";
import mongoose from "mongoose";
import keys from "./config/Development";
//Initialize app
const app = express();
import "./api/Jobs/MatchScheduleJobs";
//Middleware
app.use(cors());
app.use(bodyparser.json());
//Default route
app.get("/", async (req, res) => {
  res.send({ status: 200, msg: "Welcome to Dota Pro Backend" });
});

//Connect Mongoose
mongoose
  .connect(keys.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongo"))
  .catch((err) => console.log(err));

//Use routes
app.use("/api/schedule/", ScheduleRoutes);

//Start server
app.listen(3000, () => {
  console.log("App started on port 3000");
});
export default app;
