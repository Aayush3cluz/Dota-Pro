import cron from "node-cron";
import MatchSchedule from "../Models/Match";
import MatchController from "../Controllers/MatchScheduleController";
import db from "../../config/lowdb";
cron.schedule("*/2 * * * *", () => {
  MatchController.scrape()
    .then((response) => {
      db.get("scrapeReports").push(response).write();
    })
    .catch((err) => {
      db.get("scrapeErrors").push(err).write();
    });
});
