const express = require("express");
const bodyParser = require("body-parser");
const routes = require("express").Router();
const taskInfo = require('./routes/taskInfo');

const app = express();

app.use(routes);
app.use(bodyParser.json()); 

const PORT = 3000;

app.get('/', (req, res) => {
    return res.status(200).send('Welcome to Airtribe Launchpad : Task Manager API Application');
});

routes.use('/tasks', taskInfo);

app.listen(PORT, (err) => {
    if (!err)  {
        console.log("Server has Successfully started");
    }
    else {
        console.log("Error occured");
    }
});