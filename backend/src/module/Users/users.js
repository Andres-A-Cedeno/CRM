import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getUserLogin = async (nickname) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `SELECT CPU_NICKNAME, CPU_CONTRASENA 
        FROM CP_USUARIOS
        WHERE CPU_NICKNAME = @nickname`;
    const result = await data
      .request()
      .input("nickname", sql.VarChar, nickname)
      .query(query);
    addAudit("CP_USUARIOS", "GET /" + cedula, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `SELECT CPU_CEDULA, CPU_NOMBRE, CPU_APELLIDO, CPU_ESTADO, CPU_NICKNAME, CPU_CORREO, CPR_NOMBRE, CPD_NOMBRE 
        FROM CP_USUARIOS U 
        JOIN CP_ROLES R ON  U.CPR_ID = R.CPR_ID 
        JOIN CP_DEPARTAMENTOS D ON U.CPD_ID = D.CPD_ID`;
    const result = await data.request().query(query);
    addAudit("CP_USUARIOS", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getUserbyCI = async (cedula) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `SELECT CPU_CEDULA, CPU_NOMBRE, CPU_APELLIDO, CPU_ESTADO, CPU_NICKNAME, CPU_CORREO, CPR_NOMBRE, CPD_NOMBRE 
        FROM CP_USUARIOS U 
        JOIN CP_ROLES R ON  U.CPR_ID = R.CPR_ID 
        JOIN CP_DEPARTAMENTOS D ON U.CPD_ID = D.CPD_ID
        WHERE CPU_CEDULA = @cedula`;
    const result = await data
      .request()
      .input("cedula", sql.Int, cedula)
      .query(query);
    addAudit("CP_USUARIOS", "GET /" + cedula, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const AddUser = async (
  cedula,
  nombre,
  apellido,
  estado,
  nickname,
  correo,
  contrasena,
  rol_id,
  dep_id
) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `INSERT INTO CP_USUARIOS (
    CPU_CEDULA, 
    CPU_NOMBRE, 
    CPU_APELLIDO, 
    CPU_ESTADO, 
    CPU_NICKNAME, 
    CPU_CORREO, 
    CPU_CONTRASENA, 
    CPR_ID, 
    CPD_ID
    )VALUES (
    @cedula, 
    @nombre, 
    @apellido, 
    @estado, 
    @nickname, 
    @correo, 
    @contrasena, 
    @rol_id, 
    @dep_id
    )`;
    await data
      .request()
      .input("cedula", sql.Int, cedula)
      .input("nombre", sql.VarChar, nombre)
      .input("apellido", sql.VarChar, apellido)
      .input("estado", sql.Bit, estado)
      .input("nickname", sql.VarChar, nickname)
      .input("correo", sql.VarChar, correo)
      .input("contrasena", sql.VarChar, contrasena)
      .input("rol_id", sql.Int, rol_id)
      .input("dep_id", sql.Int, dep_id)
      .query(query);
    addAudit("CP_USUARIOS", "POST", query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const UpdateUser = async (
  new_ci,
  nombre,
  apellido,
  estado,
  nickname,
  correo,
  contrasena,
  rol_id,
  dep_id,
  cedula
) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `UPDATE CP_USUARIOS SET
        CPU_CEDULA = @new_ci,
        CPU_NOMBRE = @nombre, 
        CPU_APELLIDO = @apellido, 
        CPU_ESTADO = @estado, 
        CPU_NICKNAME= @nickname, 
        CPU_CORREO = @correo, 
        CPU_CONTRASENA = @contrasena,
        CPR_ID = @rol_id,
        CPD_ID = @dep_id
        WHERE CPU_CEDULA = @cedula`;
    await data
      .request()
      .input("new_ci", sql.Int, new_ci)
      .input("nombre", sql.VarChar, nombre)
      .input("apellido", sql.VarChar, apellido)
      .input("estado", sql.Bit, estado)
      .input("nickname", sql.VarChar, nickname)
      .input("correo", sql.VarChar, correo)
      .input("contrasena", sql.VarChar, contrasena)
      .input("rol_id", sql.Int, rol_id)
      .input("dep_id", sql.Int, dep_id)
      .input("cedula", sql.VarChar, cedula)
      .query(query);
    addAudit("CP_USUARIOS", "PUT /" + cedula, query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const RemoveUser = async (cedula) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "DELETE FROM CP_USUARIOS WHERE CPU_CEDULA = @cedula";
    const result = await data
      .request()
      .input("cedula", sql.Int, cedula)
      .query(query);
    addAudit("CP_USUARIOS", "DELETE /" + cedula, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
