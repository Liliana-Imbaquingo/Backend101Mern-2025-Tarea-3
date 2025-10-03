const router = require('express').Router();
const { query, validationResult} = require('express-validator');
// jwt = require('jsonwebtoken');

/* Models */
const Users = require('../models/users');
/** Middlewares */
//const apiKeyMiddleware = require('../middlewares/apiKey');
const basicAuthMiddleware = require('../middlewares/basicAuth')  
const jwtAuthMiddleware = require('../middlewares/jwtAuth')
const sessionMiddleware = require('../middlewares/session');

let users = [{
    id: 1,
    name: 'Carlos',
    email: 'carlos@gmail.com',
    age: 20
}];
const jwtSecret = 'thisismysecret';
//router.use(apiKeyMiddleware);
//router.use(basicAuthMiddleware);

router.use(sessionMiddleware);
// Entity: users 
/** */
//router.use(jwtAuthMiddleware);
router.get('/users/', (req, res) => {
    return Users.getAllUsers((err, users) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error getting users!'});
        }
        res.status(200).json({ code: 'OK', message: 'Users are available!', data:{ users}});
    });
});




router.get('/users/query', query('id').notEmpty(), (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ code: 'PF', message: 'User ID is required!'});
    }

    const id = req.query.id;

    return Users.getUserById(id, (err, user) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error getting user!'});
        }
        if(!user) {
            return res.status(404).json({ code: 'NF', message: 'User not found!'});
        }
        res.status(200).json({ code: 'OK', message: 'User is available!', data:{ user}});
    });
});

router.post('/users', (req, res) => {
    console.log('POST /users:',req.body);
    const { name, email = new Date().getTime()+ '@gmail.com', age, password, apiKey } = req.body;

    const newUser = { id: new Date().getTime() ,name, email, age, password, apiKey };

    return Users.saveUser(newUser, (err, user) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error creating user!'});
        }
        res.status(201).json({ code: 'OK', message: 'User created successfully!', data: {user}});
    });
});

router.put('/users/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({ code: 'PF', message: 'ID is required'})
    }

    return Users.updateUser(id, req.body, (err, user) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error updating user!'});
        }
        return res.status(200).json({ code: 'OK', message: 'User updated!', data: { user}});
    });
    
});

router.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log('DELETE /users/:id:',id);
    if(!id){
        return res.status(400).json({ code: 'PF', message: 'ID is required'})
    }
    return Users.deleteUser(id, (err, user) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error deleting user!'});
        }
        return res.status(200).json({ code: 'OK', message: 'User deleted!', data: { user}});
    });
});

module.exports = router;