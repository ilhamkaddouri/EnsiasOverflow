const router = require('express').Router();
const User = require('../models/User');
const Question = require('../models/Question');
const Reponse = require('../models/Reponse');
router.get('/',(req,res)=>{

})

router.post('/respond/:questionid',async (req,res)=>{
    try{
        const userId = await User.findById(req.user.id);
        const question = await Question.findById(req.params.id)
        const newReponse = new Reponse({
            user : userId.id,
            question : question,
            contenu: req.body.contenu
        })
        question.responses.unshift(newReponse);
        await question.save();
        const savedReponse = newReponse.save();
        res.json(savedReponse)
    }catch(err){

    }
})


module.exports = router