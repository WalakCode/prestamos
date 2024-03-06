const loanRepository = require("../persistence/repository/loan.repository");
const userService = require("../business/services/user.services");

const authLoan = async (req, res, next) => {
  if (req.body.id) {
    const state = await loanRepository.getState(req.body.id)
    if (state[0][0].estado == "Activo") {
      const result = await loanRepository.getLoans(req.body.id);
      if (result) {
        if (result[0].length >= 4) {
          const message =
            "la persona ya tiene mas de cuatro prestamos, solvente algun prestamo para poder ingresar mas";
          res.render("options.ejs", { message });
        } else {
          next();
        }
      } else {
        const usuarios = await userService.getUsers();
        const error = "error interno del servidor";
        res.render("add.loan.ejs", { error, usuarios });
      }
    } else {
      const message =
        "la persona no esta activa en el sistema, si quiere puede activarla desde los reportes";
      res.render("options.ejs", { message });
    }
  } else {
    const usuarios = await userService.getUsers();
    const error = "Seleccione a un usuario a quien adjudicarle el prestamo";
    res.render("add.loan.ejs", { error, usuarios });
  }
};

module.exports = {
  authLoan,
};
