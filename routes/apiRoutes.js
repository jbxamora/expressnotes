// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const uuidv4 = reqiure("uuid/v4");

const app = require("express").Router();
const dbPath = path.join(DB, "..", "db", "db.json");

app.get('/notes', (req, res) => {
   fs.readFile(dbPath, "utf-8", (err,data) => {
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
            id: uuidv4(),
            title: title,
            text: text,
        };
        db.push(newNote);

        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                return res.status(500).send("Error writing database");
            }
            res.json(db);
        });
    });
});

app.delete('/notes/:id', (req, res) => {
    fs.readFile(dbPath, "utf-8", (err,data) => {
        if (err) {
            return.res.status(500).send("Error reading database");
        }

        let db;
        try {
            db = JSON.parse(data);
        } catch (err) {
            return.res.status(500).send("Error parsing database");
        }

        const id = req.params.id;
        const notesToKeep = db.filter((note) => note.id !== id);

        if (notesToKeep.length === db.length) {
            return res.status(404).send("Note not found");
        }

        fs.writeFile(dbPath, JSON.stringify(notesToKeep), (err) => {
            if (err) {
                return res.status(500).send("Error writing database");
            }
            res.json(notesToKeep);
        });
    });
});

module.exports = app;
