import cron from "node-cron";
import PLayerController from "../Controllers/PlayerController";
cron.schedule("*/30 * * * * *", async () => {
  try {
    await PLayerController.scrape();
    console.log("Done");
  } catch (error) {
    console.log(error);
  }
});
