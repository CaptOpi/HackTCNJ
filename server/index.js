const express = require("express")
const app = express()

mongoose.connect(
    "mongodb+srv://mongodb:XIfYlirMbyCLtZOi@cluster0.xjinasp.mongodb.net/?retryWrites=true&w=majority"
);
app.listen(8080, () => {
    console.log("SERVER RUNS")
});
