import mongoose from "mongoose"
import { config } from "./config.js"

const connectToDb = async () => {
  const mongoUri = config.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined")
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

export default connectToDb