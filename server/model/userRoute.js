const express           = require('express');
const router            = express.Router();
const mongoose = require('mongoose');

const User = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: String,
        required: false
        }
    });

module.exports = mongoose.model('Users', User);
