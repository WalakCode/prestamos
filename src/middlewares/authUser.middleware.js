const userRepository = require('../persistence/repository/user.respository')

const authUser = async(req , res, next)=>{
    const id = req.body.id
    const result = await userRepository.getID(id)
    if(result){
        if(result[0].length > 0){
            const message = 'el usuario ya existe, si desea crear un prestamo dirigete al apartado de prestamos'
            res.render('options.ejs',{message})
        }else{
            next()
        }
    }else{
        const error = 'error interno del servidor'
        res.render('add.user.ejs',{error})
    }
}

module.exports = {
    authUser
}