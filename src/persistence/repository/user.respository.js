const createConnection = require('../../config/db')

const getUsers = async()=>{
    const db = await createConnection();
    try {
      const result = await db.query(
        `
        SELECT id_usuarios,cedula FROM usuarios
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


const addUser = async(data)=>{
    const db = await createConnection();
    try {
      const result = await db.query(
        `
        INSERT INTO usuarios (nombre,apellido,cedula,numero) values (?,?,?,?)
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

const getID = async(id)=>{
    const db = await createConnection();
    try {
      const result = await db.query(
        `
        SELECT * FROM usuarios WHERE cedula = ?
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
    getUsers,
    addUser,
    getID,
}