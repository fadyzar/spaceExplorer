import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
   
    console.log(`Mongo connected: ${db.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;