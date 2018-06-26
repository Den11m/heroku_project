const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Order = require('../models/order');

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity,
    });
    order
        .save()
        .then(doc => {
            res.status(201).json({
                message: 'Order was created',
                order: doc,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.get('/', (req, res, next)=>{
    Order.find()
        .exec()
        .then(docs => {
            res.status(200).json({
                message: 'Order details',
                allOrders: docs,
            })
        })
        .catch(err=> {
            res.status(500).json({
                error : err,
            })
        })
});

module.exports = router;