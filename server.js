// Dependencies
require("dotenv").config();
const express = require("express");
const path = require('path')
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
// Optional Dependencies (Security)
// const logger = require("morgan"); //For logging HTTP requests 
// const helmet = require("helmet"); //For setting multiple http headers to enhance security

// Creates express app instance
const app = express();

// Set Listening Port



// Sets middleware
// app.use(helmet());
// app.use(logger('tiny'));
app.use(express.static('public'));

// Parse incoming request data
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// Server static files
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/js/index.js', (req, res) => {
    res.set('Content-Type', "text/javascript");
    res.sendFile(path.join(__dirname, "./public/js/index.js"));
});


app.get('', (req, res) => {
    res.set('Content-Type', "text/css");
    res.sendFile(path.join(__dirname, "./public/css/styles.css"));
});


// app.use((req, res, next) => {
//     res.set('Cross-Origin-Resource-Policy', 'same-site');
//     next();
// });

// Mount routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 8080;
// Starts server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

