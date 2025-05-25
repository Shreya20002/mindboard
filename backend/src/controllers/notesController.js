import mongoose from 'mongoose';
import Note from '../models/Note.js';

export async function getAllNotes(_, res) {
    try {
      const notes = await Note.find().sort({createdAt: -1}); // sort: newest first(dec order) // Fetch all notes from the database, u can also filter notes by most recent and all [feature to implement]
      res.status(200).json(notes); // Send the notes as a JSON response to the client 
    } catch(error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal Server Error" }); // If an error occurs, send a 500 status code with an error message
    }
};
// for try catch block , we use async await syntax
// async await is a way to write asynchronous code in a synchronous manner

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id); // Find a note by its ID from the request parameters
        if (!note) {
            return res.status(404).json({ message: "Note not found" }); // If the note is not found, send a 404 status code with an error message
        }
        res.json(note); // If the note is found, send it as a JSON response
    } catch(error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export async function createNote(req, res) {
  try {

    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json({savedNote});
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export async function updateNote(req, res) {
    try {
        // First validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid note ID format" });
        }
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true}); // Find the note by ID and update it with the new title and content
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote); // Send a success response

    } catch(error) {
       console.error("Error in updateNote controller", error);
       res.status(500).json({ message: "Internal server error" });
    }
};

export async function deleteNote(req, res) {
     try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }

};