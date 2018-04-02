const Product = require('../models/product');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');


router.get('/',(req,res,next) =>{
    Order.find()
    .populate('product')
    //.select('product quantity _id')
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
        message:'All Order',
        order:result
            });
    })
    .catch(err =>{  
        console.log(err);
        res.status(500).json({error:err})
    })
});

router.post('/',(req,res,next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product:req.body.productId,
        quantity:req.body.quantity
    });
    order.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
        message:'Order Created',
        product:result
            });
    })
    .catch(err =>{  
        console.log(err);
        res.status(500).json({error:err})
    })
});
router.get('/:orderId',(req,res,next) => {
    const ID = req.params.productId;
        if(ID == 1){
            res.status(200).json({
                message:'u r right no is '+ID
            })
        }
        else{
            res.status(200).json({
                message:'wrong Id '+ID
            })  
        }
    res.status(200).json({
        message:'Handeling POST requests to /orders'
    });
});
router.patch('/:orderId',(req,res,next) =>{
    res.status(200).json({
        message: 'Handeling patch requests to /orders'
     });
 });
 router.delete('/:orderId',(req,res,next) =>{
    res.status(200).json({
        message: 'Handeling delete requests to /orders'
     });
 });

module.exports = router;