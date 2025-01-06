import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllClients = async () => {
  try {
    const query = `SELECT CPC_CI_RUC, 
        CPC_NOMBRE_CLIENTE, 
        CPC_TIPOCLIENTE, 
        CPC_SECTOR, 
        CPC_DIR_FACTURACION, 
        CPC_CIUDAD_FACTURACION, 
        CPC_PAIS_FACTURACION, 
        CPC_DIR_ENVIO, 
        CPC_CIUDAD_ENVIO, 
        CPC_PAIS_ENVIO, 
        CPC_ESTADO,
        CPU_NICKNAME,
        CPAD_DESCRIPCION
        FROM CP_CLIENTES C 
        JOIN CP_USUARIOS U ON C.CPU_CEDULA = U.CPU_CEDULA 
        JOIN CP_ADMINISTRACIONES A ON C.CPAD_ID = A.CPAD_ID`;
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().query(query);
    addAudit("CP_CLIENTES", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getClientbyId = async (ci_ruc) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `SELECT CPC_CI_RUC, 
        CPC_NOMBRE_CLIENTE, 
        CPC_TIPOCLIENTE, 
        CPC_SECTOR, 
        CPC_DIR_FACTURACION, 
        CPC_CIUDAD_FACTURACION, 
        CPC_PAIS_FACTURACION, 
        CPC_DIR_ENVIO, 
        CPC_CIUDAD_ENVIO, 
        CPC_PAIS_ENVIO, 
        CPC_ESTADO,
        CPU_NICKNAME,
        CPAD_DESCRIPCION
        FROM CP_CLIENTES C 
        JOIN CP_USUARIOS U ON C.CPU_CEDULA = U.CPU_CEDULA 
        JOIN CP_ADMINISTRACIONES A ON C.CPAD_ID = A.CPAD_ID
        WHERE CPC_CI_RUC = @ci_ruc`;
    const result = await data
      .request()
      .input("ci_ruc", sql.Int, ci_ruc)
      .query(query);
    addAudit("CP_CLIENTES", "GET /" + ci_ruc, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const AddClient = async (
  ci_ruc,
  nombre,
  tipo,
  sector,
  dir_fact,
  ciudad_fact,
  pais_fact,
  dir_envio,
  ciudad_envio,
  pais_envio,
  estado,
  cedula_fk,
  admin_fk
) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `INSERT INTO CP_CLIENTES (
        CPC_CI_RUC, 
        CPC_NOMBRE_CLIENTE, 
        CPC_TIPOCLIENTE, 
        CPC_SECTOR, 
        CPC_DIR_FACTURACION, 
        CPC_CIUDAD_FACTURACION, 
        CPC_PAIS_FACTURACION, 
        CPC_DIR_ENVIO, 
        CPC_CIUDAD_ENVIO, 
        CPC_PAIS_ENVIO, 
        CPC_ESTADO,
        CPU_CEDULA,
        CPAD_ID
        )VALUES (
        @ci_ruc,
        @nombre,
        @tipo,
        @sector,
        @dir_fact,
        @ciudad_fact,
        @pais_fact,
        @dir_envio,
        @ciudad_envio,
        @pais_envio,
        @estado,
        @cedula_fk,
        @admin_fk
        )`;
    await data
      .request()
      .input("ci_ruc", sql.Int, ci_ruc)
      .input("nombre", sql.VarChar, nombre)
      .input("tipo", sql.VarChar, tipo)
      .input("sector", sql.VarChar, sector)
      .input("dir_fact", sql.VarChar, dir_fact)
      .input("ciudad_fact", sql.VarChar, ciudad_fact)
      .input("pais_fact", sql.VarChar, pais_fact)
      .input("dir_envio", sql.VarChar, dir_envio)
      .input("ciudad_envio", sql.VarChar, ciudad_envio)
      .input("pais_envio", sql.VarChar, pais_envio)
      .input("estado", sql.Bit, estado)
      .input("cedula_fk", sql.Int, cedula_fk)
      .input("admin_fk", sql.Int, admin_fk)
      .query(query);
    addAudit("CP_CLIENTES", "POST", query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const UpdateClient = async (
  new_ci_ruc,
  nombre,
  tipo,
  sector,
  dir_fact,
  ciudad_fact,
  pais_fact,
  dir_envio,
  ciudad_envio,
  pais_envio,
  estado,
  cedula_fk,
  admin_fk,
  ci_ruc
) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `UPDATE CP_CLIENTES SET
    CPC_CI_RUC = @new_ci_ruc,
    CPC_NOMBRE_CLIENTE = @nombre,
    CPC_TIPOCLIENTE = @tipo,
    CPC_SECTOR = @sector,
    CPC_DIR_FACTURACION = @dir_fact,
    CPC_CIUDAD_FACTURACION = @ciudad_fact,
    CPC_PAIS_FACTURACION = @pais_fact,
    CPC_DIR_ENVIO = @dir_envio,
    CPC_CIUDAD_ENVIO = @ciudad_envio,
    CPC_PAIS_ENVIO = @pais_envio,
    CPC_ESTADO = @estado,
    CPU_CEDULA = @cedula_fk,
    CPAD_ID = @admin_fk
    WHERE CPC_CI_RUC = @ci_ruc`;
    await data
      .request()
      .input("new_ci_ruc", sql.Int, new_ci_ruc)
      .input("nombre", sql.VarChar, nombre)
      .input("tipo", sql.VarChar, tipo)
      .input("sector", sql.VarChar, sector)
      .input("dir_fact", sql.VarChar, dir_fact)
      .input("ciudad_fact", sql.VarChar, ciudad_fact)
      .input("pais_fact", sql.VarChar, pais_fact)
      .input("dir_envio", sql.VarChar, dir_envio)
      .input("ciudad_envio", sql.VarChar, ciudad_envio)
      .input("pais_envio", sql.VarChar, pais_envio)
      .input("estado", sql.Bit, estado)
      .input("cedula_fk", sql.Int, cedula_fk)
      .input("admin_fk", sql.Int, admin_fk)
      .input("ci_ruc", sql.Int, ci_ruc)
      .query(query);
    addAudit("CP_CLIENTES", "PUT /" + ci_ruc, query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const removeClient = async (ci_ruc) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "DELETE FROM CP_CLIENTES WHERE CPC_CI_RUC = @ci_ruc";
    const result = await data
      .request()
      .input("ci_ruc", sql.Int, ci_ruc)
      .query(query);
    addAudit("CP_CLIENTES", "DELETE /" + ci_ruc, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
