const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// const jwt = require('jsonwebtoken');
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

            // profile = auth.currentUser.get().getBasicProfile();
            // console.log('ID: ' + profile.getId());
            // console.log('Full Name: ' + profile.getName());
            // console.log('Given Name: ' + profile.getGivenName());
            // console.log('Family Name: ' + profile.getFamilyName());
            // console.log('Image URL: ' + profile.getImageUrl());
            // console.log('Email: ' + profile.getEmail());

            const data = profile._json;
            SocialUser.findOne({id: data.id})
                .exec()
                .then(info => {
                    if (!info) {
                        new SocialUser({
                            id: data.id,
                            provider: data.provider,
                            displayName: data.displayName,
                        }).save()
                            .then(newUser => {
                                console.log('____info from new USER____', newUser);
                            });
                        done(null, newUser)
                    }
                })
                .catch()
        }
    ));
};

module.exports = userGoogle;








