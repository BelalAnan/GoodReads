const Joi = require('joi');
const mongoose= require('mongoose');
const {BookSchema,Book}=require('./books');
 const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        
        maxlength:50
    },gender:{
         type:String,
         required :true
    },email:{
        type:String,
        require:true,
        
        maxlength:255,
        unique:true
    },password:{
        type:String,
        maxlength:1024,
        minlength:5
    },
    Phone:{
        type:String,
        required :true,
        minlength:5,
        maxlength:50

    },
    
    
       
    books:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }]
   
})
const User = mongoose.model('User',UserSchema);
function  ValidateUser(user)
{
    const schema =Joi.object({
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required(),
        gender:Joi.string().required(),
        Phone:Joi.string().min(5).max(50).required(),
      
    });
  //  return Joi.validate(user,schema)
   return  schema.validate(user);
}
async function CreateUser()
{
    const user1=new User({
        name:'belal',
        gender: 'male',
        Phone: '01014178103'
 
     
     
    });
  const result=  await user1.save();
  console.log(result)
}

async function GetUsers()
{
    const users = await User.find().populate('Book','name').select('name Book');
    console.log(users);
}
//CreateUser();
exports.UserSchema=UserSchema;
exports.User=User;
exports.validate=ValidateUser;