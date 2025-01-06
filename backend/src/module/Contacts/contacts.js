import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllContacts = async () => {
  try {
    const query = "SELECT * FROM CP_CONTACTOS";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().query(query);
    addAudit("CP_CONTACTOS", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getContactbyId = async (id) => {
  try {
    const query = "SELECT * FROM CP_CONTACTOS WHERE CPCO_ID = @id";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_CONTACTOS", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addContact = async (
  nombre,
  apellido,
  cargo,
  correo,
  movil,
  telefono,
  dir_correspondencia,
  ciudad_correspondencia,
  pais_correspondencia,
  posible_cliente,
  estado
) => {
  try {
    const query = `INSERT INTO CP_CONTACTOS (
    CPCO_NOMBRE, 
    CPCO_APELLIDO, 
    CPCO_CARGO, 
    CPCO_CORREO, 
    CPCO_MOVIL, 
    CPCO_TELEFONO, 
    CPCO_DIR_CORRESPONDENCIA, 
    CPCO_CIUDAD_CORRESPONDENCIA, 
    CPCO_PAIS_CORRESPONDENCIA, 
    CPCO_POSIBLE_CLIENTE, 
    CPCO_ESTADO
    ) VALUES (
     @nombre, 
     @apellido, 
     @cargo, 
     @correo, 
     @movil,
     @telefono, 
     @dir_correspondencia, 
     @ciudad_correspondencia, 
     @pais_correspondencia, 
     @posible_cliente, 
     @estado)`;
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("apellido", sql.VarChar, apellido)
      .input("cargo", sql.VarChar, cargo)
      .input("correo", sql.VarChar, correo)
      .input("movil", sql.VarChar, movil)
      .input("telefono", sql.VarChar, telefono)
      .input("dir_correspondencia", sql.VarChar, dir_correspondencia)
      .input("ciudad_correspondencia", sql.VarChar, ciudad_correspondencia)
      .input("pais_correspondencia", sql.VarChar, pais_correspondencia)
      .input("posible_cliente", sql.VarChar, posible_cliente)
      .input("estado", sql.Bit, estado)
      .query(query);
    addAudit("CP_CONTACTOS", "POST", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateContact = async (
  nombre,
  apellido,
  cargo,
  correo,
  movil,
  telefono,
  dir_correspondencia,
  ciudad_correspondencia,
  pais_correspondencia,
  posible_cliente,
  estado,
  id
) => {
  try {
    const query = `UPDATE CP_CONTACTOS SET 
    CPCO_NOMBRE = @nombre, 
    CPCO_APELLIDO = @apellido, 
    CPCO_CARGO = @cargo, 
    CPCO_CORREO = @correo, 
    CPCO_MOVIL = @movil, 
    CPCO_TELEFONO =  @telefono, 
    CPCO_DIR_CORRESPONDENCIA = @dir_correspondencia, 
    CPCO_CIUDAD_CORRESPONDENCIA = @ciudad_correspondencia, 
    CPCO_PAIS_CORRESPONDENCIA = @pais_correspondencia, 
    CPCO_POSIBLE_CLIENTE = @posible_cliente, 
    CPCO_ESTADO = @estado 
    WHERE CPCO_ID = @id`;
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("apellido", sql.VarChar, apellido)
      .input("cargo", sql.VarChar, cargo)
      .input("correo", sql.VarChar, correo)
      .input("movil", sql.VarChar, movil)
      .input("telefono", sql.VarChar, telefono)
      .input("dir_correspondencia", sql.VarChar, dir_correspondencia)
      .input("ciudad_correspondencia", sql.VarChar, ciudad_correspondencia)
      .input("pais_correspondencia", sql.VarChar, pais_correspondencia)
      .input("posible_cliente", sql.VarChar, posible_cliente)
      .input("estado", sql.Bit, estado)
      .input("id", sql.Int, id)
      .query(query);
    addAudit("CP_CONTACTOS", "PUT /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const removeContact = async (id) => {
  try {
    const query = "DELETE FROM CP_CONTACTOS WHERE CPCO_ID = @id";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_CONTACTOS", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
