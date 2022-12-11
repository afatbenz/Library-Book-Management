const express           = require('express');
const router            = express.Router();
const reply             = require('../helpers/response')
const generalHelper     = require('../helpers/generalHelper')
const bookHelper        = require('../helpers/bookHelper')
const validationHelper  = require('../helpers/validationHelper');
const Book              = require("../model/bookRoute.js")

const createBook = async (req, res) => {
    try {
        generalHelper.authValidation(req, res)
        const { error } = validationHelper.bookValidation(req.body)
        if (error) return reply.errorResponse(res, error)
        
        const response = await bookHelper.submitBook(req, res)
        reply.send(res, response)
    } catch (err) {
        reply.errorResponse(res, err)
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return reply.send(res, books)
    } catch (err) {
        reply.errorResponse(res, err)
    }
}

const getBook = async (req, res) => {
    try {
        const { error } = validationHelper.bookDetailValidation(req.body)
        if (error) return reply.errorResponse(res, error)

        const response = await bookHelper.detailBook(req, res)
        reply.send(res, response)
    } catch (err) {
        reply.errorResponse(res, err)
    }
}

const updateBook = async (req, res) => {
    try {
        generalHelper.authValidation(req, res)
        const { error } = validationHelper.bookUpdateValidation(req.body)
        if (error) return reply.errorResponse(res, error)

        const response = await bookHelper.updateBook(req, res)
        return reply.send(res, response)
    } catch (err) {
        return reply.errorResponse(res, err)
    }
}

const submitPickUp = async (req, res) => {
    try {
        generalHelper.authValidation(req, res)
        const { error } = validationHelper.pickupValidation(req.body)
        if (error) return reply.errorResponse(res, error)

        const response = await bookHelper.submitPickupBook(req, res)
        return reply.send(res, response)
    } catch (err) {
        return reply.errorResponse(res, err)
    }
}

const deleteBook = async (req, res) => {
    try {
        generalHelper.authValidation(req, res)
        const { error } = validationHelper.bookDetailValidation(req.body)
        if (error) return reply.errorResponse(res, error)

        const response = await bookHelper.deleteBook(req, res)
        return reply.send(res, response)
    } catch (err) {
        return reply.errorResponse(res, err)
    }
}

router.post('/submit', createBook)
router.get('/list', getBooks)
router.post('/detail', getBook)
router.post('/update', updateBook)
router.post('/submit-pickup', submitPickUp)
router.post('/delete', deleteBook)

module.exports = router;