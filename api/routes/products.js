const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product
        .find()
        .select('-__v')
        .exec()
        .then(docs => {
            res.status(200).json({
                message: 'Products',
                allProducts: docs,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            })
        })
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /products',
                createProduct: result,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            })
        })
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findByIdAndUpdate(id, {
        name: req.body.name,
        price: req.body.price
    })
        .exec()
        .then(doc => {
            return Product.findById(id).select('-__v').exec()
        })
        .then(doc => {
            res.status(200).json({
                message: 'product is patched now',
                patchedProduct: doc,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.delete('/:productId', (req,res,next) => {
    if(req.path){
        const id = req.params.productId;
        Product.remove({_id:id})
            .then(doc => {
                res.status(200).json({
                    message: 'this product delete now',
                    id: doc._id,
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    } else {
        res.status(418).json({
            message: 'You need to login'
        })
    }
});

module.exports = router;