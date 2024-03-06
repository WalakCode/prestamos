const loanRepository = require("../../persistence/repository/loan.repository");

const addLoan = async (data) => {
  const { id, amount, percentage, fee_frequency, fee } = data;
  const today = new Date();

  let frecuency;

  switch (fee_frequency) {
    case "diario":
      frecuency = 1 * fee;
      break;
    case "quincenal":
      frecuency = 15 * fee;
      break;
    case "mensual":
      frecuency = 30 * fee;
      break;
    case "anual":
      frecuency = 365 * fee;
      break;
    default:
      break;
  }


  const limit_date = new Date(today);
  limit_date.setDate(today.getDate() + frecuency);

  if (id && amount && percentage && fee_frequency && fee) {
    if (amount < 20000 || amount > 20000000) {
      return {
        message:
          "El monto tiene que superar los 20.000 o no ser mayor a 20.000.000",
        status: "400",
      };
    } else if (fee <= 0) {
      return {
        message: "se necesita un numero mayor de cuotas",
        status: "400",
      };
    } else {
      const result = await loanRepository.addLoan([
        id,
        amount,
        percentage,
        fee,
        fee_frequency,
        limit_date,
      ]);
      if (result) {
        return { message: "exito en la creacion del prestamo", status: "200" };
      } else {
        return { message: "error interno del servidor", status: "500" };
      }
    }
  } else {
    return { message: "Ingrese todos los campos del prestamo", status: "400" };
  }
};


const getAllActiveLoans = async()=>{
    const result = await loanRepository.getAllActiveLoans()
     if(result){
        console.log(result[0])
        return { message: "exito en la obtencion de prestamos actuivs", status: "200",info:result[0]};
     }else{
        return { message: "error interno del servidor", status: "500" };
     }
}

module.exports = {
    addLoan,
    getAllActiveLoans
}