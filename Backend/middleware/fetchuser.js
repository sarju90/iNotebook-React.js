const jwt = require('jsonwebtoken');

a='sarju@90Dasjfjdjfd'
const fetchuser=(req,res,next)=>{

    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authnticate using valid token"})
    }

try {
    const data=jwt.verify(token,a)
    req.user=data.user
    next();
} catch (error) {
    res.status(401).send({error:"Please authnticate using valid token"})
}
    
}

module.exports=fetchuser;