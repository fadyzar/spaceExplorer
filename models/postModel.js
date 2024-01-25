import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
