import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllProducts = async () => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `SELECT CPPS_NOMBRE_PRODUCTO, CPPS_TIPO_PRODUCTO, A.CPAD_DESCRIPCION 
        FROM CP_PRODUCTOS_SERVICIOS P 
        JOIN CP_ADMINISTRACIONES A ON P.CPAD_ID = A.CPAD_ID`;
    const result = await data.request().query(query);
    addAudit("CP_PRODUCTOS_SERVICIOS", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getProductbyId = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `SELECT CPPS_NOMBRE_PRODUCTO, CPPS_TIPO_PRODUCTO, A.CPAD_DESCRIPCION 
        FROM CP_PRODUCTOS_SERVICIOS P 
        JOIN CP_ADMINISTRACIONES A ON P.CPAD_ID = A.CPAD_ID
        WHERE CPPS_ID = @id`;
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_PRODUCTOS_SERVICIOS", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (nombre, tipo, admin_id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `INSERT INTO CP_PRODUCTOS_SERVICIOS (CPPS_NOMBRE_PRODUCTO, CPPS_TIPO_PRODUCTO, CPAD_ID) 
      VALUES (@nombre, @tipo, @admin_id)`;
    await data
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("tipo", sql.VarChar, tipo)
      .input("admin_id", sql.Int, admin_id)
      .query(query);
    addAudit("CP_PRODUCTOS_SERVICIOS", "POST", query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (nombre, tipo, admin_id, id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query =
      "UPDATE CP_PRODUCTOS_SERVICIOS SET CPPS_NOMBRE_PRODUCTO = @nombre, CPPS_TIPO_PRODUCTO = @tipo , CPAD_ID = @admin_id WHERE CPPS_ID = @id";
    await data
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("tipo", sql.VarChar, tipo)
      .input("admin_id", sql.Int, admin_id)
      .input("id", sql.Int, id)
      .query(query);
    addAudit("CP_PRODUCTOS_SERVICIOS", "PUT/ " + id, query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const removeProduct = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "DELETE FROM CP_PRODUCTOS_SERVICIOS WHERE CPPS_ID = @id";
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_PRODUCTOS_SERVICIOS", "DELETE /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
