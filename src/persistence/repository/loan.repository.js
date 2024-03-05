const createConnection = require('../../config/db')

const addLoan = async(data)=>{
    const db = await createConnection();
    try {
      const result = await db.query(
        `
        INSERT INTO prestamos (usuario, monto, porcentaje, cuotas, forma_de_pago ,estado, fecha_registro, fecha_limite) values (?,?,?,?,?,'activo',NOW(),?)
        `,
        data
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await db.end();
    }
}

const getLoans = async(id)=>{
    const db = await createConnection();
    try {
      const result = await db.query(
        `
        SELECT * FROM prestamos WHERE usuario = ?
        `,
        id
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await db.end();
    }
}

module.exports = {
    addLoan,
    getLoans
}