import express from "express";
import {
  getUsers,
  getFirstUser
} from "../controllers/userController.js";
const router = express.Router();

router.get("/users/", getUsers);
router.get("/setup", getFirstUser);

export default router;
