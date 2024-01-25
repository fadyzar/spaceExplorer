import STATUS_CODE from "../constants/statusCodes.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate("comments").populate("user");

    res.send(posts);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required for creating a post." });
      return;
    }

    // Create a new post with initial likes set to 0
    const newPost = await Post.create({
      title,
      content,
      user: req.user._id,
      likes: 0, // Initialize likes to 0
    });

    res.status(STATUS_CODE.CREATED).json(newPost);
  } catch (error) {
    next(error);
  }
};

export const incrementLikes = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    // Find the post by ID and increment likes
    const updatedPost = await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(200).json({ message: 'Like incremented successfully.', updatedPost });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    // Delete the post by ID
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(200).json({ message: 'Post deleted successfully.', deletedPost });
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const { text } = req.body;

    // Validate input
    if (!text) {
      res.status(400).json({ message: "Comment text is required." });
      return;
    }

    // Find the post by ID
    const post = await Post.findById(postId);

    // Create a new comment
    const newComment = await Comment.create({
      text,
      user: req.user._id,
    });

    // Add the new comment to the post's comments array
    post.comments.push(newComment);

    // Save the updated post
    await post.save();

    res.status(STATUS_CODE.CREATED).json({ message: 'Comment added successfully.', newComment });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    // Find the post by ID
    const post = await Post.findById(postId);

    // Find and delete the comment by ID
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }

    // Remove the comment ID from the post's comments array
    post.comments = post.comments.filter(comment => comment.toString() !== commentId);

    // Save the updated post
    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully.', deletedComment });
  } catch (error) {
    next(error);
  }
};

export const uploadImage = async (req, res, next) => {
  console.log(`upload image done`);
  
};
