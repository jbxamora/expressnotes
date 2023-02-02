// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const uuidv4 = reqiure("uuid/v4");
// Create an express router
const app = require("express").Router();
// Create path to database file
const dbPath = path.join(__dirname, "..", "db", "db.json");

// Route for retreiving all notes from database
app.get('/notes', (req, res) => {
    fs.readFile(dbPath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading database");
        };

        let db;
        try {
            db = JSON.parse(data);
        } catch (err) {
            return res.status(500).send("Error parsing database");
        }
        res.json(db);
    });
});

// Route for adding a new note to database
app.post('/notes', (req, res) => {
    const title = req.body.title;
    const text = req.body.text;

    if (!title || !text) {
        return res.status(400).send("Title and text are required fields");
    }

    fs.writeFileSync(dbPath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading database");
        }

        let db;
        try {
            db = JSON.parse(data);
        } catch (err) {
            return res.status(500).send("Error parsing database");
        }

        const newNote = {
            id: uuidv4(), // Generate a unique ID for new note
            title: title,
            text: text,
        };
        db.push(newNote); // Add new note to database

        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                return res.status(500).send("Error writing database");
            }
            res.json(db); // Sends updated database in JSON
        });
    });
});

// Route for deleting a note from the database
app.delete('/notes/:id', (req, res) => {
    fs.readFile(dbPath, "utf-8", (err, data) => {
        if (err) {
            return.res.status(500).send("Error reading database");
        }

        let db;
        try {
            db = JSON.parse(data);
        } catch (err) {
            return.res.status(500).send("Error parsing database");
        }
        // Filter notes to keep those with ID other than one to be deleted
        const id = req.params.id;
        const notesToKeep = db.filter((note) => note.id !== id);
        // If the length of notesToKeep is equal to original notes, it means the note to delete was not found and will display that error
        if (notesToKeep.length === db.length) {
            return res.status(404).send("Note not found");
        }
        // Writing the filtered notes back to databse file
        fs.writeFile(dbPath, JSON.stringify(notesToKeep), (err) => {
            if (err) {
                return res.status(500).send("Error writing database");
            }
            res.json(notesToKeep);
        });
    });
});

module.exports = app;
