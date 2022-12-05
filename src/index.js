//#region import package
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http, { get } from "http";

// import admin from "mongodb-admin";

//#region initialize server
const app = express();
const server = http.createServer(app);
dotenv.config();
const PORT = process.env.PORT || 5000;
//#end region

// app.use(bodyParser.json());

//#region setup middleware
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//#end region

//#region import router
import authRouter from "./routers/auth.router.js";
import otpRouter from "./routers/otp.router.js";
import garbageRouter from "./routers/garbage.router.js";
import orderRouter from "./routers/order.router.js";
import challengeRouter from "./routers/challenge.router.js";
//#end region

//#region setup router
app.use("/api/auth", authRouter);
app.use("/api/otp", otpRouter);
app.use("/api/garbage", garbageRouter);
app.use("/api/order",orderRouter);
app.use("/api/challenge",challengeRouter);
//#end region

//#region connect to database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!!!");
  })
  .catch(() => {
    console.log("Error connecting to MongoDB");
  });
//#end region

//#region start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
//#end region
