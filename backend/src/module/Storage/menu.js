import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllMenus = async () => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "SELECT * FROM CP_MENU";
    const result = await data.request().query(query);
    addAudit("CP_MENU", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getMenubyId = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "SELECT * FROM CP_MENU WHERE CPM_ID = @id";
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_MENU", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addMenu = async (estado, pestanas) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query =
      "INSERT INTO CP_MENU (CPM_PESTANAS, CPM_ESTADO) VALUES (@pestanas, @estado)";
    await data
      .request()
      .input("estado", sql.Bit, estado)
      .input("pestanas", sql.VarChar, pestanas)
      .query(query);
    addAudit("CP_MENU", "POST", query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const updateMenu = async (pestanas, estado, id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query =
      "UPDATE CP_MENU SET CPM_PESTANAS = @pestanas, CPM_ESTADO = @estado WHERE CPM_ID = @id ";
    await data
      .request()
      .input("estado", sql.Bit, estado)
      .input("pestanas", sql.VarChar, pestanas)
      .input("id", sql.VarChar, id)
      .query(query);
    addAudit("CP_MENU", "PUT /" + id, query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const removeMenu = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "DELETE FROM CP_MENU WHERE CPM_ID = @id";
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_MENU", "DELETE /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
