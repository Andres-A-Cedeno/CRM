import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";

const auth_user = 1;

export const getAllAudits = async () => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `SELECT CPAU_TABLA, CPAU_SENTENCIA, CPAU_FECHA, A.CPU_CEDULA 
        FROM CP_AUDITORIA A 
        JOIN CP_USUARIOS U ON A.CPU_CEDULA = U.CPU_CEDULA`;
    const result = await data.request().query(query);
    addAudit("CP_AUDIT", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAuditbyId = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `SELECT CPAU_TABLA, CPAU_SENTENCIA, CPAU_FECHA, A.CPU_CEDULA 
        FROM CP_AUDITORIA A 
        JOIN CP_USUARIOS U ON A.CPU_CEDULA = U.CPU_CEDULA
        WHERE CPAU_ID = @id`;
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_AUDIT", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addAudit = async (tabla, accion, sentencia, usuario_ci) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `INSERT INTO CP_AUDITORIA (CPAU_TABLA, CPAU_ACCION, CPAU_SENTENCIA, CPU_CEDULA) 
      VALUES (@tabla, @accion, @sentencia, @usuario_ci)`;
    await data
      .request()
      .input("tabla", sql.VarChar, tabla)
      .input("accion", sql.VarChar, accion)
      .input("sentencia", sql.VarChar, sentencia)
      .input("usuario_ci", sql.Int, usuario_ci)
      .query(query);
    return query;
  } catch (error) {
    throw error;
  }
};
