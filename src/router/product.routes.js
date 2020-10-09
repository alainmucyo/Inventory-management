import express from "express";
import ProductController from "../controllers/ProductController";

import {verifyToken} from "../middlewares/verifyToken";


const router = express.Router();

router.get("/", ProductController.index);
// router.get("/:id", ArticleController.show)
router.post("/", verifyToken, ProductController.store);
router.put("/:id", verifyToken, ProductController.update);
router.delete("/:id", verifyToken, ProductController.destroy);


router.patch("/:id", ProductController.updateQuantity);
router.patch("/dispatch/:id",ProductController.dispatchProductQuantity);


export default router;
