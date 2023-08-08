const express = require("express");
const bodyParser = require("body-parser");
const routes = require("express").Router();
const {signin, signup} = require('./controller/authController');
const preferenceRoutes = require("./routes/preferences");
const news = require("./routes/newsInfo");
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();

try {
    mongoose.connect("mongodb://localhost:27017/newsdb", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('DB Connected')
} catch (err) {
    console.log(err);
}

app.use(routes);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json()); 

routes.use(bodyParser.json());

const PORT = 3000;

app.get('/', (req, res) => {
    return res.status(200).send('Welcome to News Aggregator API Application : Use /login to Login or /register to Register');
});

routes.post('/register', signup);

routes.post('/signin', signin);

routes.use('/preferences', preferenceRoutes);

routes.use('/news', news);

app.listen(PORT, (err) => {
    if (!err)  {
        console.log("Server has Successfully started");
    }
    else {
        console.log("Error Occured");
    }
});