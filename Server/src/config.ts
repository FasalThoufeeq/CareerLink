import dotenv from "dotenv";
dotenv.config();

const configKeys = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default configKeys;
