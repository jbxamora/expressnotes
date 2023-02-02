// Dependencies
const path = require("path");
const app = require('express').Router();

// Route
// Get note page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
})
// Get root html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;