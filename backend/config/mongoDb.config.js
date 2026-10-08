import mongoose from "mongoose";
import mongoosw from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
