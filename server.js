const express=require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
//Call the env
require('dotenv').config();

//Import routes
const authRoute = require('./routes/auth');
const questionRouter = require('./routes/questions')

//Connect to DB
const uri = process.env.URI;
mongoose.connect(uri,{useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex:true},()=>{
    console.log('connected to bd')
})

//Middleware
app.use(express.json())
app.use(cors());

//Route middleware
app.use('/api/user',authRoute)
//app.use('/api/posts',postRouter)
app.use('/api/questions',questionRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('app runing')
})