const { request } = require('express');
const cors = require('cors');
const express = require('express');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const app = express();


const Jwt = require('jsonwebtoken');

//we have to define a key jiske basis pr hamara token banega
//this must be secret so better put in .env file
const jwtKey = 'e-comm';

// const connectDB = async()=>{
//     mongoose.connect('mongodb+srv://kamtiprabhat:FFqNfcEWzJAgquTC@ecom.pbxargf.mongodb.net/ecom?retryWrites=true&w=majority');
//     const productSchema = new mongoose.Schema({});//to get only data no need to define any schema now
//     const product = mongoose.model('users',productSchema);
//     const data = await product.find();
//     console.warn(data);    
// }

// connectDB();

//use a middleware
app.use(express.json());
app.use(cors());

//create a route
app.post('/register', async (req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},jwtKey,{expiresIn:'2h'}, (err,token)=>{
        if(err){
            resp.send("something went wrong please after sometime....");
        }
        resp.send({result,auth:token});
    })
    // resp.send(req.body); //insert this data in database so made the function async
});

//post method by login route
app.post('/login',async (req,resp)=>{
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select("-password"); //remove password feild from response for security
        if(user){
            Jwt.sign({user},jwtKey,{expiresIn:'2h'}, (err,token)=>{
                if(err){
                    resp.send("something went wrong please try after sometime....");
                }
                resp.send({user,auth:token});
            })
        }
        else{
            resp.send({result:"NO USER FOUND"});
        }
    }
    else{
        resp.send({result:"NO USER FOUND"});
    }
    
});

app.post('/add-product', async (req,resp)=>{
    let product = new Product(req.body); //jo data body se mila wo product m save krwa diye
    let result = await product.save();
    resp.send(result);
});

app.get('/products', async (req,resp)=>{
    let products = await Product.find();
    if(products.length>0){
        //if collection empty h yaa nahi wo check krne k liye
        resp.send(products);
    }
    else{
        resp.send({result:"NO PRODUCT FOUND"});
    }
});

app.delete("/product/:id", async (req,resp)=>{
    let result = await Product.deleteOne({_id:req.params.id});
    resp.send(result);
});

app.get('/product/:id', async (req,resp)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }
    else{
        resp.send({result:"NO PRODUCT FOUND"});
    }
});

//to update we use PUT method
app.put('/product/:id',async (req,resp)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set : req.body
        }
    )
    resp.send(result);
});

//to search product via api
//if we want to search in multiple column we use $or
app.get("/search/:key", async (req,resp)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
        ]
    });
    resp.send(result);
});

app.listen(5000);