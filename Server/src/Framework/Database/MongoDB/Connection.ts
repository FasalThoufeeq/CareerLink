import mongoose from "mongoose";
import configKeys from "../../../config";

mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
      // if (!configKeys.MONGODB_URL) {
      //   throw new Error("MongoDB URL is not defined in configKeys");
      // }
      await mongoose.connect("mongodb+srv://fasaltq681:Fasal123@careerlink.mhwif17.mongodb.net/", {});
      console.log(`Database connected successfully`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  export default connectDB;