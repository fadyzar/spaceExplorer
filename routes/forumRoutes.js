import express from "express";
import {
  getAllPosts,
  createPost,
  deletePost,
  createComment,
  deleteComment,
  uploadImage,
} from "../controllers/forumController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { incrementLikes } from "../controllers/forumController.js";
const router = express.Router();

router.get("/posts", getAllPosts);
router.post("/posts/create", protect, createPost);
router.delete("/posts/delete/:postId", protect, deletePost);

router.post("/comments/create/:postId", protect, createComment);
router.delete("/comments/delete/:commentId", protect, deleteComment);
router.post('/posts/:postId/like', incrementLikes);
router.post("/upload/image", protect, uploadImage);

export default router;