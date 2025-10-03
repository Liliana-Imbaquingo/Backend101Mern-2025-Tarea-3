const User = require('../schemas/users');


const getAllUsers = (callback) => { 
    return User.findAllUsers(callback);
}

const getUserById = (id, callback) => {
    return User.findUserById(id, callback);
}

const getUserByEmail = (email, callback) => {
    return User.findUserByEmail(email, callback);
}

const getUserByApiKey = (apiKey, callback) => {
    return User.findUserByApiKey(apiKey, callback);
}

const saveUser = (user, callback) => {
    return User.saveUser(user, callback);
}

const updateUser = (id, user, callback) => {
    return User.updateUser(id, user, callback);
}

const deleteUser = (id, callback) => {
    return Event.deleteUser(id, callback);
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByApiKey,
    saveUser,
    updateUser,
    deleteUser,
    getUserByEmail
}