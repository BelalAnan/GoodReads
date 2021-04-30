const mongoose=require('mongoose');
const genres=require('./router/Genrerouter');
const users=require('./router/Userrouter');
const books =require('./router/Bookrouter');
const express =require('express');
const app=express();


mongoose.connect('mongodb://localhost/goodreads').then(()=>{
    console.log('connected to database')
}).catch(err=>{
    console.log('cant connect to database',err);

});
app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/users',users);
app.use('/api/books',books);
const port=process.env.port||3450;
app.listen(port,()=>console.log(`listening on port ${port}...... `))