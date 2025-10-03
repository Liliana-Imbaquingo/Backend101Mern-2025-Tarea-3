const jwt = require("jsonwebtoken");
const jwtSecret = 'thisismysecret';
module.exports = (req,res,next) => {
    const authorization = req.headers.authorization;
    console.log("hola", authorization)
    if(!authorization){
        return res.status(401).json({code: 'UA', message: 'Authorization header is required'})
    }
    
    const [type, token] = authorization.split(' ');
    console.log("type", type)
    console.log("tokrn", token)
    if(!type){
        console.log('vacio')
    }

    if(type !== 'Bearer'){
        return   res.status(401).json({code: 'UA', message: 'Authorization type is not supported jwt ',type})
    }
 

    return jwt.verify(token,jwtSecret, (error, user)=> {
        if(error){
           return res.status(401).json({code: 'UA', message: 'Invalid token',type})
        }
    console.log('User decode', user)
    req.user = user;
    next();
});

}