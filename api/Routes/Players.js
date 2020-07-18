import express from "express";
import PlayerController from "../Controllers/PlayerController";
const router = express.Router();

router.get("/", PlayerController.getAll);
// router.get("/test", PlayerController.scrape);
// router.get("/:id", PlayerController.getProfile);
router.get("/name/:id", PlayerController.nameSearch);

export default router;
