import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
dotenv.config({
    path: './env'
})


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/ ${DB_NAME}`
    );
    console.log(
      `MongoDb connected and dbHost is ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

export default connectDB;
