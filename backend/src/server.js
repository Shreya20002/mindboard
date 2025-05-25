import express from "express" //error comes bcuz type in package is commonjs and we are using import syntax 
// change "type" = module in package to use import syntax
// commonjs syntax is require("express")
//const express = require("express")
import dotenv from 'dotenv';
dotenv.config(); // for loading environment variables from .env file

import notesRoutes from "./routes/notesRoutes.js"; // import the notesRoutes file
import { connectDB } from "./config/db.js"; // import the connectDB function
import rateLimiter from "./middleware/rateLimiter.js"; // import the rateLimiter middleware
import cors from "cors"; // import the cors middleware

const app = express();
const PORT = process.env.PORT || 5001; // use PORT from .env or default to 5001



// Middleware to parse JSON bodies
app.use(express.json()); // this middleware will parse the JSON body of incoming requests
// Middleware to parse URL-encoded bodies (for form submissions)
app.use(cors({
    origin: "http://localhost:5173", // allow requests from this origin
}));
app.use(rateLimiter);


// our simple custom middleware to log request details
// app.use((req,res,next) => {
//     console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//     next(); // call next() to pass control to the next middleware or route handler
// });


// prefixed the common part of the url with /api/notes
// this is the base url for all the notes related routes
app.use("/api/notes", notesRoutes);
// a req we are sending to the server and res is the response we are getting from the server
// very first api built
// this is a route , also an endpoint
// What is an endpoint?
// An endpoint is a combination of a URl + HTTP method that lets the client 
// interact ith a specific resource 

// app.get("/api/notes", (req, res) => {
//     res.status(200).send("you got 20 notes");
// });

// app.post("/api/notes", (req, res) => {
//     res.status(201).json({message:"Note created successfully!"})
// });

// app.put("/api/notes/:id", (req, res) => {
//     res.status(200).json({message:"Note updated successfully!"})
// });

// app.delete("/api/notes/:id", (req, res) => {
//     res.status(200).json({message:"Note deleted successfully!"})
// });

//https://localhost:5001/api/notes/21
// id will be dynamic we don't know what it will be


// first connect to db then start the server
// what's the point of our app atarting if db is not connected or incurs err while connecting?
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});




