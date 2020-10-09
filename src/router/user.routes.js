import express from "express";
import {verifyToken} from "../middlewares/verifyToken";
import { UserController } from "../controllers/UserController";
const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginUser);
router.delete("/:id", verifyToken, UserController.deleteUser);

export default router;
