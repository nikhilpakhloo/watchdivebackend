import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes.js"
const PORT = 8000;
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors("*"));
app.use("/api", UserRoutes)

const MONGODB_URI = "mongodb+srv://nikhilpakhloo:root@watchdive.pijdktb.mongodb.net/Users?retryWrites=true&w=majority";

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