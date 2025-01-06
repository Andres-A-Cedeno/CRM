import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllAddress = async () => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "SELECT * FROM CP_DIRECTORIO";
    const result = await data.request().query(query);
    addAudit("CP_DIRECTORIO", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAddresbyId = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "SELECT * FROM CP_DIRECTORIO WHERE CPA_ID = @id";
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_DIRECTORIO", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addAddress = async (fecha_creacion, id_padre, nombre, orden) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `INSERT INTO CP_DIRECTORIO (CPA_FECHA_CREACION, CPA_ID_PADRE, CPA_NOMBRE, CPA_ORDEN) 
      VALUES (@fecha_creacion, @id_padre, @nombre, @orden)`;
    await data
      .request()
      .input("fecha_creacion", sql.DateTime, fecha_creacion)
      .input("id_padre", sql.Int, id_padre)
      .input("nombre", sql.VarChar, nombre)
      .input("orden", sql.Int, orden)
      .query(query);
    addAudit("CP_DIRECTORIO", "POST", query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const updateAddres = async (
  fecha_creacion,
  id_padre,
  nombre,
  orden,
  id
) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `UPDATE CP_DIRECTORIO SET 
      CPA_FECHA_CREACION = @fecha_creacion, 
      CPA_ID_PADRE = @id_padre, 
      CPA_NOMBRE = @nombre, 
      CPA_ORDEN = @orden 
      WHERE CPA_ID = @id `;
    await data
      .request()
      .input("fecha_creacion", sql.DateTime, fecha_creacion)
      .input("id_padre", sql.Int, id_padre)
      .input("nombre", sql.VarChar, nombre)
      .input("orden", sql.Int, orden)
      .input("id", sql.VarChar, id)
      .query(query);
    addAudit("CP_DIRECTORIO", "PUT /" + id, query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const removeAddres = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "DELETE FROM CP_DIRECTORIO WHERE CPA_ID = @id";
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_DIRECTORIO", "DELETE", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
