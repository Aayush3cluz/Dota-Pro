import cron from "node-cron";
import TeamController from "../Controllers/TeamController";
cron.schedule("*/10 * * * * *", async () => {
  try {
    await TeamController.savePlayers();
    console.log("Done");
  } catch (error) {
    console.log(error);
  }
});
