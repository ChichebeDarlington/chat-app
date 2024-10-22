import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// routes function
import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";
import userRoute from "./routes/userRoute.js";

import { databaseConnect } from "./database/database.js";

// import from socket io file
import { app, server } from "./socket/socket.js";

dotenv.config();
const port = process.env.PORT || 7000;

// middleware
app.use(express.json());
app.use(cookieParser());
// middle module
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/users", userRoute);

const start = async () => {
  await databaseConnect(process.env.MONGO_URI);
  // server.listen is used instead
  server.listen(8000, () => {
    console.log(`Listening at port ${port}`);
  });
};

start();
