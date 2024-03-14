import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes.js"
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT || 5500;
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors("*"));
app.use("/api", UserRoutes)

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB database");
});

app.get("/", (req, res) => {
  res.send("Welcome to my server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});