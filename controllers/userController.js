import STATUS_CODE from "../constants/statusCodes.js";
import User from "../models/userModel.js";
// import { depositCash } from './usersActions.js';
// import withdraw from "./usersActions.js";

// Controller to get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }

  
};

// Controller to get a user by id
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(STATUS_CODE.NOT_FOUND)
        throw new Error("No such user in the database")
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

// Controller to create a new user
export const createUser = async (req, res, next) => {
    try {
      const { name, email  } = req.body;
      const newUser = await User.create({ name, email});
      res.status(STATUS_CODE.CREATED).send(newUser);
    } catch (error) {
      next(error);
    }
  };

  export const updateUserById = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const { name, email, cash, creditAmount, creditLimit } = req.body;
  
      // Check if the user exists
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        res.status(STATUS_CODE.NOT_FOUND);
        throw new Error("No such user in the database");
      }
  
      // Update user fields
      existingUser.name = name || existingUser.name; //take a new name or just put the old name
      existingUser.email = email || existingUser.email;
      existingUser.cash = cash || existingUser.cash;
      existingUser.creditAmount = creditAmount || existingUser.creditAmount;
      existingUser.creditLimit = creditLimit || existingUser.creditLimit;
  
      // Save the updated user
      const updatedUser = await existingUser.save();
  
      res.send(updatedUser);
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













  
  