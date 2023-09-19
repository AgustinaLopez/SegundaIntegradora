const mongoose = require('mongoose');

const collectionName = 'users';

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    cart: {
        type: String,
        default: []
    },
    rol: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    }
});

export const usersModel = mongoose.model(collectionName, usersSchema);