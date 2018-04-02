const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const mongoose = require('mongoose');

router.get('/',(req,res,next) =>{
    Product.find()
    .select('name price')
        .exec()
        .then(result =>{
            console.log(result); 
            res.status(200).json({
                product:result
            })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
});

router.post('/',(req,res,next) => {
    const product =new  Product({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    });
    product.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
        message:'Product Created',
        product:result
            });
    })
    .catch(err =>{  
        console.log(err);
        res.status(500).json({error:err})
    })
    
});
router.get('/:productId',(req,res,next) => {
    const id = req.params.productId;
        Product.findById(id)
        .exec()
        .then(doc=>{
            console.log(doc);
            res.status(200).json({doc});
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error:err})
        })
});
router.patch('/:productId',(req,res,next) =>{
    id = req.params.productId;
    Product.update({_id:id},{$set:{name:req.body.name,price:req.body.price}})
    .exec()
    .then(result =>{
        res.status(200).json({result: result});
    })
    .catch(err =>{
        res.status(500).json({error:err+'asd'})
    })
 });
 router.delete('/:productId',(req,res,next) =>{
     id = req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result =>{
        res.status(200).json({result: result});
    })
    .catch(err =>{
        res.status(500).json({error:err+'asd'})
    })
 });

module.exports = router;