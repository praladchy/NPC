import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/mongoDb.config.js";
import { createSuperAdmin } from "./controller/auth.controller.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
app.use(cookieParser());
createSuperAdmin();
app.get("/", (req, res) => {
  res.send("Hello World");
});
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
