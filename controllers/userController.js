import STATUS_CODE from "../constants/statusCodes.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// generates random token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  };

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }

  
};


  // Controller to delete a user by id
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("No such user in the database");
    }

    // Delete the user
    await User.deleteOne({ _id: userId });

    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);;
  }
};


// Creates new user
// Create:  /api/v1/space/create
export const createUser = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        res.status(404);
        throw new Error("please fill all fields");
      }
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(404);
        throw new Error("Email already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      if (user) {
        res.status(STATUS_CODE.CREATED).json({
          id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      }
    } catch (error) {
      next(error);
    }
  };
  
  // Login
  //  /api/v1/space/login
  export const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(401);
        throw new Error("All fields are required");
      }
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      next(error);
    }
  };













  
  