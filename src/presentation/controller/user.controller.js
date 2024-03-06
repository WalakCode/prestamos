const userService = require('../../business/services/user.services')
const loanService = require('../../business/services/loan.services')
const reportService = require('../../business/services/report.services')
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
    const usuarios = await userService.getUsers()
    res.render('add.loan.ejs',{error,usuarios})
}

const postCreateLoan = async(req,res)=>{
    const data = req.body
    const result = await loanService.addLoan(data)
    if(result.status == 200){
        const message = result.message
        res.render('options.ejs',{message})
    }else{
        const usuarios = await userService.getUsers()
        const error = result.message
        res.render('add.loan.ejs',{error,usuarios})
    }
}

const postReports = async(req,res)=>{
    const result = await reportService.getUserReports()
    if(result.status == 200){
        let error = null
        const info = result.info
        res.render('view.reports.ejs',{info,error})
    }else{
        const message = result.message
        res.render('options.ejs',{message})
    }

}

const postAllLoans = async(req,res)=>{
    const result = await loanService.getAllActiveLoans()
    if(result.status == 200){
        const info = result.info
        res.render('view.allActive.reports.ejs',{info})
    }else{
        const message = result.message
        res.render('options.ejs',{message})
    }
}

module.exports = {
    getMain,
    postLogin,
    postUser,
    postCreateUser,
    postLoan,
    postCreateLoan,
    postReports,
    postAllLoans
}