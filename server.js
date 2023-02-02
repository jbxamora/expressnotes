const app = require("express")();
const path = require("path");
const PORT = process.env.PORT || 8080;

app.get("", (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, () => {
    console.log(`App up at port ${PORT}`);
});

