const createError 	  = require('http-errors');
const express 		  = require('express');
const bodyParser      = require('body-parser');
const path 	          = require('path');
const cookieParser 	  = require('cookie-parser');
const session         = require('express-session');
const mysql           = require('mysql');               //// Add SQL
const app             = express();
const reply           = require('./server/helpers/response')
const moment          = require('moment')
const cors = require('cors');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/books_management',{ useNewUrlParser: true, useUnifiedTopology: true });
const db =  mongoose.connection;
            db.on('error', (error) => console.log(error));
            db.once('open', () => console.log('Database Connected...'));

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'jitera123',
    name: 'jiteraSecret',
    cookie: {
        sameSite: true,
        maxAge: 6000000
    },
}))

const userController       = require('./server/api/users');
const bookController       = require('./server/api/books');

app.use('/api/user', userController);
app.use('/api/book', bookController);
app.use((err, res)=> {
    if(err){
        res.send({status:404, message:"REQUEST_NOT_FOUND", transactionID:reply.transactionId()})
    }
});

   
module.exports = app;