const express 			= require('express');
const router  			= express.Router();
const moment            = require('moment')
const bcrypt            = require('bcrypt');
const bookModel         = require('../model/bookRoute')

const submitBook = async (req, res) => {
    try{
        const title = req.body.title
        const checkExist = await bookModel.find({title})
        if(checkExist.length > 0){
            return {statusCode:400, message:"Book Already Exist"}
        }

        const book = new bookModel(req.body);
        const data = await book.save();
        if(data){
            return { statusCode:200, message:'Book saved successfully' }
        }
    }catch(error){
        throw new Error(error)
    }
}

const detailBook = async (req, res) => {
    try{
        const checkExist = await bookModel.find({_id:req.body.id})
        if(checkExist.length === 0){
            return {statusCode:400, message:"Book Not Found"}
        }
        return checkExist
    }catch(error){
        throw new Error(error)
    }
}

const updateBook = async (req, res) => {
    try{
        const checkExist = await bookModel.find({_id:req.body.id})
        if(checkExist.length === 0){
            return {statusCode:400, message:"Book Not Found"}
        }
        const dataUpdate = await bookModel.updateOne({_id: req.body.id}, {
            title: req.body.title,
            desc: req.body.desc
        });
        if(dataUpdate){
            return { statusCode:200, message:'Book updated successfully' }
        }
    }catch(error){
        throw new Error(error)
    }
}

const submitPickupBook = async (req, res) => {
    try{
        const checkExist = await bookModel.find({_id:req.body.id})
        if(checkExist.length === 0){
            return {statusCode:400, message:"Book Not Found"}
        }
        const dataUpdate = await bookModel.updateOne({_id: req.body.id}, {
            pickupDate: req.body.pickupDate
        });
        if(dataUpdate){
            return { statusCode:200, message:'Book updated successfully' }
        }
    }catch(error){
        throw new Error(error)
    }
}

const deleteBook = async (req, res) => {
    try{
        const checkExist = await bookModel.find({_id:req.body.id})
        if(checkExist.length === 0){
            return {statusCode:400, message:"Book Not Found"}
        }

        const dataUpdate = await bookModel.deleteOne({_id: req.body.id});
        if(dataUpdate){
            return { statusCode:200, message:'Book deleted successfully' }
        }
    }catch(error){
        throw new Error(error)
    }
}

module.exports = {
    submitBook,
    detailBook,
    updateBook,
    submitPickupBook,
    deleteBook
}