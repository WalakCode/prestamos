const userRepository = require('../../persistence/repository/user.respository')
const loanRepository = require('../../persistence/repository/loan.repository')

const getUsers = async(req,res)=>{
    const result = await userRepository.getUsers()
    return result[0]
}

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

const addLoan = async(data)=>{
    const {id,amount,percentage,fee_frequency,fee} = data
    const today = new Date()

    let frecuency

    switch (fee_frequency) {
        case 'diario':
            frecuency = 1 * fee
            break;
        case 'quincenal':
            frecuency = 15 * fee
            break;
        case 'mensual':
            mensual = 30 * fee
            break;
        case 'anual':
            frecuency = 365 * fee
            break;
        default:
            break;
    }

    const limit_date = new Date(today)
    limit_date.setDate(today.getDate() + frecuency)
    const result = await loanRepository.addLoan([id,amount,percentage,fee,fee_frequency,limit_date])
    if(result){
        return {message:'exito en la creacion del prestamo',status:'200'}
    }else{
        return {message:'error interno del servidor',status:'500'}
    }
    
}

module.exports = {
    loginAdmin,
    addUser,
    addLoan,
    getUsers
}