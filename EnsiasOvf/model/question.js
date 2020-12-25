const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
    },
    username: {
        type : String,
    },
    qst_title:{
        type : String, 
        required : true,
    },
    qst_content:{
        type : String, 
        required : true,
    },
    qst_likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    qst_dislikes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    asked_date :{
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('question',questionSchema);