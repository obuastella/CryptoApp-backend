import mongoose from "mongoose";
import "dotenv/config";

export const dbConnect = async () => {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI as string);
    } catch (error) {
      console.log("Error :", error);
    }
  } else console.log("mongodb uri is not available");
};
