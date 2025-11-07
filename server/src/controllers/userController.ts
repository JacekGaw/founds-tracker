import { RequestHandler } from "express";
import {
  getUsersFromDB,
  getFirstUserFromDb
} from "../services/userServices.js";

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const usersList = await getUsersFromDB();
    console.log("Getting all users ", usersList);
    res.status(200).json({
      message: "Getting all users",
      users: usersList,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
};

export const getFirstUser: RequestHandler = async (req, res) => {
  try {
    const user = await getFirstUserFromDb();
    if(!user) {
      res.status(204);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: (err as Error).message || "Unknown error",
    });
  }
}