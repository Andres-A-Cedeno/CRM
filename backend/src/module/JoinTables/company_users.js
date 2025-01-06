import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllCompanyUsers = async () => {
  try {
    const query = `SELECT E.CPE_NOMBRE, U.CPU_NICKNAME 
        FROM CP_EMPRESA_USUARIOS EU 
        JOIN CP_EMPRESAS E ON EU.CPE_RUC = E.CPE_RUC 
        JOIN CP_USUARIOS U ON EU.CPU_CEDULA = U.CPU_CEDULA`;
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().query(query);
    addAudit("CP_EMPRESA_USUSARIOS", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getCompanyUsersbyId = async (id) => {
  try {
    const query = `SELECT E.CPE_NOMBRE, U.CPU_NICKNAME 
        FROM CP_EMPRESA_USUARIOS EU 
        JOIN CP_EMPRESAS E ON EU.CPE_RUC = E.CPE_RUC 
        JOIN CP_USUARIOS U ON EU.CPU_CEDULA = U.CPU_CEDULA
        WHERE CPEU_ID = @id`;
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_EMPRESA_USUSARIOS", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addCompanyUser = async (empresa_ruc, usuario_ci) => {
  try {
    const query =
      "INSERT INTO CP_EMPRESA_USUARIOS (CPE_RUC, CPU_CEDULA) VALUES (@empresa_ruc, @usuario_ci)";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data
      .request()
      .input("empresa_ruc", sql.Int, empresa_ruc)
      .input("usuario_ci", sql.Int, usuario_ci)
      .query(query);
    addAudit("CP_EMPRESA_USUSARIOS", "POST", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateCompanyUser = async (empresa_ruc, usuario_ci, id) => {
  try {
    const query =
      "UPDATE CP_EMPRESA_USUARIOS SET CPE_RUC = @empresa_ruc, CPU_CEDULA =  @usuario_ci WHERE CPEU_ID = @id";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data
      .request()
      .input("empresa_ruc", sql.Int, empresa_ruc)
      .input("usuario_ci", sql.Int, usuario_ci)
      .input("id", sql.Int, id)
      .query(query);
    addAudit("CP_EMPRESA_USUSARIOS", "PUT /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const removeCompanyUser = async (id) => {
  try {
    const query = "DELETE FROM CP_EMPRESA_USUARIOS WHERE CPEU_ID = @id";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_EMPRESA_USUSARIOS", "DELETE", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
