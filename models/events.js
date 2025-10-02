const Event = require('../schemas/events');


const getAllEvents = (callback) => { 
    return Event.findAllEvents(callback);
}

const getEventById = (id, callback) => {
    return Event.findEventById(id, callback);
}

const saveEvent = (event, callback) => {
    return Event.saveEvent(event, callback);
}

const updateEvents = (id, event, callback) => {
    return Event.updateEvents(id, event, callback);
}

module.exports = {
    getAllEvents,
    getEventById,
    saveEvent,
    updateEvents
}