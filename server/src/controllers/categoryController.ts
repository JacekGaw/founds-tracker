import { RequestHandler, Response } from "express";
import { CustomRequest } from "../middleware/protectedRoute.js";
import {
  addCategoriesDB,
  deleteCategoryDB,
  getCategoriesDB,
  NewCategory,
} from "../services/categoryServices.js";

export const getCategories: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found", error: "Unauthorized" });
    }
    const categories = await getCategoriesDB(parseInt(req.user.id));
    return res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};

export const addCategories: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found", error: "Unauthorized" });
    }
    const categories: Array<{
      name: string;
      type: "expense" | "income" | "savings";
      color: string;
    }> = req.body;
    if (!categories || !Array.isArray(categories)) {
      return res.status(400).json({
        message: "Invalid or missing categories",
        error: "Bad Request",
      });
    }
    const categoriesToAdd: NewCategory[] = categories.map((c) => {
      return { ...c, userId: parseInt(req.user!.id) };
    });
    const newCategories = await addCategoriesDB(categoriesToAdd);
    return res.status(201).json(newCategories);
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};

export const deleteCategory: RequestHandler = async (
    req: CustomRequest,
    res: Response
  ) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "User not found", error: "Unauthorized" });
      }
      const categoryId: string = req.params.id;
      if (!categoryId) {
        return res.status(400).json({
          message: "Missing categoryId",
          error: "Bad Request",
        });
      }
      const deleted = await deleteCategoryDB(parseInt(categoryId));
      return res.status(200).json(deleted);
    } catch (err) {
      res.status(500).json({
        message: "Error",
        error: (err as Error).message || "Unknown error",
      });
    }
  };
