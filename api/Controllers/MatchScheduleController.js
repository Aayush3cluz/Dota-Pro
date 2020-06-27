import getMatchData from "../Lib/getMatchData";
import db from "../../config/lowdb";
import MatchSchedule from "../Models/Match";
const MatchScheduleController = {
  getUpcoming: async (req, res, next) => {
    try {
      const matches = await MatchSchedule.find({
        type: "Upcoming",
        score: "vs",
      });
      res.send(matches);
    } catch (error) {
      res.send(error);
    }
  },
  getLive: async (req, res, next) => {
    try {
      const matches = await MatchSchedule.find({
        type: "Upcoming",
        score: { $ne: "vs" },
      });
      res.send(matches);
    } catch (error) {
      res.send(error);
    }
  },
  getRecent: async (req, res, next) => {
    try {
      const matches = await MatchSchedule.find({ type: "Finished" });
      res.send(matches);
    } catch (error) {
      res.send(error);
    }
  },
  scrape: async () => {
    let errors = [];

    try {
      const data = await getMatchData();
      const deleted = await MatchSchedule.deleteMany({});
      const reply = await MatchSchedule.insertMany(data);
    } catch (error) {
      errors.push(error);
      console.log(error);
    }

    let result = new Promise((resolve, reject) => {
      if (errors.length > 0) reject(errors);
      else resolve(Date.now());
    });
  },
};
export default MatchScheduleController;
