import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const userRoute = express.Router();

userRoute.post("/", createUser);

userRoute.get("/getAllUsers", getAllUsers);

userRoute.get("/:id", getUserById);

userRoute.put("/:id", updateUser);

userRoute.delete("/:id", deleteUser);

export default userRoute;
