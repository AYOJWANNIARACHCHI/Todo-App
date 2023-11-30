const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();


const mogoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mogoUri).then(() => {
    console.log("MongoDB Connected..");
}).catch((error) => {
    console.log(error + "Fail to Connect with MongoDB...");
});

app.use(bodyParser.json);

const port = process.env.PORT || 8085
app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});