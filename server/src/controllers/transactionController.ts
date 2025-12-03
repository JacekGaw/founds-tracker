import { RequestHandler, Response } from "express";
import { CustomRequest } from "../middleware/protectedRoute.js";
import {
  addNewTransactionDB,
  getTransactionsDB,
} from "../services/transactionServices.js";

type GetTransactionsParamsType = {
  categoryId?: string;
  type?: "expense" | "savings" | "income";
  from?: string;
  to?: string;
  phrase?: string;
};
export const getTransactions: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found", error: "Unauthorized" });
    }
    const { categoryId, type, from, to, phrase } =
      req.query as GetTransactionsParamsType;
    const parsedCategoryId = categoryId ? parseInt(categoryId, 10) : undefined;

    if (categoryId && isNaN(parsedCategoryId!)) {
      return res.status(400).json({
        message: "Invalid category ID",
        error: "Bad Request",
      });
    }

    if (type && !["income", "expense", "savings"].includes(type)) {
      return res.status(400).json({
        message: "Invalid transaction type",
        error: "Bad Request",
      });
    }

    const addedTransaction = await getTransactionsDB(
      parseInt(req.user.id),
      parsedCategoryId,
      type,
      from,
      to,
      phrase
    );

    return res.status(201).json(addedTransaction);
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};

export const addNewTransaction: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found", error: "Unauthorized" });
    }
    const { transactionDate, type, category, amount, description } = req.body;

    if (!transactionDate || !type || !category || !amount) {
      return res.status(400).json({
        message: "Missing required fields",
        error: "Bad Request",
      });
    }

    const categoryId = parseInt(category, 10);
    if (isNaN(categoryId)) {
      return res.status(400).json({
        message: "Invalid category ID",
        error: "Bad Request",
      });
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) {
      return res.status(400).json({
        message: "Invalid amount",
        error: "Bad Request",
      });
    }

    if (!["income", "expense", "savings"].includes(type)) {
      return res.status(400).json({
        message: "Invalid transaction type",
        error: "Bad Request",
      });
    }

    const addedTransaction = await addNewTransactionDB(
      parseInt(req.user.id),
      transactionDate,
      type,
      categoryId,
      amountNum,
      description || ""
    );

    return res.status(201).json(addedTransaction);
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};
