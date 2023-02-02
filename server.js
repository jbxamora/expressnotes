// Dependencies
const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
// Optional Dependencies (Security)
const logger = require("morgan"); //For logging HTTP requests 
const helmet = require("helmet"); //For setting multiple http headers to enhance security

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use(helmet());
app.use(logger("dev"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
    console.log(`App up at port ${PORT}`);
});

