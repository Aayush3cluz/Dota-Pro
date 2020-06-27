import express from "express";
import ScheduleController from "../Controllers/MatchScheduleController";
const router = express.Router();

router.get("/upcoming", ScheduleController.getUpcoming);
router.get("/live", ScheduleController.getLive);
router.get("/recent", ScheduleController.getRecent);

export default router;
