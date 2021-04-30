const {Book,validate}=require("../models/books");
const {Genre}=require("../models/genre");
const express=require('express');
const { isValidObjectId } = require("mongoose");
const router = express.Router();
router.get('/',async(req,res)=>{
  
    const books = await Book.find().sort('name');
    res.send(books);
})
router.get('/:_id',async(req,res)=>{
  
    const books = await Book.findOne({"_id":req.params._id})

   
   // const books = await Book.findOne({_id:req.params._id})
    if(books==null) res.status(404).send('cant find');
    res.send(books);
   
 

})
router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  //  const genre= await Genre.findById(req.body.genreid);
  //  if(!genre) return res.status(400).send('invalid genre');
    const book=new Book({
        name : req.body.name,
      genre :{
            _id:genre._id,
            name : genre.name
        },
        publisher:req.body.publisher,
        describtion:req.body.describtion,
        website:req.body.website
    });
     await book.save();
    res.send(book);
});
module.exports=router;