const { ObjectID } = require('bson');
const Joi = require('joi');
const mongoose= require('mongoose');
const {genreSchema,Genre}=require('./genre');
const BookSchema = new mongoose.Schema({
  // _id:{type:String},
    name:{
        type:String,
        require:true,  
        maxlength:50
    },
    publisher:{
        type:String,
        require:true
    },description:{
        type:String,
        require:true
    },website:{
        type:String,
        require:true
    },
    author:{
        type:String,
        required :true
    }/*,genre:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Genre'
    }*/
})
const Book = mongoose.model('Book',BookSchema);

function  ValidateBook(book)
{
    const schema =Joi.object({
        name:Joi.string().min(1).max(50).required(),
     
        publisher:Joi.string().required(),
        description:Joi.string().required(),
        website:Joi.string().required(),
    
      
    });
  
   return  schema.validate(book);
}
async function CreateBook()
{
    const book1=new Book({
        name:'To Sleep In a Sleep of Star',
        genre: 'Science Fiction',
        author: 'Christopher Paolini ',
        IsPublished : true,
        rate : 3.85
     
    });
  const result=  await book1.save();
  console.log(result)
}

async function GetBooks()
{
    const books = await Book.find();
}
exports.BookSchema=BookSchema;
exports.Book=Book;
exports.validate=ValidateBook;