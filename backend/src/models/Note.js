import mongoose from "mongoose";

// 1 -  you need to create a schema 
// 2 - you would create a model based off of that schema 

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        /*userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },*/
    },
    { timestamps: true } // adds createdAt and updatedAt fields 
);

// create a Note model (applied to every Note ) using the noteSchema
const Note = mongoose.model("Note", noteSchema);

export default Note;

    
