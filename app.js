const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();

// connection body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/mern-auth')
    .then(() => console.log(`MongoDB connected`));


app.use('/api/users', require('./routes/users'));

port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})