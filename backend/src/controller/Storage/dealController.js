import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addDeal,
  getAllDeals,
  getDealbyId,
  removeDeal,
  updateDeal,
} from "../../module/Storage/deals.js";

export const get_deals = async (req, res) => {
  try {
    const result = await getAllDeals();
    res.status(200).json(result.recordset);
    console.log("Tratos obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_deal = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getDealbyId(id);
    res.status(200).json(result.recordset);
    console.log("Trato por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_deal = async (req, res) => {
  const {
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
  } = req.body;
  try {
    const result = await addDeal(
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
    );
    res.status(200).json(result.recordset);
    console.log("Trato creado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_deal = async (req, res) => {
  const { id } = req.params;
  const {
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
  } = req.body;
  try {
    const result = await updateDeal(
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
    );
    res.status(200).json(result.recordset);
    console.log("Trato actualizado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_deal = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeDeal(id);
    res.status(200).json(result.recordset);
    console.log("Trato eliminado por id obtenido con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
