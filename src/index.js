import dotenv from "dotenv";
import connectDB from "../src/db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is listening on Port: ${process.env.PORT} `);
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
// import dotenv from "dotenv/config";
// import mongoose from "mongoose";
// import { DB } from "./constants.js";
// import express from "express";

// const app = express();

// const startServer = async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB}`);
//     console.log("db connected");
//     app.on("error", (error) => {
//       console.log("error", error);
//       throw error;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`
//     });
//   } catch (error) {
//     console.error("ERROR", error);
//     throw error;
//   }
// };

// // Call the function to start the server
// startServer();
