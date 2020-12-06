const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

//validation 
const joi = require('@hapi/joi');

const schema = {
    name : joi.string().min(6).required(),
    email:joi.string().min(6).required().email(),
    password:joi.string().min(6).required()
}

router.post('/register',async (req,res)=>{

    //validate data bfore create user
    // const validation = joi.ValidationError(req.body,schema)
    // res.send(validation);

    //check if the emil exst in bd
    const emailExists = await User.findOne({email :req.body.email});
    if(emailExists) return res.status(400).send('email exists in bd')

    //hash the password contains the hash and the salt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt)

    //create a new user
    const user = new User({
        name : req.body.name,
        email :req.body.email,
        password :hashPassword
    })
    
    try{
        const sentUser = await user.save();
        res.send({user: user._id})
    }catch(err){
        res.send(err)
    }
    
})
router.post('/login',async (req,res)=>{

    //cheking email exists or not
    const user = await User.findOne({email :req.body.email});
    if(!user) return res.status(400).send('Email or password wrong');

    //password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid email or pass');
    
    //create and assign a token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token)

    //login
    //res.send('login')


})
module.exports = router;