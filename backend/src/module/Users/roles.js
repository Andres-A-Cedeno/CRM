import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllRoles = async () => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "SELECT * FROM CP_ROLES";
    const result = await data.request().query(query);
    addAudit("CP_ROLES", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getRolbyId = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "SELECT * FROM CP_ROLES WHERE CPR_ID = @id";
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_ROLES", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addRol = async (nombre, estado) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query =
      "INSERT INTO CP_ROLES (CPR_NOMBRE, CPR_ESTADO) VALUES (@nombre, @estado)";
    await data
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("estado", sql.Bit, estado)
      .query(query);
    addAudit("CP_ROLES", "POST", query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const updateRol = async (nombre, estado, id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query =
      "UPDATE CP_ROLES SET CPR_NOMBRE = @nombre, CPR_ESTADO = @estado WHERE CPR_ID = @id ";
    await data
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("estado", sql.Bit, estado)
      .input("id", sql.VarChar, id)
      .query(query);
    addAudit("CP_ROLES", "PUT /" + id, query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const removeRol = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "DELETE FROM CP_ROLES WHERE CPR_ID = @id";
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_ROLES", "DELETE", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
