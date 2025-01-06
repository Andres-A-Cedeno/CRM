import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllCompanies = async () => {
  try {
    const query = "SELECT * FROM CP_EMPRESAS";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().query(query);
    addAudit("CP_EMPRESAS", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getCompanybyId = async (ruc) => {
  try {
    const query = "SELECT * FROM CP_EMPRESAS WHERE CPE_RUC = @ruc";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().input("ruc", sql.Int, ruc).query(query);
    addAudit("CP_EMPRESAS", "GET /" + ruc, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addCompany = async (ruc, menu_id, nombre) => {
  try {
    const query =
      "INSERT INTO CP_EMPRESAS (CPE_RUC, CPM_ID, CPE_NOMBRE) VALUES (@ruc, @menu_id, @nombre)";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data
      .request()
      .input("ruc", sql.Int, ruc)
      .input("menu_id", sql.Int, menu_id)
      .input("nombre", sql.VarChar, nombre)
      .query(query);
    addAudit("CP_EMPRESAS", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateCompany = async (new_ruc, menu_id, nombre, ruc) => {
  try {
    const query =
      "UPDATE CP_EMPRESAS SET CPE_RUC = @new_ruc, CPM_ID = @menu_id, CPE_NOMBRE = @nombre WHERE CPE_RUC = @ruc ";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data
      .request()
      .input("new_ruc", sql.Int, new_ruc)
      .input("menu_id", sql.Int, menu_id)
      .input("nombre", sql.VarChar, nombre)
      .input("ruc", sql.Int, ruc)
      .query(query);
    addAudit("CP_EMPRESAS", "PUT /" + ruc, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const removeCompany = async (ruc) => {
  try {
    const query = "DELETE FROM CP_EMPRESAS WHERE CPE_RUC = @ruc";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().input("ruc", sql.Int, ruc).query(query);
    addAudit("CP_EMPRESAS", "DELETE /" + ruc, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
