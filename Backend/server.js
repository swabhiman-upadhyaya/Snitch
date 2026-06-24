import dotenv from "dotenv"
dotenv.config()

import app from "./src/app.js"
import connectToDb from "./src/config/db.js"

const PORT = process.env.PORT || 8000

const startServer = async () => {
  try {
    await connectToDb();

    app.listen(PORT, () => {
      console.log(`Server is running of port ${PORT}`);
    });
  }
  catch(err) {
    console.log("Failed to start server: ", err.message);
    process.exit(1);
  }
}

startServer();