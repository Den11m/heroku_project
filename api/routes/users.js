const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userFacebook = require('./loginByFacebook');
const userGoogle = require('./loginByGoogle');

const User = require('../models/user');

userFacebook();
userGoogle();


router.post('/signup', (req, res, next) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if (user) {
                res.status(200).json({
                    message: 'There is a user already with this email',
                })
            }
            else {
                if (req.body.password) {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                password: hash,
                            });
                            return user.save();
                        })
                        .then(() => {
                            res.status(201).json({
                                message: 'User was created',
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err,
                            })
                        })
                } else {
                    res.status(400).json({
                        message: 'No Password field',
                    })
                }
            }
        })
});

router.get('/', (req, res, next) => {
    User.find()
        .select('-password')
        .then(users => {
            res.status(200).json({
                message: 'list of all users',
                allUsers: users,
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            })
        })
});

router.post('/login', (req, res, next) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: 'password is not match',
                        })
                    }
                    else {
                        const token = jwt.sign({email: user.email, _id: user._id}, 'secretWord');
                        res.status(200).json({
                            message: 'Congratulation! You are login now!',
                            userToken: token,
                        })
                    }
                })
            } else {
                res.status(404).json({
                    message: 'user with such email is not found'
                })
            }
        })
        .catch()
});

router.get('/login/facebook', passport.authenticate('facebook'));
router.get('/login/facebook/callback', (req, res) => {res.redirect('../../../products/')});

router.get('/login/google', passport.authenticate('google',{scope:['profile']}));
router.get('/login/google/callback', (req, res) => {res.redirect('../../../products/')});


module.exports = router;