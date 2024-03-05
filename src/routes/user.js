const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser');
const {getMain,postLogin,postUser,postCreateUser,postLoan,postCreateLoan} = require('../presentation/controller/user.controller')
const {authUser} = require('../middlewares/authUser.middleware')
const {authLoan} = require('../middlewares/authLoan.middleware')
const {authToken} = require('../middlewares/authToken.middleware')

router.use(cookieParser());

router.get('/',getMain)
    .post('/login',postLogin)
    .post('/user',authToken,postUser)
    .post('/createUser',authToken,authUser,postCreateUser)
    .post('/loans',postLoan)
    .post('/createLoan',authToken,authLoan,postCreateLoan)


module.exports = router 