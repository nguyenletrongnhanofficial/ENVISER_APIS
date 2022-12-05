import express from "express";
const router = express.Router();

import { GarbageController } from "../controllers/garbage.controller.js";

//CREATE Garbage
router.post("/createGarbage", GarbageController.createGarbage);

//GET ALL Garbage
router.get("/getAllGarbage", GarbageController.getAllGarbage);

//GET AN Garbage
router.get("/getGarbage/:id", GarbageController.getGarbage);

//UPDATE AN Garbage
router.put("/updateGarbage/:id", GarbageController.updateGarbage);

//DELETE AN Garbage
router.delete("/deleteGarbage/:id", GarbageController.deleteGarbage);

export default router;
