const preferenceRoutes = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/user');

preferenceRoutes.use(bodyParser.json());

try {
    mongoose.connect("mongodb://localhost:27017/newsdb", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('DB Connected')
} catch (err) {
    console.log(err);
}

preferenceRoutes.get('/', verifyToken, (req, res) => {
    if (!req.user && req.message) {
        return res.status(403).send({
            message: req.message
        });
    }
    if (!req.user && !req.message) {
        return res.status(401).send({
            message: 'Invalid Token'
        });
    }
    return res.status(200).json(req.user.preferences);
});

preferenceRoutes.put('/', verifyToken, (req, res) => {
    if (!req.user && req.message) {
        return res.status(403).send({
            message: req.message
        });
    }
    if (!req.user && !req.message) {
        return res.status(401).send({
            message: 'Invalid Token'
        });
    }
    return res.status(200).json(req.user);
    //todo
})

module.exports = preferenceRoutes;