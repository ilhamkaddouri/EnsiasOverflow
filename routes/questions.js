const router = require('express').Router();
const Question = require('../models/Question');
const User = require('../models/User');
const Reponse = require('../models/Reponse')
const verify = require('../validation/verifytoken');

// @route       GET api/questions
// @desc        get all questions
// @access      Private
router.get('/',async (req,res)=>{

    try{
      
        const questions = await Question.find();
        res.json(questions)
    }catch(err){
        res.status(401).send({mesg:err})
    }
})

// @route       GET api/questions/:questionid
// @desc        get a question
// @access      Private
router.get('/:questionId',async (req,res)=>{
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

// router.get('/:userid',(req,res)=>{
//     try{
//         const 
//     }catch(err){
//         res.send({msg:err})
//     }
// })

// @route       POST api/questions
// @desc        post a question
// @access      Private
router.post('/',verify,async (req,res)=>{
    try{
       console.log(req.user.user.id)
        const newQuestion = new Question({
            title: req.body.title,
            description: req.body.description,
            user: req.user.user.id
        });
        const question = await newQuestion.save();
        res.send(question)
    }catch(err){
        console.error(err.message);
        res.status(400).send('Server eror.');
    }
})

// @route       POST api/questions/respond/:questionid
// @desc        respond to a question
// @access      Private
router.post('/respond/:questionid',verify,async (req,res)=>{
       
    try{
        const user = await User.findById(req.user).select('-password');
        const question = await Question.findById(req.params.questionid)
        console.log(user)
        const newReponse = {
            user : req.user,
            contenu: req.body.contenu,
        };
        
        question.responses.unshift(newReponse);
        await question.save();
       
        res.json(question.responses)
    }catch(err){
        console.error(err.message);
        //res.status(400).send('Server error.');
    }
})

// @route       GET api/questions/reponses/:questionid
// @desc        get the responesof a question
// @access      Public
router.get('/reponses/:questionid',async (req,res)=>{
    try{
        const question  = await Question.findById(req.params.questionid)
        res.send(question.responses)
    }catch(err){
        console.error(err.message);
        res.status(400).send('Server error.');
    }
})

module.exports=router