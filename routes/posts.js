const router = require('express').Router();
const verify = require('../validation/verifytoken');

router.get('/get',verify,(req,res)=>{
    res.json({
        posts:{
            title:"post delivred"
        }
    })
})

module.exports = router;