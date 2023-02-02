// Dependencies
require("dotenv").config();
const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
// Optional Dependencies (Security)
const logger = require("morgan"); //For logging HTTP requests 
const helmet = require("helmet"); //For setting multiple http headers to enhance security

// Creates express app instance
const app = express();

// Set Listening Port
const PORT = process.env.PORT || 8080;

// Sets middleware
app.use(helmet());
app.use(logger('tiny'));

// Parse incoming request data
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// Server static files
app.use(express.static('public'));

// Mount routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// Starts server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

