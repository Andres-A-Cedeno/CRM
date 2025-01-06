import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import { addAudit } from "../Storage/audit.js";

const auth_user = 1;

export const getAllDeals = async () => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `SELECT CPT_ESTADO, 
      CPT_NOMBRE_TRATO,
      CPT_TIPO_TRATO, 
      CPT_RECURRENCIA, 
      CPT_FUENTE_POSIBLE_CLIENTE, 
      CPT_FACTURACION, CPT_MARGEN, 
      CPT_FECHA_CREACION, 
      CPT_FECHA_MODIFICACION, 
      CPT_FECHA_CIERRE, 
      CPT_FASE, 
      CPT_PROBABILIDAD, 
      CPT_INGRESOS_ESPERADOS, 
      CPT_ETAPA, 
      CPT_CODIGO,
      D.CPA_NOMBRE,
      C.CPC_NOMBRE_CLIENTE,
      A.CPAD_DESCRIPCION
      FROM CP_TRATOS T
      JOIN CP_DIRECTORIO D ON T.CPA_ID = D.CPA_ID
      JOIN CP_CLIENTES C ON T.CPC_CI_RUC = C.CPC_CI_RUC
      JOIN CP_ADMINISTRACIONES A ON T.CPAD_ID = A.CPAD_ID`;
    const result = await data.request().query(query);
    addAudit("CP_TRATOS", "GET", query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getDealbyId = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `SELECT CPT_ESTADO, 
      CPT_NOMBRE_TRATO,
      CPT_TIPO_TRATO, 
      CPT_RECURRENCIA, 
      CPT_FUENTE_POSIBLE_CLIENTE, 
      CPT_FACTURACION, CPT_MARGEN, 
      CPT_FECHA_CREACION, 
      CPT_FECHA_MODIFICACION, 
      CPT_FECHA_CIERRE, 
      CPT_FASE, 
      CPT_PROBABILIDAD, 
      CPT_INGRESOS_ESPERADOS, 
      CPT_ETAPA, 
      CPT_CODIGO,
      D.CPA_NOMBRE,
      C.CPC_NOMBRE_CLIENTE,
      A.CPAD_DESCRIPCION
      FROM CP_TRATOS T
      JOIN CP_DIRECTORIO D ON T.CPA_ID = D.CPA_ID
      JOIN CP_CLIENTES C ON T.CPC_CI_RUC = C.CPC_CI_RUC
      JOIN CP_ADMINISTRACIONES A ON T.CPAD_ID = A.CPAD_ID 
      WHERE CPT_ID = @id`;
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_TRATOS", "GET /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addDeal = async (
  directorio_id,
  cliente_ruc,
  admin_id,
  estado,
  nombre,
  tipo,
  recurrencia,
  fuente_cliente,
  facturacion,
  margen,
  fecha_creacion,
  fecha_modificacion,
  fecha_cierre,
  fase,
  probabilidad,
  ingresos_esperados,
  etapa,
  codigo
) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `INSERT INTO CP_TRATOS(
      CPA_ID,
      CPC_CI_RUC,
      CPAD_ID,
      CPT_ESTADO, 
      CPT_NOMBRE_TRATO,
      CPT_TIPO_TRATO, 
      CPT_RECURRENCIA, 
      CPT_FUENTE_POSIBLE_CLIENTE, 
      CPT_FACTURACION, 
      CPT_MARGEN, 
      CPT_FECHA_CREACION, 
      CPT_FECHA_MODIFICACION, 
      CPT_FECHA_CIERRE, 
      CPT_FASE, 
      CPT_PROBABILIDAD, 
      CPT_INGRESOS_ESPERADOS, 
      CPT_ETAPA, 
      CPT_CODIGO )VALUES(
      @directorio_id, 
      @cliente_ruc, 
      @admin_id, 
      @estado, 
      @nombre, 
      @tipo, 
      @recurrencia, 
      @fuente_cliente, 
      @facturacion, 
      @margen, 
      @fecha_creacion,
      @fecha_modificacion,
      @fecha_cierre,
      @fase,
      @probabilidad,
      @ingresos_esperados,
      @etapa,
      @codigo)`;
    await data
      .request()
      .input("directorio_id", sql.Int, directorio_id)
      .input("cliente_ruc", sql.Int, cliente_ruc)
      .input("admin_id", sql.Int, admin_id)
      .input("estado", sql.Bit, estado)
      .input("nombre", sql.VarChar, nombre)
      .input("tipo", sql.VarChar, tipo)
      .input("recurrencia", sql.VarChar, recurrencia)
      .input("fuente_cliente", sql.VarChar, fuente_cliente)
      .input("facturacion", sql.VarChar, facturacion)
      .input("margen", sql.VarChar, margen)
      .input("fecha_creacion", sql.DateTime, fecha_creacion)
      .input("fecha_modificacion", sql.DateTime, fecha_modificacion)
      .input("fecha_cierre", sql.DateTime, fecha_cierre)
      .input("fase", sql.VarChar, fase)
      .input("probabilidad", sql.VarChar, probabilidad)
      .input("ingresos_esperados", sql.VarChar, ingresos_esperados)
      .input("etapa", sql.VarChar, etapa)
      .input("codigo", sql.VarChar, codigo)
      .query(query);
    addAudit("CP_TRATOS", "POST", query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const updateDeal = async (
  directorio_id,
  cliente_ruc,
  admin_id,
  estado,
  nombre,
  tipo,
  recurrencia,
  fuente_cliente,
  facturacion,
  margen,
  fecha_creacion,
  fecha_modificacion,
  fecha_cierre,
  fase,
  probabilidad,
  ingresos_esperados,
  etapa,
  codigo,
  id
) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = `UPDATE CP_TRATOS SET 
      CPA_ID = @directorio_id,
      CPC_CI_RUC = @cliente_ruc,
      CPAD_ID = @admin_id,
      CPT_ESTADO = @estado, 
      CPT_NOMBRE_TRATO = @nombre,
      CPT_TIPO_TRATO = @tipo, 
      CPT_RECURRENCIA = @recurrencia, 
      CPT_FUENTE_POSIBLE_CLIENTE = @fuente_cliente, 
      CPT_FACTURACION = @facturacion,
      CPT_MARGEN = @margen, 
      CPT_FECHA_CREACION = @fecha_creacion, 
      CPT_FECHA_MODIFICACION = @fecha_modificacion, 
      CPT_FECHA_CIERRE = @fecha_cierre, 
      CPT_FASE = @fase, 
      CPT_PROBABILIDAD = @probabilidad, 
      CPT_INGRESOS_ESPERADOS = @ingresos_esperados, 
      CPT_ETAPA = @etapa, 
      CPT_CODIGO =  @codigo
      WHERE CPT_ID = @id`;
    await data
      .request()
      .input("directorio_id", sql.Int, directorio_id)
      .input("cliente_ruc", sql.Int, cliente_ruc)
      .input("admin_id", sql.Int, admin_id)
      .input("estado", sql.Bit, estado)
      .input("nombre", sql.VarChar, nombre)
      .input("tipo", sql.VarChar, tipo)
      .input("recurrencia", sql.VarChar, recurrencia)
      .input("fuente_cliente", sql.VarChar, fuente_cliente)
      .input("facturacion", sql.VarChar, facturacion)
      .input("margen", sql.VarChar, margen)
      .input("fecha_creacion", sql.DateTime, fecha_creacion)
      .input("fecha_modificacion", sql.DateTime, fecha_modificacion)
      .input("fecha_cierre", sql.DateTime, fecha_cierre)
      .input("fase", sql.VarChar, fase)
      .input("probabilidad", sql.VarChar, probabilidad)
      .input("ingresos_esperados", sql.VarChar, ingresos_esperados)
      .input("etapa", sql.VarChar, etapa)
      .input("codigo", sql.VarChar, codigo)
      .input("id", sql.Int, id)
      .query(query);
    addAudit("CP_TRATOS", "PUT /" + id, query, auth_user);
    return query;
  } catch (error) {
    throw error;
  }
};

export const removeDeal = async (id) => {
  try {
    const data = await dbConnection;
    if (!data.connected) {
      console.log("No se puede conectar a la base de datos");
    }
    const query = "DELETE FROM CP_TRATOS WHERE CPT_ID = @id";
    const result = await data.request().input("id", sql.Int, id).query(query);
    addAudit("CP_TRATOS", "DELETE /" + id, query, auth_user);
    return result;
  } catch (error) {
    throw error;
  }
};
