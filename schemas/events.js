const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required:true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required:true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: String,
        required: true,

    },
    type: {
        type: String,
        required: true,
        enum: ['Expense', 'Income'],
    },
    /*password: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin',
    }*/
})

const Event = mongoose.model('Event', eventSchema);

const saveEvent = (event, callback) => {
    const {id,  name, description, amount, date, type} = event;
    const newEvent = new Event ({ id, name, description, amount, date, type});
    newEvent.save()
    .then(() =>{
        console.log('Nuevo evento creado!');
        return callback(null, newEvent);

    } )
    .catch(err => {
        console.error(err);
        return callback(err)
    });
    
}

const findAllEvents = (callback) =>{
    Event.find() 
    .then(results =>{
        console.log('📋 Todos los eventos:', results);
        return callback(null, results);
    })
    .catch(err =>{
        console.error(err);
        return callback(err);
    });
}

    const findEventById = (id, callback) =>{
        Event.findOne({ id }) 
        .then(result =>{
            console.log('📋 Event encontrado:', result);
            return callback(null, result);
        })
        .catch(err =>{
            console.error(err);
            return callback(err);
        });
    }

    const findEventByApiKey = (apiKey, callback) => { 
        Event.findOne({ apiKey })
       .then(result => {
        console.log('🔍 Encontrado:', result);
        return callback(null, result);
       })
       .catch(err => {
        console.error(err);
        console.log('🔍 Error:', err);
        return callback(err);
       });
    }

    const updateEvent = (id, event, callback) => {
            Event.findOneAndUpdate({ id }, event, {new: true}) 
        .then(result =>{
            console.log('📋 Actualizado:', result);
            return callback(null, result);
        })
        .catch(err =>{
            console.error(err);
            return callback(err);
        });
 }

 const deleteEvent = (id, callback) => {
    Event.findOneAndDelete({ id })
    .then(result =>{
        console.log('📋 Eliminado:', result);
        return callback(null, result);
    })
    .catch(err =>{
        console.error(err);
        return callback(err);
    });
}



module.exports = {
    Event,
    saveEvent,
    findAllEvents,
    findEventById,
    findEventByApiKey,
    updateEvent,
    deleteEvent
}

