import express from "express";
import TeamController from "../Controllers/TeamController";
const router = express.Router();

router.get("/", TeamController.getTeams);
// router.get("/test", TeamController.getPlayerLinks);
router.get("/:id", TeamController.getPlayers);

export default router;
