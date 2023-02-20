// Dependencies
require("dotenv").config();
const express = require("express");
const path = require('path')
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");


// Creates express app instance
const app = express();

// Serve static files // Content type
app.use(express.static('public'));

app.get("/public/js/index.js", (req, res) => {
    res.setHeader("Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, "public", "js", "index.js"));
});

app.get("/public/css/style.css", (req, res) => {
    res.setHeader("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "public", "css", "style.css"));
});




// Parse incoming request data
app.use(express.json());
app.use(express.urlencoded({ extended:true }));



// Mount routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);


const PORT = process.env.PORT || 3001;
// Starts server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

