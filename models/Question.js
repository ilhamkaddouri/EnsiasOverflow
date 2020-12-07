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
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    dislikes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
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
            name:{
                type: String,
                required:true
            },
            likes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User'
                    }
                }
            ],
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