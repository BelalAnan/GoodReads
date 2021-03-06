const bcrypt=require('bcrypt');
const {User,validate}=require("../models/User");
const {Book}=require("../models/books");
const express=require('express');
const { response } = require("express");
const router = express.Router();
router.get('/',async(req,res)=>{
    const users = await User.find().sort('name');
    res.send(users);
})
router.get('/favorite',async(req,res)=>{
    const users = await User.find().populate({path: 'books',model :'Book'}).select('name books')
    res.send(users);
})
router.post('/',async(req,res)=>{ //b3ml register
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user= await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('user already registered');
     
    user=new User({

        name : req.body.name,
       email:req.body.email,

        gender:req.body.gender, 
       Phone:req.body.Phone,
       password:req.body.password
     
    });
    const salt=await bcrypt.genSalt(10);
   user.password=await bcrypt.hash(user.password,salt);
   await user.save();
    res.send(user);
});
module.exports=router;