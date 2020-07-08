import express from "express";
import PlayerController from "../Controllers/PlayerController";
const router = express.Router();

router.get("/", PlayerController.getAll);

export default router;
