const express=require('express');
const app = express();
const mongoose = require('mongoose');
//Call the env
require('dotenv').config();

//Import routes
const authRoute = require('./routes/auth');
const postRouter = require('./routes/posts')

//Connect to DB
const uri = process.env.URI;
mongoose.connect(uri,{useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex:true},()=>{
    console.log('connected to bd')
})

//Middleware
app.use(express.json())
//Route middleware
app.use('/api/user',authRoute)
app.use('/api/posts',postRouter)

app.listen(5000,()=>{
    console.log('app runing')
})