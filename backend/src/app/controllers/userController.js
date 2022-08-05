const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();
const User = require('./../models/userModel')

const createUser = (req, res, next) => {
    console.log(req.body);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User created successfully!",
        });
    })
        .catch(err => {
            res.status(500).json({
                message: "User is already registered!"
            });
        });
}

const loginUser = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Email or password is incorrect!"
                });
            }
            fetchedUser = user;
            return bcrypt.compareSync(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Email or password is incorrect!s"
                });
            }
            const token = jwt.sign({ name: fetchedUser.name, email: fetchedUser.email, userId: fetchedUser._id }, "secret_this_should_be_longer", { expiresIn: "1h" });
            fetchedUser.password = undefined;
            res.status(200).json({
                token: token,
                timeOutDuration: 3600,
                user: fetchedUser
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "User credentials are invalid!"
            });
        });
}

const getUsers = async (req, res, next) => {
    const users = await User.find();
    if (!users.length) {
        return res.status(404).send({ message: 'Users not found.' });
    }
    users.forEach(user => { user.password = undefined });
    res.status(200).send({ message: 'Users found.', data: users });
}

module.exports = {
    createUser,
    loginUser,
    getUsers
}