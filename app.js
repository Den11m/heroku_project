const express = require('express');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');
// const morgan = require('morgan');
const app = express();
const checkAuth = require('./api/middlewarrs/middlewarrs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/static/index.html');
});
app.use('/products', checkAuth, productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);


// app.use((req, res, next) => {
//     const error = new Error('Non found');
//     error.status = 404;
//     next(error);
// });
//
// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     });
// });

module.exports = app;