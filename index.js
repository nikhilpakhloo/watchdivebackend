import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes.js"
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT|| 5500;
const app = express();
import ContactForm from "./models/ContactForm.js";

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
  console.log("Running")
  res.send("Welcome to my server");
});
app.post('/submit', async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;
    const newEntry = new ContactForm({
      name,
      email,
      phoneNumber,
      message
    });

    await newEntry.save();
    res.status(201).send({"msg":"Form Saved!"});
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).send("Failed to save form data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});