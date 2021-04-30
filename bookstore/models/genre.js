const Joi = require('joi');
const mongoose= require('mongoose');
const {BookSchema}=require('./books');

const genreSchema=new mongoose.Schema({
    name:{
      type:String,
      required:true,
      maxlength:50
    },
    books:[BookSchema]

});
const Genre = mongoose.model('Genre',genreSchema);

exports.genreSchema=genreSchema;
exports.Genre=Genre;
