import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Note from "./models/note.model.js";

dotenv.config();

const app = express();

app.use(express.json()); // allows accepting Json data in the req.body

app.post("/api/notes", async (req, res) => {
  const note = req.body; // user will send this data

  if (!note.title || !note.description || !note.color) {
    return res.status(400).json({success: false, message: "Please provide all fields"})
  } 
  const newNote = new Note(note);
  
  try {
    await newNote.save();
    res.status(201).json({success: true, data: newNote});
  } catch (error) {
    console.error("Error in create product", error.message);
    res.status(500).json({success: false, message: "Server error"})
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server started at 5000 hello");
});
// npm run dev
