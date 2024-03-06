const createConnection = require('../../config/db')

const getUsersReports = async()=>{
    const db = await createConnection();
    try {
      const result = await db.query(
        `SELECT
        CONCAT(nombre, ' ', apellido) AS 'Nombre completo',
        cedula,
        numero,
        CASE
          WHEN estado = 0 THEN 'Activo'
          WHEN estado = 1 THEN 'Inactivo'
          ELSE 'Desconocido'
        END AS estado
      FROM
        usuarios;      
        `,
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
    getUsersReports
}

