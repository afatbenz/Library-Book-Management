const express 			= require('express');
const router  			= express.Router();
const moment            = require('moment')
const encryptionHelper  = require('../helpers/encryptionHelper')

const authValidation = (req, res, skip) => {
    let userID;
    if(!req.headers.authorization){
        throw {statusCode:401, messaege: `Unauthorized`};
    }else{
        const token = req.headers.authorization || req.body.headers['Authorization']

        if(req.session.userid){
            userID = req.session.userid
        }else{
            const decryptedToken = encryptionHelper.decryptPayload(token)
            if(decryptedToken){
                userID = decryptedToken.profile.id
                req.session.userid = decryptedToken.profile.id;
            }
        }

        if(!token || (!userID && !skip)){
            throw {statusCode:401, messaege: `Unauthorized`};
        }else{
            req = { ...req, auth: {userID} }
        }
    }
}

const getAccessUser = (response, auth)=> {
    try{
        let isOwner
        const secretID  = encryptionHelper.decryptString(auth.secretID)
        const ownerID   = encryptionHelper.decryptString(response.ownerID)
        return !!(secretID === ownerID || secretID == 1);
    }catch(err){
    }
}

module.exports = {
    getAccessUser,
    authValidation
}