// Dependencies
const path = require("path");
const app = require('express').Router();

// Route
// Get note page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../notes.html"));
})
// Get root html page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

module.exports = app;