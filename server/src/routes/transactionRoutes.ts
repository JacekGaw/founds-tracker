import express from "express";
import { addNewTransaction, getTransactions } from "../controllers/transactionController.js";
const router = express.Router();
import { protectedRoute } from "../middleware/protectedRoute.js";

router.get("/transactions", protectedRoute, getTransactions);
router.post("/transaction", protectedRoute, addNewTransaction);

export default router;
