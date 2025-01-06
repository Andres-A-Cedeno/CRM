import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllAdministrations = async () => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "SELECT * FROM CP_ADMINISTRACIONES";
    const result = await data.request().query(query);
    addAudit("CP_ADMINISTRACIONES", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAdministrationsbyId = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "SELECT * FROM CP_ADMINISTRACIONES WHERE CPAD_ID = @id";
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_ADMINISTRACIONES", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addAdministration = async (
  tipo_administracion,
  descripcion,
  estado
) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query =
      "INSERT INTO CP_ADMINISTRACIONES (CPAD_TIPO_ADMINISTRACION, CPAD_DESCRIPCION, CPAD_ESTADO) VALUES (@tipo_administracion, @descripcion, @estado)";
    await data
      .request()
      .input("tipo_administracion", sql.VarChar, tipo_administracion)
      .input("descripcion", sql.VarChar, descripcion)
      .input("estado", sql.Bit, estado)
      .query(query);
    addAudit("CP_ADMINISTRACIONES", "POST", query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const updateAdministration = async (
  tipo_administracion,
  descripcion,
  estado,
  id
) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query =
      "UPDATE CP_ADMINISTRACIONES SET CPAD_TIPO_ADMINISTRACION = @tipo_administracion, CPAD_DESCRIPCION = @descripcion, CPAD_ESTADO = @estado WHERE CPAD_ID = @id";
    await data
      .request()
      .input("tipo_administracion", sql.VarChar, tipo_administracion)
      .input("descripcion", sql.VarChar, descripcion)
      .input("estado", sql.Bit, estado)
      .input("id", sql.Int, id)
      .query(query);
    addAudit("CP_ADMINISTRACIONES", "PUT /" + id, query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const removeAdministration = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "DELETE FROM CP_ADMINISTRACIONES WHERE CPAD_ID = @id";
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_ADMINISTRACIONES", "DELETE /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
