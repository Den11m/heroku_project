const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialUserSchema = new Schema({
        provider: String,
        displayName: String,
        id: String,
    },
    {
        versionKey: false,
    });

module.exports = mongoose.model('SocialUser', socialUserSchema);