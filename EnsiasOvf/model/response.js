const mongoose = require('mongoose');

const ReponseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'question'
    },
    contenu : {
        type : String, 
        required : true,
    },
    date :{
        type : Date,
        default : Date.now
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    dislikes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
})

module.exports = mongoose.model('reponse',ReponseSchema);