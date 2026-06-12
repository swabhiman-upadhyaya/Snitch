import dotenv from "dotenv"
dotenv.config()

import app from "./src/app.js"
import connectDB from "./src/config/db.js"
import connectToDb from "./src/config/db.js"
import { error } from "node:console"

const PORT = process.env.PORT || 8000

const startServer = async () => {
  try {
    await connectToDb();

    app.listen(PORT, () => {
      console.log(`Server is running of port ${PORT}`);
    });
  }
  catch(err) {
    console.log("Failed to start sever: ", error.message);
    process.exit(1);
  }
}

startServer();