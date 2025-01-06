import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllClientsContacts = async () => {
  try {
    const query = `SELECT CL.CPC_NOMBRE_CLIENTE, CO.CPCO_NOMBRE 
        FROM CP_CLIENTES_CONTACTOS CC 
        JOIN CP_CLIENTES CL ON CC.CPC_CI_RUC = CL.CPC_CI_RUC 
        JOIN CP_CONTACTOS CO ON CC.CPCO_ID = CO.CPCO_ID`;
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().query(query);
    addAudit("CP_CLIENTES_CONTACTOS", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getClientsContactsbyId = async (id) => {
  try {
    const query = `SELECT CL.CPC_NOMBRE_CLIENTE, CO.CPCO_NOMBRE 
        FROM CP_CLIENTES_CONTACTOS CC 
        JOIN CP_CLIENTES CL ON CC.CPC_CI_RUC = CL.CPC_CI_RUC 
        JOIN CP_CONTACTOS CO ON CC.CPCO_ID = CO.CPCO_ID
        WHERE CPCC_ID = @id`;
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_CLIENTES_CONTACTOS", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addClientsContacts = async (cliente_ruc, contacto_id) => {
  try {
    const query =
      "INSERT INTO CP_CLIENTES_CONTACTOS (CPC_CI_RUC, CPCO_ID) VALUES (@cliente_ruc, @contacto_id)";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data
      .request()
      .input("cliente_ruc", sql.Int, cliente_ruc)
      .input("contacto_id", sql.Int, contacto_id)
      .query(query);
    addAudit("CP_CLIENTES_CONTACTOS", "POST", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateClientsContacts = async (cliente_ruc, contacto_id, id) => {
  try {
    const query =
      "UPDATE CP_CLIENTES_CONTACTOS SET CPC_CI_RUC = @cliente_ruc, CPCO_ID = @contacto_id WHERE CPCC_ID = @id";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data
      .request()
      .input("cliente_ruc", sql.Int, cliente_ruc)
      .input("contacto_id", sql.Int, contacto_id)
      .input("id", sql.Int, id)
      .query(query);
    addAudit("CP_CLIENTES_CONTACTOS", "PUT /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const removeClientsContacts = async (id) => {
  try {
    const query = "DELETE FROM CP_CLIENTES_CONTACTOS WHERE CPCC_ID = @id";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_CLIENTES_CONTACTOS", "DELETE /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
