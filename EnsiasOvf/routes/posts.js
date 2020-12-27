const router = require('express').Router();
const User = require('../model/user');
const Question = require('../model/question');
var mongoose = require('mongoose');
const verify = require('../routes/verifyToken');
const { findById } = require('../model/user');

// router.get('/', verify, (req,res)=>{
//     // res.json({posts : 
//     //     {
//     //       title : 'my first post',
//     //       description : 'Random data you should not have access to without being logged in'
//     // }})
//     res.send(req.user); // The user_id is accessible to all the routes that verify the token 
// });

/** to ask questions */
router.post('/ask',verify,async(req,res)=>{
    // const user_id = await User.findOne({user_id :req.body.user_id});
    // if(!user_id) {
    //     res.status(400)
    // }
    let user_id = req.user;
    let title = req.body.qst_title;
    let content = req.body.qst_content;
    
    if (!title || !content)
    return res.status(400).json({ msg: "Not all fields have been entered." });

    // const result = await User.find({}, null, { sort: { email: 1 }});
    const result = await User.findById(user_id);
    console.log(result.username);

    const question = new Question({
        user : user_id, 
        qst_title : title, 
        username : result.username,
        qst_content : content });

    try{
        const savedQuestion = await question.save();
        res.send({question_id : question._id});

    }catch(err)
    {
        res.status(500).json({msg : err.message});
    }

});
/** to get all questions */
router.get("/all",async(req,res) =>
{
    try{
        const questions = await Question.find();
        res.json(questions);
    }catch(err)
    {
        res.status(500).send(err);
    }
       
}
)

/** Displays the question by its id */
router.get("/all/qst", async(req,res)=>
{
    try{
        const qst = await Question.findById({ _id : req.body.id })
        res.json(qst);
    }catch(err){
        res.status(500).json({msg : err.message});
    }
    
})


/** Display one user's questions */
router.get("/my_questions", verify, async(req,res)=>
{
    const questions = await Question.find({user : req.user});
    res.json(questions);
})



/**  DELETE api/posts/:questionid*/
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

router.get('/', verify, (req,res)=>{
    // res.json({posts : 
    //     {
    //       title : 'my first post',
    //       description : 'Random data you should not have access to without being logged in'
    // }})
    res.send(req.user._id); // The user_id is accessible to all the routes that verify the token 
});

/** Modify Question */
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
            /** Post not found ? */
            return res.status(404).json("post not found");
        }
        res.status(500).send('Server error.');
    }
})

/** Respond to a question * */
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
            rep_content: req.body.rep_content,
        };
        
        question.responses.unshift(newReponse);
        await question.save();
       
        res.json(question.responses)
    }catch(err){
        console.error(err.message);
        //res.status(400).send('Server error.');
    }
})

/*
** Display the responses to a question 
*/
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
});

/**
 **Upvote a question
 */

// @route       PUT api/posts/like/:questionid
// @desc        like a question
// @access      Private
router.put('/like/:questionid',verify,async (req,res)=>{
    try{
        const question = await Question.findById(req.params.questionid)
        // Object.assign(question,req.body)
        console.log(question);
        if(!question) return res.send({msg : "question not found"})
        if(question.qst_likes.filter(like => like.user.toString() === req.user._id).length>0)
        {
            return res.status(400).json({msg : "question already liked"})
        }
        question.qst_likes.unshift({user : req.user._id})
        await question.save()
        res.json(question.qst_likes)
    }catch(err){
        console.error(err.message);
        res.status(500).send(err);
    }
});

/**
 * Downvote a question
 */
// @route       PUT api/questions/like/:questionid
// @desc        unlike a question
// @access      Private
router.put('/unlike/:questionid',verify,async (req,res)=>{
    try{
        const question = await Question.findById(req.params.questionid)
        if(!question) return res.send({msg : "question not found"})

        if(question.qst_likes.filter(like => like.user.toString() === req.user._id).length === 0){
            return res.status(400).json({msg : "question not liked yet"})
        }
        const item = question.qst_likes.map(like => like.user).indexOf(req.user._id);
        question.qst_likes.splice(item,1)
        question.qst_dislikes.unshift({user : req.user._id})
        await question.save()
        res.json(question.qst_likes)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

/**
 * Upvote a response to a question
 */
// @route       PUT api/questions/like/:questionid/responses/:responseid
// @desc        like a response of a question
// @access      Private
router.put('/like/:questionid/responses/:responseid',verify,async (req,res)=>{
    try{
        const question = await Question.findById(req.params.questionid)
        if(!question) return res.send({msg : "question not found"})
        const response = question.responses.filter(response=> response._id.toString() === req.params.responseid)
        if(response[0].likes.filter(like => like.user.toString() === req.user._id).length>0){
            return res.status(400).json({msg : "response already liked"})
        }
        console.log(response[0].likes)
        response[0].likes.unshift({user : req.user._id})
        await question.save()
        res.json(response.likes)
        
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})


/**
 * Downvote a response to a question
 */

// @route       PUT api/questions/unlike/:questionid/responses/:responseid
// @desc        unlike a response
// @access      Private
router.put('/unlike/:questionid/responses/:responseid',verify,async (req,res)=>{
    try{
        const question = await Question.findById(req.params.questionid)
        if(!question) return res.send({msg : "question not found"})
        const response = question.responses.filter(response=> response._id.toString() === req.params.responseid)
       
        if(response[0].likes.filter(like => like.user.toString() === req.user._id).length === 0){
            return res.status(400).json({msg : "response not liked yet"})
        }
        const item = response[0].likes.map(like => like.user).indexOf(req.user._id);
        response[0].likes.splice(item,1)
        await question.save()
        res.json(question.likes)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})



module.exports = router;