import express from "express";
import {
  getCategories,
  addCategories,
  deleteCategory,
} from "../controllers/categoryController";
const router = express.Router();
import { protectedRoute } from "../middleware/protectedRoute.js";

router.get("/categories", protectedRoute, getCategories);
router.post("/category", protectedRoute, addCategories);
router.delete("/category/:id", protectedRoute, deleteCategory);

export default router;
