import getMatchData from "../Lib/getMatchData";
import db from "../../config/lowdb";
import MatchSchedule from "../Models/Match";
const MatchScheduleController = {
  getData: async (req, res, next) => {
    try {
      const matches = await MatchSchedule.find({});
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
    }

    let result = new Promise((resolve, reject) => {
      if (errors.length > 0) reject(errors);
      else resolve(Date.now());
    });
  },
};
export default MatchScheduleController;
