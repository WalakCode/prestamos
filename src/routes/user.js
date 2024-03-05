const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser');
const {getMain,postLogin,postUser,postCreateUser,postLoan,postCreateLoan} = require('../presentation/controller/user.controller')
const {authID} = require('../middlewares/authId.middleware')
const {authToken} = require('../middlewares/authToken.middleware')

router.use(cookieParser());

router.get('/',getMain)
    .post('/login',postLogin)
    .post('/user',authToken,postUser)
    .post('/createUser',authToken,authID,postCreateUser)
    .post('/loans',postLoan)
    .post('/createLoan',authToken,postCreateLoan)


module.exports = router 