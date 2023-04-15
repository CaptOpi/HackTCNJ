const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users')
mongoose.connect(
    "mongodb+srv://mongodb:YKbOaRaybaqzi5HM@cluster0.xjinasp.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post()
app.listen(8080, () => {
    console.log("SERVER RUNS")
});
