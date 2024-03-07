const createConnection = require("../../config/db");

const addLoan = async (data) => {
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
};

const getLoans = async (id) => {
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
};

const getState = async (id) => {
  const db = await createConnection();
  try {
    const result = await db.query(
      `
      SELECT
      CASE
        WHEN estado = 0 THEN 'Activo'
        WHEN estado = 1 THEN 'Inactivo'
        ELSE 'Desconocido'
      END AS estado
    FROM
      usuarios
    WHERE
      id_usuarios = ?
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
};

const getAllActiveLoans = async (id) => {
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
  p.estado = 0; -- Solo préstamos activos

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
};

const getProfit = async(days)=>{
  const db = await createConnection();
  try {
    const result = await db.query(
      `
      SELECT monto, porcentaje, cuotas, forma_de_pago
      FROM prestamos
      WHERE estado = 'activo'
      AND fecha_limite BETWEEN NOW() AND NOW() + INTERVAL ? DAY
      LIMIT 25;      
      `,
      days
    );
    return result;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await db.end();
  }
}

const getAllProfit = async()=>{
  const db = await createConnection();
  try {
    const result = await db.query(
      `
      SELECT 
      SUM((CAST(monto AS DECIMAL(10,2)) * CAST(porcentaje AS DECIMAL(10,2)) / 100)) AS ganancia_total
  FROM 
      prestamos;
  
    
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
  addLoan,
  getLoans,
  getState,
  getAllActiveLoans,
  getProfit,
  getAllProfit
};
