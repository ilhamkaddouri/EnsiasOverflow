const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    tagName:{
        type : String, 
        required : true,

    },
    tagDescription:{
        type : String, 
        // required : true,

    },
});

module.exports = mongoose.model('tag',userSchema);