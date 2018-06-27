const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const keys = require('../../config/keys');


const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const SocialUser = require('../models/socialUser');

const userFacebook = () => {
passport.use(new FacebookStrategy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: 'https://enigmatic-caverns-60540.herokuapp.com/users/login/facebook/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        console.log('--user info facebook--',profile);
        const data = profile._json;
        SocialUser.findOne({id: data.id})
            .exec()
            .then(info => {
                if (!info) {
                    new SocialUser({
                        id: data.id,
                        provider: data.provider,
                        displayName: data.displayName
                    }).save()
                        .then(newUser => {
                            console.log('__info about Facebook newUser__', newUser)
                        });
                    done(null, newUser)
                }
            })
            .catch(err=>{
            console.log(err)
        })
    }
));
};

module.exports = userFacebook;








