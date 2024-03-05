const userService = require('../../business/services/user.services')
const jwt = require("jsonwebtoken");

const getMain = async(req,res)=>{
    let error = null
    res.render('main.ejs',{error})
}

const postLogin = async(req,res)=>{
    const user = req.body.user
    const pass = req.body.pass
    
    const result = await userService.loginAdmin(user,pass)

    if(result.status == 200){
        const options = { expiresIn: "500m" };
        const userInf = {
             rol: "admin",
        };
        const token = jwt.sign(userInf, 'SECRETUNIQUEKEY', options);
        res.cookie('jwt', token, { httpOnly: true, expiresIn: 500 * 60 });
        let message = null
        res.render('options',{message})
    }else{
        const error = result.message
        res.render('main.ejs',{error})
    }
}

const postUser = async(req,res)=>{
    let error = null
    res.render('add.user.ejs',{error})
}

const postCreateUser = async(req,res)=>{
    const data = req.body
    const result = await userService.addUser(data)
    if(result.status == 200){
        const message = result.message
        res.render('options.ejs',{message})
    }else{
        const error = result.message
        res.render('add.user.ejs',{error})
    }
}

const postLoan = async(req,res)=>{
    let error = null
    res.render('add.loan.ejs',{error})
}

const postCreateLoan = async(req,res)=>{
    
}

module.exports = {
    getMain,
    postLogin,
    postUser,
    postCreateUser,
    postLoan,
    postCreateLoan
}