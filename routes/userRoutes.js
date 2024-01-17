import express from "express";
import {
  getAllUsers,
  createUser,
  loginUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/create", createUser);
router.post("/login", loginUser);


router.delete("/delete/:id", deleteUser);

export default router;
