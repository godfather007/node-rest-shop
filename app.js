const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const usersRoutes = require('./api/routes/user');

mongoose.connect('mongodb://node-shop:node-shop'+
'@node-rest-shop-shard-00-00-tlxgy.mongodb.net:27017,node-rest-shop-shard-00-01-tlxgy.mongodb.net:27017,node-rest-shop-shard-00-02-tlxgy.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin');

app.use((req,res,next) =>{
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
if(req.method === 'OPTIONS'){
res.header('Access-Control-Allow-Meathods','PUT,POST,PATCH,DELETE,GET')
    return res.status(200).json({

        });
    }
        next();    
        // console.log(process.env); 
        });

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/products',productsRoutes);
app.use('/orders',ordersRoutes);
app.use('/users',usersRoutes);

module.exports = app;
mongoose.Promise = global.Promise;