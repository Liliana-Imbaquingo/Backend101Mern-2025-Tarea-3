//apikEY= apikey=68a775bc-211e-48e2-8780-4e4ea57754cb
const Users = require('../models/users'); 
return module.exports = (req, res, next) => {
    const apiKey =req.query.apikey;
    if(!apiKey){
           return res.status(401).json({ code: 'UA', message: 'API key is required!'});
    }
    const user = Users.getUserByApiKey(apiKey, (err, user) =>{
       if(err){
           return res.status(500).json({ code: 'ER', message: 'ERROR'})
       }
       if(!user){
           return res.status(500).json({ code: 'ER', message: 'ERROR'})
       }
       req.user = user;
       next();
   
    })
   }