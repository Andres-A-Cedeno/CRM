import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllFileRoutes = async () => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `SELECT CPRA_ID, CPRA_RUTA, CPRA_NOMBRE, CPRA_FECHA_SUBIDA, CPRA_TIPO_ARCHIVO, CPRA_ESTADO, CPA_NOMBRE 
      FROM CP_RUTA_ARCHIVOS RA 
      JOIN CP_DIRECTORIO DI ON RA.CPA_ID = DI.CPA_ID`;
    const result = await data.request().query(query);
    addAudit("CP_RUTA_ARCHIVOS", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getFileRoutebyId = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `SELECT CPRA_ID, CPRA_RUTA, CPRA_NOMBRE, CPRA_FECHA_SUBIDA, CPRA_TIPO_ARCHIVO, CPRA_ESTADO, CPA_NOMBRE 
        FROM CP_RUTA_ARCHIVOS RA 
        JOIN CP_DIRECTORIO DI ON RA.CPA_ID = DI.CPA_ID 
        WHERE CPRA_ID = @id`;
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_RUTA_ARCHIVOS", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addFileRoute = async (
  dir_id,
  ruta,
  nombre,
  fecha_subida,
  tipo_archivo,
  estado
) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query =
      "INSERT INTO CP_RUTA_ARCHIVOS (CPA_ID, CPRA_RUTA, CPRA_NOMBRE, CPRA_FECHA_SUBIDA, CPRA_TIPO_ARCHIVO, CPRA_ESTADO) VALUES (@dir_id, @ruta, @nombre, @fecha_subida, @tipo_archivo, @estado)";
    await data
      .request()
      .input("dir_id", sql.Int, dir_id)
      .input("ruta", sql.VarChar, ruta)
      .input("nombre", sql.VarChar, nombre)
      .input("fecha_subida", sql.DateTime, fecha_subida)
      .input("tipo_archivo", sql.VarChar, tipo_archivo)
      .input("estado", sql.Bit, estado)
      .query(query);
    addAudit("CP_RUTA_ARCHIVOS", "POST", query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const updateFileRoute = async (
  dir_id,
  ruta,
  nombre,
  fecha_subida,
  tipo_archivo,
  estado,
  id
) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query =
      "UPDATE CP_RUTA_ARCHIVOS SET CPA_ID = @dir_id, CPRA_RUTA = @ruta, CPRA_NOMBRE = @nombre, CPRA_FECHA_SUBIDA = @fecha_subida, CPRA_TIPO_ARCHIVO = @tipo_archivo, CPRA_ESTADO = @estado WHERE CPRA_ID = @id  ";
    await data
      .request()
      .input("dir_id", sql.Int, dir_id)
      .input("ruta", sql.VarChar, ruta)
      .input("nombre", sql.VarChar, nombre)
      .input("fecha_subida", sql.DateTime, fecha_subida)
      .input("tipo_archivo", sql.VarChar, tipo_archivo)
      .input("estado", sql.Bit, estado)
      .input("id", sql.Int, id)
      .query(query);
    addAudit("CP_RUTA_ARCHIVOS", "PUT /" + id, query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const removeFileRoute = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "DELETE FROM CP_RUTA_ARCHIVOS WHERE CPRA_ID = @id";
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_RUTA_ARCHIVOS", "DELETE /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
