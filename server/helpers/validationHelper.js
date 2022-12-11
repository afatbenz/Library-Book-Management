const express   = require('express');
const router    = express.Router();
const Joi       = require('joi');

const userValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
};

const bookValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        author: Joi.string().required(),
        genre: Joi.string().required()
    });
    return schema.validate(data);
};

const bookDetailValidation = (data) => {
    const schema = Joi.object({
        id: Joi.string().required()
    });
    return schema.validate(data);
};

const bookUpdateValidation = (data) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required(),
        desc: Joi.string().required(),
        author: Joi.string().required(),
        genre: Joi.string().required(),
        pickupDate: Joi.string().optional(),
    });
    return schema.validate(data);
};

const pickupValidation = (data) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        pickupDate: Joi.string().required(),
    });
    return schema.validate(data);
};

module.exports = {
    userValidation,
    bookValidation,
    bookDetailValidation,
    bookUpdateValidation,
    pickupValidation
}