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
  password:{
    type: String,
    require: [true, "Must provide password"],

  }
  

 
});

const User = mongoose.model("User", userSchema);

export default User;