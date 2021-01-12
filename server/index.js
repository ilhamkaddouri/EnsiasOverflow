const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const corse = require('cors');

dotenv.config();


/**Import routes
 */
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const tagRoute = require('./routes/tags');


// Connect to DataBase

mongoose.connect(process.env.DB_CONNECT,
{   useNewUrlParser: true, 
    useUnifiedTopology: true},()=>{
    console.log('Connected to DB');
})

/**
 * Express .JSON
 */
app.use(express.json()); // to be able to read the json data posted


/**
 * Cross origin resource sharing
 */
app.use(corse());
app.use(express.static(__dirname + '/public'));

/**Routes Middleware */
app.use('/api/user', authRoute); /* Prefix for the routes in ./routes/auth.js */
app.use('/api/posts', postRoute);
app.use('/api/tags', tagRoute);


/** Start Node Server */
app.listen(5000, ()=> console.log(" //*/*/ \\\ *// Server Up and running ^o^ /*//\_/**** "));