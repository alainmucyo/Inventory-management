import express from "express"
import ProductController from "../controllers/ProductController";
const router = express.Router()

router.get("/", ProductController.index)
// router.get("/:id", ArticleController.show)
router.post("/",  ProductController.store)
router.put("/:id", ProductController.update)
router.delete("/:id",  ProductController.destroy)

export default router