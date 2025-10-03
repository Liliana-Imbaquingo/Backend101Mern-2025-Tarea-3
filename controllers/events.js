const router = require('express').Router();
const { query, validationResult} = require('express-validator');
const crypto = require('crypto');

/** Middlewares */
//const apiKeyMiddleware = require('../middlewares/apiKey');
const basicAuthMiddleware = require('../middlewares/basicAuth');
const Events = require('../models/events');
/*
let events = [{
    "name":"Comisiones",
    "description":"Ventas",
    "amount":250,
    "date":"2025-07-30",
    "type":"Income"
    }];*/

const { default: mongoose } = require('mongoose');
//Health Checker
router.get('/health', (_, res) =>{
    const time= process.uptime();
    const status = 'ok';
    const dbState = mongoose.connection.readyState;
    const dbStatus = dbState ===1 ? 'Connected' : 'Disconnected'
    res.json({ code: 'OK', message: 'Server is running', time: time, status: status, DataBase: dbStatus })
    });


    //router.use(apiKeyMiddleware);
    router.use(basicAuthMiddleware);
// Entity: events 
router.post('/events', (req, res) => {
    console.log('POST /events:',req.body);
    const { name, description, amount, date, type } = req.body;

    if(!name||!description||!amount||!date||!type){
        return res.status(400).json({ code: 'PF', message: 'Missing values. The following values are required:name, description, amount, date, type'})
    }
    
    id= crypto.randomUUID();
    const newEvent = { id, name, description, amount, date, type};
    Events.saveEvent(newEvent, (err, event) => {
        if(err){
            res.status(500).json({ code: 'ER', message: 'Error creating event!'})
        }
        res.status(201).json({ code: 'OK', message: 'Event created successfully!', data: {event} })
    });
});


router.get('/events', (req, res) => {
    return Events.getAllEvents((err, events) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error getting events!'});
        }
        res.status(200).json({ code: 'OK', message: 'Events are available!', data:{ events}});
    });
});

//app.get('/api/events/query', query('id').notEmpty().withMessage('ID is required'), (req, res) => {
router.get('/events/:id' , (req, res) => {
    const id =  req.params.id  ;  
    if(!id) {
        return res.status(400).json({ code: 'PF', message: 'event ID is required!'});
    }
    return Events.getEventById(id, (err, event) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error getting event!'});
        }
        if (!event) {
            return res.status(404).json({ code: 'NF', message: 'Event not found!'});
         }
        res.status(200).json({ code: 'OK', message: 'Event found!', data: { event}});
    });
});

router.get('/events/query', query('id').notEmpty(), (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ code: 'PF', message: 'Event ID is required!'});
    }

    const id = req.query.id;

    if(!id) {
        return res.status(400).json({ code: 'PF', message: 'event ID is required!'});
    }
    return Events.getEventById(id, (err, event) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error getting event!'});
        }
        if (!event) {
            return res.status(404).json({ code: 'NF', message: 'Event not found!'});
         }
        res.status(200).json({ code: 'OK', message: 'Event found!', data: { event}});
    });

});


router.put('/events/:id', (req, res)=>{
    const id = req.params.id;

    if(!id){
        return res.status(400).json({ code: 'PF', message: 'ID is required'})
    }
    
    return Events.updateEvent(id, req.body, (err, event) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error updating event!'});
        }
        return res.status(200).json({ code: 'OK', message: 'Event updated!', data: { event}});
    });
    
});

router.delete('/events/:id', (req, res) => {
    const id = req.params.id;
    console.log('id',id)
    if(!id){
        return res.status(400).json({ code: 'PF', message: 'ID is required'})
    }
    
    return Events.deleteEvent(id, (err, event) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error deleting event!'});
        }
        return res.status(200).json({ code: 'OK', message: 'Event deleted!', data: { event}});
    });

    

});
module.exports = router;

