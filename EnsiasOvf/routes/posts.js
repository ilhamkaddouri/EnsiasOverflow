const router = require('express').Router();
const User = require('../model/user');
const Question = require('../model/question');

const verify = require('../routes/verifyToken');

router.get('/', verify, (req,res)=>{
    // res.json({posts : 
    //     {
    //       title : 'my first post',
    //       description : 'Random data you should not have access to without being logged in'
    // }})
    res.send(req.user); // The user_id is accessible to all the routes that verify the token 
});

router.post('/ask',verify,async(req,res)=>{
    // const user_id = await User.findOne({user_id :req.body.user_id});
    // if(!user_id) {
    //     res.status(400)
    // }
    let user_id = req.user;
    let title = req.body.qst_title;
    let content = req.body.qst_content;

    const result = await User.find({}, null, { sort: { email: 1 }});
    console.log(result[0].username); // 'A'

    const question = new Question({user : user_id, qst_title : title, 
        qst_content : content });

    try{
        const savedQuestion = await question.save();
        res.send({question_id : question._id});

    }catch(err)
    {
        res.status(500).json({msg : err.message});
    }

});

router.get("/all",async(req,res) =>
{
        const questions = await Question.find();
        res.json(questions);
}
)

router.get("/my_question", verify, async(req,res)=>
{
    const question = await Question.find({user : req.user});
    res.json(question);
})


module.exports = router;