import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: [3, "Name must be longer than 2 characters"],
  },
  email: {
    type: String,
    unique: [true, "This email is taken"],
    required: [true, "Please provide an email"],
    lowerCase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [2, "password must be longer than one character"],
  },
});

const User = mongoose.model("User", UserSchema);
export default User;