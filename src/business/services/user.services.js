const userRepository = require('../../persistence/repository/user.respository')

const loginAdmin = async (user,pass) =>{
    if(user && pass){
        const userMin = user.toLowerCase()
        if(userMin == 'admin' && pass == 'admin'){
            return {message:'logeado',status:'200'}
        }else{
            return {message:'credenciales no coinciden',status:'400'}
        }
    }else{
        return {message:'ingrese campos validos',status:'400'}
    }
}

const addUser = async(data)=>{
    const {name,lastname,id,phone} = data
    const result = await userRepository.addUser([name,lastname,id,phone])
    if(result){
        return {message:'exito en la creacion del usuario',status:'200'}
    }else {
        return {message:'error interno del servidor',status:'500'}
    }
}

module.exports = {
    loginAdmin,
    addUser
}