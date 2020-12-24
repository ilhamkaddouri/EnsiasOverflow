const router = require('express').Router();
const User = require('../model/user');

const verify = require('../routes/verifyToken');

router.get('/',verify, (req,res)=>{
    // res.json({posts : 
    //     {
    //       title : 'my first post',
    //       description : 'Random data you should not have access to without being logged in'
    // }})
    res.send(req.user); // The user_id is accessible to all the routes that verify the token 
})

module.exports = router;