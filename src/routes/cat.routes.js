import { Router } from "express";
import { createCategory, getAllCategories, getCategoryById } from "../controllers/category/category.controller.js";

const router = new Router();

router.route("/create").post(createCategory)
router.route("/getall").get(getAllCategories)
router.route("/:id").get(getCategoryById);

export default router