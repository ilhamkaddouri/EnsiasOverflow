const mongoose = require('mongoose');

const ReponseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    contenu : {

    },
    date :{
        type : Date,
    }
})


module.exports = mongoose.model('reponse',ReponseSchema);