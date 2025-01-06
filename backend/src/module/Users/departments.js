import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllDepartments = async () => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "SELECT * FROM CP_DEPARTAMENTOS";
    const result = await data.request().query(query);
    addAudit("CP_DEPARTAMENTOS", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getDepartmentbyId = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "SELECT * FROM CP_DEPARTAMENTOS WHERE CPD_ID = @id";
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_DEPARTAMENTOS", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addDepartment = async (nombre) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "INSERT INTO CP_DEPARTAMENTOS (CPD_NOMBRE) VALUES (@nombre)";
    await data.request().input("nombre", sql.VarChar, nombre).query(query);
    addAudit("CP_DEPARTAMENTOS", "POST", query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const updateDepartment = async (nombre, id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query =
      "UPDATE CP_DEPARTAMENTOS SET CPD_NOMBRE = @nombre WHERE CPD_ID = @id ";
    await data
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("id", sql.VarChar, id)
      .query(query);
    addAudit("CP_DEPARTAMENTOS", "PUT /" + id, query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const removeDepartment = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "DELETE FROM CP_DEPARTAMENTOS WHERE CPD_ID = @id";
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_DEPARTAMENTOS", "DELETE /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
