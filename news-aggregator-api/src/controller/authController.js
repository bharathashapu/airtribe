var jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');
var User = require('../models/user');

var signup = (req, res) => {
    let fullName = req.body.fullName;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 8);
    let preferences = req.body.preferences;

    const user = new User({
        fullName: fullName,
        email: email,
        password: password,
        preferences: preferences
    });

    user.save().then(data => {
        return res.statue(200).send('User registered successfully');
    }).catch(err => {
        return res.status(500).send({error: err, message: 'User registration failed'});
    });

}

var signin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
        email: email
    }).then(user => {
        var passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid Password'
            })
        }
        var token = jwt.sign({
            id: user.id,
        }, process.env.API_SECRET, {
            expiresIn: 86400
        });

        return res.status(200).send({
            user: {
                user: user._id,
                email: user.email,
                fullName: user.fullName
            },
            message: 'Login Successful',
            accessToken: token
        })
    }).catch(err => {
        return res.status(500).send({
            message: err
        });
    });
}

module.exports = {signin, signup};