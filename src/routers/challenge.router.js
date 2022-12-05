import express from "express";
const router = express.Router();

import { ChallengeController } from "../controllers/challenge.controller.js";

router.post("/create", ChallengeController.create);
router.post("/join/:id",ChallengeController.join);
router.post("/leave/:id",ChallengeController.leave);

router.get("/getAll", ChallengeController.getAll);

router.get("/get/:id", ChallengeController.get);

router.put("/update/:id", ChallengeController.update);

router.delete("/delete/:id", ChallengeController.delete);

router.get("/getParticipants/:id", ChallengeController.getParticipantsOfChallenge);

router.get("/getWithUser/:id", ChallengeController.getWithUser);

export default router;
