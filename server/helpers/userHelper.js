const express 			= require('express');
const router  			= express.Router();
const moment            = require('moment')
const bcrypt            = require('bcrypt');
const salt              = bcrypt.genSaltSync(10);
const reply             = require('../helpers/response')
const encryptionHelper  = require('../helpers/encryptionHelper')
const userModel         = require('../model/userRoute')

const submitUser = async (req, res) => {
    try{
        const username = req.body.username.replace(' ','')
        const userExist = await userModel.find({username})
        if(userExist.length > 0){
            return {statusCode:400, message:"User Already Exist"}
        }

        const password = bcrypt.hashSync(req.body.password, salt)
        const dataUser = {
            username:   username,
            password:   password,
        }
        const user = new userModel(dataUser);
        const inserteduser = await user.save();
        if(inserteduser){
            console.log(inserteduser)
            return { statusCode:200, message:'User saved successfully' }
        }
    }catch(error){
        throw new Error(error)
    }
}

const checkSession = async (req, res, payload) => {
    if(!req.session.userid){
        req.session.userid = payload.id
    }else{
        req.session.destroy()
    }
    return true;
}

const checkLogin = async (req, res) => {
    return new Promise(async(resolve, reject)=> {
        const username = req.body.username.replace(' ','')
        const userExist = await userModel.find({username})
        if(userExist.length > 0){
            bcrypt.compare(req.body.password, userExist[0].password, async (__err, valid) => {
                if(valid){
                    const expireTime    = parseInt(moment().format('x')) + (30*60*1000)
                    const payloadData = {
                        id: userExist[0]._id,
                        username: username,
                    }
                    const dataToEncrypt = { profile:payloadData, expireTime }
                    const response = {
                        status: 'LOGIN_SUCCESS',
                        token: encryptionHelper.encryptPayload(dataToEncrypt, 30) // 30 minutes
                    };
                    await checkSession(req, res, payloadData)
                    resolve(response)
                }else{
                    reject({statusCode:400, message:"Invalid Password"})
                }
            })
        }else{
            reject({statusCode:400, message:"Username Not Found"})
        }
    });
}

module.exports = {
    submitUser,
    checkLogin
}