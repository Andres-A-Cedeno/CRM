import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllServicesDeals = async () => {
  try {
    const query = `SELECT P.CPPS_NOMBRE_PRODUCTO, T.CPT_NOMBRE_TRATO, PT.CPPC_ESTADO
        FROM CP_PRODUCTO_TRATO PT 
        JOIN CP_PRODUCTOS_SERVICIOS P ON PT.CPPS_ID = P.CPPS_ID 
        JOIN CP_TRATOS T ON PT.CPT_ID = T.CPT_ID`;
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().query(query);
    addAudit("CP_PRODUCTO_TRATO", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getServiceDealbyId = async (id) => {
  try {
    const query = `SELECT P.CPPS_NOMBRE_PRODUCTO, T.CPT_NOMBRE_TRATO, PT.CPPC_ESTADO
        FROM CP_PRODUCTO_TRATO PT 
        JOIN CP_PRODUCTOS_SERVICIOS P ON PT.CPPS_ID = P.CPPS_ID 
        JOIN CP_TRATOS T ON PT.CPT_ID = T.CPT_ID
        WHERE CPPC_ID = @id`;
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_PRODUCTO_TRATO", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addServiceDeal = async (id_producto, id_trato, estado) => {
  try {
    const query =
      "INSERT INTO CP_PRODUCTO_TRATO (CPPS_ID, CPT_ID, CPPC_ESTADO) VALUES (@id_producto, @id_trato, @estado)";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data
      .request()
      .input("id_producto", sql.Int, id_producto)
      .input("id_trato", sql.Int, id_trato)
      .input("estado", sql.Bit, estado)
      .query(query);
    addAudit("CP_PRODUCTO_TRATO", "POST", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateServiceDeal = async (id_producto, id_trato, estado, id) => {
  try {
    const query =
      "UPDATE CP_PRODUCTO_TRATO SET CPPS_ID = @id_producto, CPT_ID = @id_trato, CPPC_ESTADO = @estado WHERE CPPC_ID = @id";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data
      .request()
      .input("id_producto", sql.Int, id_producto)
      .input("id_trato", sql.Int, id_trato)
      .input("estado", sql.Bit, estado)
      .input("id", sql.Int, id)
      .query(query);
    addAudit("CP_PRODUCTO_TRATO", "PUT /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const removeServiceDeal = async (id) => {
  try {
    const query = "DELETE FROM CP_PRODUCTO_TRATO WHERE CPPC_ID = @id";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().input("id", sql.Int, id).query(query);
    return result;
  } catch (error) {
    throw error;
  }
};
