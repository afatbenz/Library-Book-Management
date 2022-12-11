const express           = require('express');
const router            = express.Router();
const reply             = require('../helpers/response')
const userHelper        = require('../helpers/userHelper')
const validationHelper  = require('../helpers/validationHelper');

const saveUser = async (req, res) => {
    try {
        const { error } = validationHelper.userValidation(req.body)
        if (error) return reply.InvalidRequest(res, error)

        const insertUser = await userHelper.submitUser(req, res)
        return reply.send(res, insertUser)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const loginUser = async (req, res) => {
    try {
        const { error } = validationHelper.userValidation(req.body)
        if (error) return reply.InvalidRequest(res, error)

        const response = await userHelper.checkLogin(req, res)
        return reply.send(res, response)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const userDelete = await UserModel.deleteOne({_id: req.params.id});
        const response = {
            message: 'Data deleted successfully',
            deletedCount: userDelete.deletedCount
        }
        return reply.send(res, response)
    } catch (err) {
        console.log(err);
    }
}

router.post('/submit', saveUser)
router.post('/login', loginUser)

module.exports = router;