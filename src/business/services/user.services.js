const userRepository = require("../../persistence/repository/user.respository");


const getUsers = async (req, res) => {
  const result = await userRepository.getUsers();
  return result[0];
};

const loginAdmin = async (user, pass) => {
  if (user && pass) {
    const userMin = user.toLowerCase();
    if (userMin == "admin" && pass == "admin") {
      return { message: "logeado", status: "200" };
    } else {
      return { message: "credenciales no coinciden", status: "400" };
    }
  } else {
    return { message: "ingrese campos validos", status: "400" };
  }
};

const addUser = async (data) => {
  const { name, lastname, id, phone } = data;
  if (name && lastname && id > 0 && phone > 0) {
    const result = await userRepository.addUser([name, lastname, id, phone]);
    if (result) {
      return { message: "exito en la creacion del usuario", status: "200" };
    } else {
      return { message: "error interno del servidor", status: "500" };
    }
  } else {
    return {
      message:
        "Ingrese campos validos para el usuario, verifica los datos ingresados",
      status: "400",
    };
  }
};



module.exports = {
  loginAdmin,
  addUser,
  getUsers,
};
