import express from "express";
import { addNewTransaction } from "../controllers/transactionController.js";
const router = express.Router();
import { protectedRoute } from "../middleware/protectedRoute.js";

router.post("/transaction", protectedRoute, addNewTransaction);

export default router;
