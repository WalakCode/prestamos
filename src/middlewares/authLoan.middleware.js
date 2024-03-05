const loanRepository = require('../persistence/repository/loan.repository')

const authLoan = async(req,res,next)=>{
    const result = await loanRepository.getLoans(req.body.id)
    (result[0].length)
    if(result){
        if(result[0].length >= 4){
            const message = 'la persona ya tiene mas de cuatro prestamos, solvente algun prestamo para poder ingresar mas'
            res.render('options.ejs',{message})
        }else{
            next()
        }
    }else{
        const error = 'error interno del servidor'
        res.render('add.loan.ejs',{error})
    }
}

module.exports = {
    authLoan
}