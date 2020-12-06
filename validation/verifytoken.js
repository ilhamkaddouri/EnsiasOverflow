const jwt = require('jsonwebtoken');
module.exports = function (req,res,next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('acces deneied');

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        //verified contains the id
        req.user = verified;
        console.log(req.user)
        //res.send('done you have acces')
        next();
    }catch(err){
        //res.status(400).send('Invalid token,try again')
        console.log(err)
    }
}

