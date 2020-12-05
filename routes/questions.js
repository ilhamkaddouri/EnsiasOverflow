const router = require('express').Router();
const Question = require('../models/Question');
const User = require('../models/User')
const verify = require('../validation/verifytoken');

router.get('/',verify,async (req,res)=>{

    try{
      
        const questions = await Question.find();
        res.json(questions)
    }catch(err){
        res.status(401).send({mesg:err})
    }
})

router.get('/:questionId',verify,async (req,res)=>{
    try{
        const question = await Question.findById(req.params.questionId);
        if (!question) {
            return res.status(404).json({ msg: 'Question not found.' });
        }
        res.json(question);
    }catch(err){
        res.status(401).send({nsg:err})
    }
})

router.post('/',verify,async (req,res)=>{
    try{
        const user = await User.findById(req.user.id);

            const newQuestion = new Question({
                title: req.body.text,
                description: req.body.description,
                user: req.user.id
            });
        const question = await newQuestion.save();

        res.json(question);

    }catch(err){
        console.error(err.message);
        res.status(400).send('Server error.');
    }
})

module.exports=router