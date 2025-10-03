const router = require('express').Router();
const jwt = require('jsonwebtoken');
const basicAuthMiddleware = require('../middlewares/basicAuth');
const Users = require('../models/users');
const jwtSecret = 'thisismysecret';


router.get('/users/token', basicAuthMiddleware, (req, res)=> {
    jwt.sign({ user: req.user }, jwtSecret, { expiresIn: '1h' }, (err, token) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error generating token!'});
        }
        res.json({ code: 'OK', message: 'Token generated successfully!', data: { token }});
    });
});


router.post('/users/login', (req, res)=> {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(401).json({ code: 'UA', message: 'Email and password are required!'});
    }
    return Users.loginUser(email, password, (err, user) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error logging in!'});
        }
        if(!user){
            return res.status(401).json({ code: 'UA', message: 'Email and password are invalid!'});
        }
        req.session.user = user;
        res.json({ code: 'OK', message: 'Login successfully!', data: { user }});
    });
});

router.post('/users/logout', (req, res)=> {
    req.session.destroy();
    res.json({ code: 'OK', message: 'Logout successfully!'});
});




module.exports = router;