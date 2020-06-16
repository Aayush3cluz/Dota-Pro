import express from "express";
import ScheduleController from "../Controllers/MatchScheduleController";
const router = express.Router();

router.get("/", ScheduleController.getData);

export default router;
