import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllActivities = async () => {
  try {
    const query = `SELECT U.CPU_NICKNAME, 
        C.CPC_NOMBRE_CLIENTE, 
        CPA_TITULO_TAREA, 
        CPA_FECHA_REGISTRO, 
        CPA_TIEMPO_INICIO, 
        CPA_TIEMPO_FINAL, 
        CPA_PROYECTO, 
        CPA_SECCION, 
        CPA_DESCRIPCION, 
        CPA_TIEMPO_TOTAL
        FROM CP_ACTIVIDADES A 
        JOIN CP_USUARIOS U ON A.CPU_CEDULA = U.CPU_CEDULA 
        JOIN CP_CLIENTES C ON A.CPC_CI_RUC = C.CPC_CI_RUC`;
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().query(query);
    addAudit("CP_ACTIVIDADES", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getActivitybyId = async (id) => {
  try {
    const query = `SELECT U.CPU_NICKNAME, 
        C.CPC_NOMBRE_CLIENTE, 
        CPA_TITULO_TAREA, 
        CPA_FECHA_REGISTRO, 
        CPA_TIEMPO_INICIO, 
        CPA_TIEMPO_FINAL, 
        CPA_PROYECTO, 
        CPA_SECCION, 
        CPA_DESCRIPCION, 
        CPA_TIEMPO_TOTAL
        FROM CP_ACTIVIDADES A 
        JOIN CP_USUARIOS U ON A.CPU_CEDULA = U.CPU_CEDULA 
        JOIN CP_CLIENTES C ON A.CPC_CI_RUC = C.CPC_CI_RUC
        WHERE CPA_ID = @id`;
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_ACTIVIDADES", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const AddActivity = async (
  user_ci,
  ci_ruc,
  titulo,
  fecha_registro,
  tiempo_inicio,
  tiempo_final,
  proyecto,
  seccion,
  descripcion,
  tiempo_total
) => {
  try {
    const query = `INSERT INTO CP_ACTIVIDADES (
      CPU_CEDULA, 
      CPC_CI_RUC, 
      CPA_TITULO_TAREA, 
      CPA_FECHA_REGISTRO, 
      CPA_TIEMPO_INICIO, 
      CPA_TIEMPO_FINAL, 
      CPA_PROYECTO, 
      CPA_SECCION, 
      CPA_DESCRIPCION, 
      CPA_TIEMPO_TOTAL
      )VALUES (
        @user_ci,
        @ci_ruc,
        @titulo,
        @fecha_registro,
        CAST (@tiempo_inicio AS TIME),
        CAST (@tiempo_final AS TIME),
        @proyecto,
        @seccion,
        @descripcion,
        CAST (@tiempo_total AS TIME)
        )`;
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data
      .request()
      .input("user_ci", sql.Int, user_ci)
      .input("ci_ruc", sql.Int, ci_ruc)
      .input("titulo", sql.VarChar, titulo)
      .input("fecha_registro", sql.DateTime, fecha_registro)
      .input("tiempo_inicio", sql.VarChar, tiempo_inicio)
      .input("tiempo_final", sql.VarChar, tiempo_final)
      .input("proyecto", sql.VarChar, proyecto)
      .input("seccion", sql.VarChar, seccion)
      .input("descripcion", sql.VarChar, descripcion)
      .input("tiempo_total", sql.VarChar, tiempo_total)
      .query(query);
    addAudit("CP_ACTIVIDADES", "POST", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const UpdateActivity = async (
  user_ci,
  ci_ruc,
  titulo,
  fecha_registro,
  tiempo_inicio,
  tiempo_final,
  proyecto,
  seccion,
  descripcion,
  tiempo_total,
  id
) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `UPDATE CP_ACTIVIDADES SET
      CPU_CEDULA = @user_cI, 
      CPC_CI_RUC = @ci_ruc, 
      CPA_TITULO_TAREA = @titulo, 
      CPA_FECHA_REGISTRO = @fecha_registro, 
      CPA_TIEMPO_INICIO = CAST (@tiempo_inicio AS TIME),
      CPA_TIEMPO_FINAL = CAST (@tiempo_final AS TIME), 
      CPA_PROYECTO = @proyecto, 
      CPA_SECCION = @seccion, 
      CPA_DESCRIPCION = @descripcion, 
      CPA_TIEMPO_TOTAL = CAST (@tiempo_total AS TIME)
      WHERE CPA_ID = @id`;
    await data
      .request()
      .input("user_ci", sql.Int, user_ci)
      .input("ci_ruc", sql.Int, ci_ruc)
      .input("titulo", sql.VarChar, titulo)
      .input("fecha_registro", sql.DateTime, fecha_registro)
      .input("tiempo_inicio", sql.VarChar, tiempo_inicio)
      .input("tiempo_final", sql.VarChar, tiempo_final)
      .input("proyecto", sql.VarChar, proyecto)
      .input("seccion", sql.VarChar, seccion)
      .input("descripcion", sql.VarChar, descripcion)
      .input("tiempo_total", sql.VarChar, tiempo_total)
      .input("id", sql.Int, id)
      .query(query);
    return query;
  } catch (error) {
    throw error;
  }
};

export const removeActivity = async (id) => {
  try {
    const query = "DELETE FROM CP_ACTIVIDADES WHERE CPA_ID = @id";
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_ACTIVIDADES", "DELETE /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
