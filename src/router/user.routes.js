import express from "express";
import verify from "../middlewares/verifyToken";
import { UserController } from "../controllers/UserController";
const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginUser);
router.delete("/:id", verify, UserController.deleteUser);

export default router;
