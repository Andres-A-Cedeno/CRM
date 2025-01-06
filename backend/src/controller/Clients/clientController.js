import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";

import {
  AddClient,
  getAllClients,
  getClientbyId,
  removeClient,
  UpdateClient,
} from "../../module/Clients/clients.js";

export const get_clients = async (req, res) => {
  try {
    const result = await getAllClients();
    res.status(200).json(result.recordset);
    console.log("Clientes obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_client = async (req, res) => {
  const { ci_ruc } = req.params;
  try {
    const result = await getClientbyId(ci_ruc);
    res.status(200).json(result.recordset);
    console.log("Cliente por ci_ruc obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_client = async (req, res) => {
  const {
    ci_ruc,
    nombre,
    tipo,
    sector,
    dir_fact,
    ciudad_fact,
    pais_fact,
    dir_envio,
    ciudad_envio,
    pais_envio,
    estado,
    cedula_fk,
    admin_fk,
  } = req.body;
  try {
    const result = await AddClient(
      ci_ruc,
      nombre,
      tipo,
      sector,
      dir_fact,
      ciudad_fact,
      pais_fact,
      dir_envio,
      ciudad_envio,
      pais_envio,
      estado,
      cedula_fk,
      admin_fk
    );
    res.status(200).json(result.recordset);
    console.log("Cliente creado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
+9;
export const update_client = async (req, res) => {
  const { ci_ruc } = req.params;
  const {
    new_ci_ruc,
    nombre,
    tipo,
    sector,
    dir_fact,
    ciudad_fact,
    pais_fact,
    dir_envio,
    ciudad_envio,
    pais_envio,
    estado,
    cedula_fk,
    admin_fk,
  } = req.body;
  try {
    const result = await UpdateClient(
      new_ci_ruc,
      nombre,
      tipo,
      sector,
      dir_fact,
      ciudad_fact,
      pais_fact,
      dir_envio,
      ciudad_envio,
      pais_envio,
      estado,
      cedula_fk,
      admin_fk,
      ci_ruc
    );
    res.status(200).json(result.recordset);
    console.log("Cliente actualizado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_client = async (req, res) => {
  const { ci_ruc } = req.params;
  try {
    const result = await removeClient(ci_ruc);
    res.status(200).json(result.recordset);
    console.log("Clientes eliminado por ci_ruc obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
