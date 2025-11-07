import express from "express";
import {
  getUsers,
  getUser,
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
  changeUserPassword
} from "../controllers/userController.js";
const router = express.Router();

router.get("/users/", getUsers);
router.get("/users/:id", getUser);
router.get("/user/:id/info", getUserInfo);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.patch("/users/:id/change-password", changeUserPassword);
router.delete("/users/:id", deleteUser);

export default router;