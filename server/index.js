const express = require("express");
const app = express();
const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://mongodb:YKbOaRaybaqzi5HM@cluster0.xjinasp.mongodb.net/?retryWrites=true&w=majority"
);
app.listen(8080, () => {
    console.log("SERVER RUNS")
});
