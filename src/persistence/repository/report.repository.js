const createConnection = require('../../config/db')

const getUsersReports = async()=>{
    const db = await createConnection();
    try {
      const result = await db.query(
        `SELECT
        id_usuarios,
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

const getEachReports = async(id)=>{
  const db = await createConnection();
  try {
    const result = await db.query(
      `
      SELECT
CONCAT(u.nombre, ' ', u.apellido) AS 'Nombre completo',
u.cedula,
p.monto,
p.porcentaje,
p.cuotas,
p.forma_de_pago,
CASE
WHEN p.estado = 0 THEN 'Activo'
WHEN p.estado = 1 THEN 'Inactivo'
ELSE 'Desconocido'
END AS estado_del_prestamo,
p.fecha_registro,
p.fecha_limite
FROM
usuarios u
JOIN
prestamos p ON u.id_usuarios = p.usuario
WHERE
usuario = ?
      `,id
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
    getUsersReports,
    getEachReports
}


