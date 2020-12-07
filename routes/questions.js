const router = require('express').Router();
const Question = require('../models/Question');
const User = require('../models/User');
const Reponse = require('../models/Reponse')
const verify = require('../validation/verifytoken');

// @route       GET api/questions
// @desc        get all questions
// @access      public
router.get('/',async (req,res)=>{

    try{
      
        const questions = await Question.find();
        res.json(questions)
    }catch(err){
        res.status(401).send({mesg:err})
    }
})

// @route       GET api/questions/:questionid
// @desc        find a question by id
// @access      public
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
       console.log(req.user._id)
        const newQuestion = new Question({
            title: req.body.title,
            description: req.body.description,
            user: req.user._id
        });
        const question = await newQuestion.save();
        res.send(question)
    }catch(err){
        console.error(err.message);
        res.status(400).send('Server eror.');
    }
})

// @route       DELETE api/questions/:questionid
// @desc        delete  a question
// @access      Private
router.delete('/:questionid',verify,async (req,res)=>{
    try{
        const question = await Question.findById(req.params.questionid);
        
        if(question.user.toString() !== req.user._id) return res.send('Action not authorized')
        await question.remove();
        res.json({msg : "Question removed"})

    }catch(err){
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found.' });
        }
        res.status(500).send('Server error.');
    }
})

// @route       PUT api/questions/:questionid
// @desc        update  a question
// @access      Private
router.put('/:questionid',verify,async (req,res)=>{
    try{
        const question =await Question.findById(req.params.questionid);
        if(!question) return res.json({msg : "question no found"});
        Object.assign(question,req.body)
        await question.save();
        res.json({msg : 'question updated'})
    }catch(err){
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found.' });
        }
        res.status(500).send('Server error.');
    }
})

// @route       POST api/questions/respond/:questionid
// @desc        respond to a question
// @access      Private
router.post('/respond/:questionid',verify,async (req,res)=>{
       
    try{
        const user = await User.findById(req.user._id).select('-password');
        const question = await Question.findById(req.params.questionid)
        console.log(user)
        const newReponse = {
            user : user._id,
            name: user.name,
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

// @route       PUT api/questions/like/:questionid
// @desc        like a question
// @access      Private
router.put('/like/:questionid',verify,async (req,res)=>{
    try{
        const question = await Question.findById(req.params.questionid)
        if(!question) return res.send({msg : "question not found"})

        if(question.likes.filter(like => like.user.toString() === req.user._id).length>0){
            return res.status(400).json({msg : "question already liked"})
        }
        question.likes.unshift({user : req.user._id})
        await question.save()
        res.json(question.likes)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

// @route       PUT api/questions/like/:questionid
// @desc        unlike a question
// @access      Private
router.put('/unlike/:questionid',verify,async (req,res)=>{
    try{
        const question = await Question.findById(req.params.questionid)
        if(!question) return res.send({msg : "question not found"})

        if(question.likes.filter(like => like.user.toString() === req.user._id).length === 0){
            return res.status(400).json({msg : "question not liked yet"})
        }
        const item = question.likes.map(like => like.user).indexOf(req.user._id);
        question.likes.splice(item,1)
        await question.save()
        res.json(question.likes)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

// @route       PUT api/questions/like/:questionid/responses/:responseid
// @desc        like a question
// @access      Private
router.put('/like/:questionid/responses/:responseid',verify,async (req,res)=>{
    try{
        const question = await Question.findById(req.params.questionid)
        if(!question) return res.send({msg : "question not found"})
        const response = question.responses.filter(response=> response._id.toString() === req.params.responseid)
        console.log(response)
        if(response.likes.filter(like => like.user.toString()=== req.user._id).length>0){
            return res.status(401),json({msg : "response already liked"})
        }

        response.likes.unshift({user : req.user._id})
        res.json(response.likes)
        // if(question.responses.filter(response => response.user.toString() === req.user._id).length>0){
        //     return res.status(400).json({msg : "response already liked"})
        // }
        // question.likes.unshift({user : req.user._id})
        // await question.save()
        // res.json(question.likes)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})


// @route       PUT api/questions/unlike/:questionid/responses/:responseid
// @desc        unlike a response
// @access      Private
router.put('/unlike/:questionid/responses/:responseid',verify,async (req,res)=>{
    try{
        const question = await Question.findById(req.params.questionid)
        if(!question) return res.send({msg : "question not found"})

        if(question.likes.filter(like => like.user.toString() === req.user._id).length === 0){
            return res.status(400).json({msg : "question not liked yet"})
        }
        const item = question.likes.map(like => like.user).indexOf(req.user._id);
        question.likes.splice(item,1)
        await question.save()
        res.json(question.likes)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})


module.exports=router