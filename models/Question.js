const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    title:{
        type: String,
        required: true,
    
    },
    description :{
        type: String,
        
    },
    responses:[
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            contenu: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date:{
        default: Date.now,
        type:Date
    }
})
module.exports = mongoose.model('Question',QuestionSchema)