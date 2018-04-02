const express = require('express');
const router = express.Router();
const User = require('../models/user')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth')

// router.get('/',checkAuth,(req,res,next) =>{
//     User.find()
//         .exec()
//         .then(result =>{
//             console.log(result); 
//             res.status(200).json({
//                 user:result
//             })
//         })
//         .catch(err =>{
//             console.log(err);
//             res.status(500).json({
//                 error:err
//             })
//         })
// });

router.get('/',(req,res,next) =>{
    User.find()
        .exec()
        .then(result =>{
            console.log(result); 
            res.status(200).json({
                user:result
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
    User.find({email:req.body.email})
    .exec()
    .then(result =>{
        if(result.length >= 1){
            return res.status(409).json({
                error:"email already exist",
                User:result
            })
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }
                else{
                    const user =new  User({
                        _id: new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash
                    });
                    user.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                message:'User Created',
                user:result
                    });
            })
            .catch(err =>{  
                console.log(err);
                res.status(500).json({error:err})
            })
                }
            })
        }
    })
    .catch(result =>{
        return res.status(400).json({
            error:result
        })
    })
    
});
router.get('/:userId',(req,res,next) => {
    const id = req.params.userId;
        User.findById(id)
        .exec()
        .then(doc=>{
            console.log(doc);
            res.status(200).json({User:doc});
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error:err})
        })
});
router.patch('/:userId',(req,res,next) =>{
    id = req.params.userId;
    User.update({_id:id},{$set:{password:req.body.password}})
    .exec()
    .then(result =>{
        res.status(200).json({User: result});
    })
    .catch(err =>{
        res.status(500).json({error:err})
    })
 });
 router.delete('/:userId',(req,res,next) =>{
     id = req.params.userId;
    User.remove({_id:id})
    .exec()
    .then(result =>{
        res.status(200).json({User: result});
    })
    .catch(err =>{
        res.status(500).json({error:err})
    })
 });

 router.post('/login',(req,res,next) => {
        User.find({email:req.body.email})
        .exec()
        .then(user=>{
            if(user.length < 1){
                return res.status(401).json({
                    error:"Auth failed"
                })
            }
            bcrypt.compare(req.body.password,user[0].password,(err,result) =>{
                if(err){
                    return res.status(401).json({
                        error:"Auth failed"
                    }) 
                }
                if(result){
                    return res.status(200).json({
                        result:"Auth successfulll",
                        User:user
                    })
                }
            })
           
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error:err})
        })
});
router.post('/logintoken',(req,res,next)=> {
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length < 1){
            return res.status(401).json({
                error:"Auth failed"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result) =>{
            if(err){
                return res.status(401).json({
                    error:"Auth failed"
                }) 
            }
            if(result){
               const token = jwt.sign({
                    email:user[0].email,
                    userId:user[0]._id
                },"secret",{
                    expiresIn:'1h'
                });
                return res.status(200).json({
                    result:"Auth successfulll",
                    User:user,
                    token:token
                })
            }
        })
    })
    .catch(err =>{
        res.status(500).json({error:err})
    })
});
module.exports = router;