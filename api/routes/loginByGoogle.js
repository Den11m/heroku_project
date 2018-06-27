const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const SocialUser = require('../models/socialUser');

const userGoogle = () => {
    passport.use(new GoogleStrategy({
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: 'https://enigmatic-caverns-60540.herokuapp.com/users/login/google/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            const data = profile._json;
            SocialUser
                .findOne({id: data.id})
                .exec()
                .then(info => {
                    if (!info) {
                        new SocialUser({
                            id: data.id,
                            provider: data.provider,
                            displayName: data.displayName
                        }).save()
                            .then(newUser => {
                                console.log('__info about Google newUser__', newUser)
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

module.exports = userGoogle;