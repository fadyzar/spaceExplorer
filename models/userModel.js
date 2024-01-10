import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a Name"],
  },
  email: {
    type: String,
    required: [true, "Must provide email"],
    unique: [true, "This email is already in use"],
    match: [/^\S+@\S+\.\S+$/, "Please add a valid email"],
  },
  cash: {
    type: Number,
    required: [true, "Must provide how much cash do you have!"],

  },

  creditAmount: {
    type: Number,
    required: [true, "Must provide how much money do you have in your credit card!"],

  },

  creditLimit: {
    type: Number,
    required: [true, "Must provide your limited credit card"],

  }

 
});

const User = mongoose.model("User", userSchema);

export default User;