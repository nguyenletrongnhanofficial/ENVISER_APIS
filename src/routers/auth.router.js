import express from "express";
const router = express.Router();

import { AuthController } from "../controllers/auth.controller.js";

//CREATE USER
router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

//GET ALL USER
router.get("/getAllUser", AuthController.getAllUser);

//GET AN USER
router.get("/getUserData/:id", AuthController.getUserData);

//UPDATE AN USER
router.put("/updateUser/:id", AuthController.updateUser);
//DELETE AN USER
router.delete("deleteUser/:id", AuthController.deleteUser);
router.put("/changePassword/:id", AuthController.changePassword);
export default router;
