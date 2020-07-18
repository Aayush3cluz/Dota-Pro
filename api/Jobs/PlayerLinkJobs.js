import cron from "node-cron";
import TeamController from "../Controllers/TeamController";
cron.schedule("* * * * *", async () => {
  try {
    await TeamController.getPlayerLinks();
    console.log("Done");
  } catch (error) {
    console.log(error);
  }
});
