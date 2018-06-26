const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        req.auth = jwt.verify(req.headers.authorization, 'secretWord');
        console.log(req.auth);
        next();
    } catch(err) {
        console.log(err);
        res.status(200).json({
            message: 'Your token is invalid',
        })
    }
};