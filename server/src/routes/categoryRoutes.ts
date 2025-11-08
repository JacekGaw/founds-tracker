import express from "express";
import { getCategories } from "../controllers/categoryController";
const router = express.Router();
import { protectedRoute } from "../middleware/protectedRoute.js";

router.get("/categories", protectedRoute, getCategories);

export default router;
