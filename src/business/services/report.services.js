const reportRepository = require('../../persistence/repository/report.repository')

const getUserReports = async()=>{ 
    const result = await reportRepository.getUsersReports()
    if(result){
        return {message:'exito en la consulta',status:'200',info:result[0]}
    }else{
        return { message: "error interno del servidor", status: "500" };
    }
}

const getEachReports = async(id)=>{
    const result = await reportRepository.getEachReports(id)
    if(result){
        if(result[0].length > 0){
            return {message:'exito en la consulta',status:'200',info:result[0]}
        }else{
            return {message:'no tiene prestamos la persona',status:'400'}
        }
    }else{
        return { message: "error interno del servidor", status: "500" };
    }
}

module.exports = {
    getUserReports,
    getEachReports
}