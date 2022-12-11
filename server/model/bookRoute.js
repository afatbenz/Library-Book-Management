const express           = require('express');
const router            = express.Router();
const mongoose = require('mongoose');

const Book = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    pickupDate:{
        type: Date,
        require: false
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

module.exports = mongoose.model('Book', Book);
