import express from "express"
import { createNote, deleteNote, getAllNotes, updateNote, getNoteById } from "../controllers/notesController.js"; // Import the controller function


const router = express.Router();


router.get("/", getAllNotes); // Use the controller function for the GET request
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);



export default router;