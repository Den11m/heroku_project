const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const keys = require('../../config/keys');


const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user');
const userFacebook = () => {
passport.use(new FacebookStrategy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: `http://localhost:${keys.PORT}/login/facebook/callback`
    },
    function (accessToken, refreshToken, profile, done) {
        console.log('--user info facebook--',profile);
        const data = profile._json;
        // User.findOne({email: data.email})
        //     .exec()
        //     .then(user => {
        //         if (!user) {
        //             const user = new User({
        //                 _id: new mongoose.Types.ObjectId(),
        //                 email: req.body.email,
        //                 password: hash,
        //             })
        //         }
        //     })
        //     .catch()


        // User.findOrCreate({email: data.email}, function(err, user) {
        //     if (err) { return done(err); }
        //     done(null, user);
        // });
    }
));
};

module.exports = userFacebook;








