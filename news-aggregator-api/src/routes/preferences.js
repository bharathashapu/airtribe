const preferenceRoutes = require('express').Router();
const bodyParser = require('body-parser');
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/user');

preferenceRoutes.use(bodyParser.json());

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

    let pbData = req.body.preferences;
    if (pbData) {
        let prefData = new Object;
        let category = (pbData.category && Array.isArray(pbData.category)) ? pbData.category : '';
        let sources = (pbData.sources && Array.isArray(pbData.sources)) ? pbData.sources : '';
        if (category) {
            prefData.category = category;
        }
        if (sources) {
            prefData.sources = sources;
        }
        if (prefData) {
            User.findByIdAndUpdate(req.user._id, {
                preferences: prefData
            }).then(data => {
                return res.status(200).send('Preferences Updated Successfully');
            }).catch(err => {
                return res.status(500).send({
                    error: err,
                    message: 'Update Failed'
                });
            })
        }
        else {
            return res.status(400).send('Invalid Format');
        }
    }
    else {
        return res.status(400).send({
            message: 'Invalid Data'
        });
    }
    
})

module.exports = preferenceRoutes;