import express from "express";
import {
  getCategories,
  addCategories,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController";
const router = express.Router();
import { protectedRoute } from "../middleware/protectedRoute.js";

router.get("/categories", protectedRoute, getCategories);
router.post("/category", protectedRoute, addCategories);
router.delete("/category/:id", protectedRoute, deleteCategory);
router.patch("/category/:id", protectedRoute, updateCategory);

export default router;
