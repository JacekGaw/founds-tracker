import { RequestHandler, Response } from "express";
import { CustomRequest } from "../middleware/protectedRoute.js";
import { getCategoriesDB } from "../services/categoryServices.js";

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
