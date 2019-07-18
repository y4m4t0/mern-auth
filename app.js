const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const keys = require('./config/keys');
const passport = require('passport');

const app = express();

// connection body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mongoDb connection
mongoose.connect('mongodb://localhost:27017/mern-auth')
    .then(() => console.log(`MongoDB connected`));

//passport connection
app.use(passport.initialize());
require('./config/passport')(passport);

//routes connected
app.use('/api/users', require('./routes/users'));

port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})