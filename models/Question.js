const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    title:{
        type: String,
        required: true,
        min:10
    },
    description :{
        type: String,
        
    },
    date:{
        default: Date.now,
        type:Date
    }
})
module.exports = mongoose.model('Question',QuestionSchema)