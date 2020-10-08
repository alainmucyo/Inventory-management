import express from "express";
import ProductController from "../controllers/ProductController";
import verify from "../middlewares/verifyToken";

const router = express.Router();

router.get("/", ProductController.index);
// router.get("/:id", ArticleController.show)
router.post("/", verify, ProductController.store);
router.put("/:id", verify, ProductController.update);
router.delete("/:id", verify, ProductController.destroy);

export default router;
