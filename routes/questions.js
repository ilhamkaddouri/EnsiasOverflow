const router = require('express').Router();
const Question = require('../models/Question');
const User = require('../models/User');
const Reponse = require('../models/Reponse')
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

router.get('/:questionId/reponses',verify,async (req,res)=>{
    try{
        const question = await Question.findById(req.params.questionId);
        const reponses = await Reponse.findOne({question : question});
        if (!responses) {
            return res.status(404).json({ msg: 'no responses.' });
        }
        res.json(responses);
    }catch(err){
        res.status(401).send({nsg:err})
    }
})

router.post('/',verify,async (req,res)=>{
    try{
        const newQuestion = new Question({
            title: req.body.title,
            description: req.body.description,
            user: req.user.id
        });
        const question = await newQuestion.save();
        res.send(question)
    }catch(err){
        console.error(err.message);
        res.status(400).send('Server error.');
    }
})
router.post('/respond/:questionid',verify,async (req,res)=>{
       
    try{
        const user = await User.findById(req.user.id).select('-password');
        const question = await Question.findById(req.params.questionid)
        
        const newReponse = {
            user : req.user.id,
            contenu: req.body.contenu,
        };
        
        question.responses.unshift(newReponse);
        await question.save();
       
        res.json(question.responses)
    }catch(err){
        console.error(err.message);
        res.status(400).send('Server error.');
    }
})

//not functioannel yet
router.get('/reponses/:questionid',verify,async (req,res)=>{
    try{
        const question  = await Question.findById(req.params.questionid)
        res.send(question.responses)
    }catch(err){
        console.error(err.message);
        res.status(400).send('Server error.');
    }
})

module.exports=router