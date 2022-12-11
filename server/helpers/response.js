const express 			= require('express');
const router  			= express.Router();

const cdate   = new Date();
const csecond = cdate.getSeconds();
const cminutes= cdate.getMinutes();

const year    = cdate.getFullYear().toString();
const month   = (cdate.getMonth() + 101).toString().substring(1);
const day     = (cdate.getDate() + 100).toString().substring(1);
const rand    = cminutes + year + month + day + csecond;

const transactionId = ()=> {
    return "SVC"+rand+Math.floor((Math.random() * 100000) + 1)
}

const send = (res, param) => {
    if(param){
        const {statusCode} = param
        let codeResponse = 200
        if(statusCode){
            codeResponse = statusCode
        }
        if(statusCode && statusCode === 401){
            return res.status(401).send({status:401, message:'Unauthorized'})
        }
        const response = {
            statusCode:     codeResponse, 
            message:    "success"
        }
        
        if(param && param.message && statusCode){
            if(statusCode === 400){
                response.message = param.message.replace(' ', '_').toUpperCase()
            }else{
                response.message = param.message
            }
        }else{
            response.data = param.data || param
        }
        response.transactionID = transactionId()

        if (param && param.length === 0){
            response.statusCode = 201
            response.message = "DATA_NOT_FOUND"
        }

        return res.status(codeResponse).send(response)
    }
}

const errorResponse = (res, param) => {
    if(param){
        const {statusCode} = param
        if(statusCode && statusCode === 401){
            return res.status(401).send({statusCode:401, message:'Unauthorized'})
        }
        if(param.details){
            return res.status(400).send({statusCode:400, status: 'Bad Request', message: param.details[0].message})
        }
        return res.status(401).send({statusCode:param.statusCode, message:param.message})
    }else{
        return res.status(500).send({statusCode:500, message:'Internal Server Error'})
    }
}

const errorInternalServer = (res, err)=>{
    const {code} = err;
    let statusCode = 500
    let messaege = "Internal Server Error"
    if(code === 401){
        statusCode = 401
        messaege = "Unauthorized"
    }

    let description = err.message || messaege

    if(description !== '' && code !== 401){
        description = description.replace('Error: ', ' ')
        res.status(400).send({status:400, message:description, transactionID:transactionId()})    
    }else{
        res.status(code).send({status:statusCode, message: description})
    }
}

const badParameter = (res, param)=>{
    let parameters = ''
    if(param){
        parameters = param.toUpperCase().split(' ').join('_')+'_NOT_FOUND'
    }
    res.status(400).send({status:400, message:"Missing Mandatory Paramareters", description:parameters})
}

const Unauthorized   = (req, res)=>{
    const response = {
        status:     401,
        message:    'Unauthorized'
    }
    response.transactionID = transactionId()

    res.status(401).send(response)
}

module.exports = {
    send,
    errorResponse,
    errorInternalServer,
    badParameter,
    transactionId,
    Unauthorized
}