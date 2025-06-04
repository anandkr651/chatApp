// import dotenv from "dotenv";
// import connectDB from "./db/index.js";
// import app from "./app.js";

// dotenv.config({
//   path: "./.env",
// });

// connectDB()
//   .then(() => {
//     app.listen(process.env.PORT || 8001, () => {
//       console.log(`server is running at port ${process.env.PORT}`);
//     });
//     app.on("err", (error) => {
//       console.log("my appication is not talk to database", error);
//     });
//   })
//   .catch((err) => {
//     console.log("MongoDB connection fail", err);
//   });

import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import messageRoute from "./routes/message.routes.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config({
  path: "./.env",
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,
  })
);

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

connectDB();
server.listen(process.env.PORT, () => {
  console.log(`Server is Running on port ${process.env.PORT}`);
});
