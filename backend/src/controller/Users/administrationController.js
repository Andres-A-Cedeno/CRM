import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addAdministration,
  getAdministrationsbyId,
  getAllAdministrations,
  removeAdministration,
  updateAdministration,
} from "../../module/Users/administrations.js";

export const get_administrations = async (req, res) => {
  try {
    const result = await getAllAdministrations();
    res.status(200).json(result.recordset);
    console.log("Administraciones obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_administration = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getAdministrationsbyId(id);
    res.status(200).json(result.recordset);
    console.log("Administraciones por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_administration = async (req, res) => {
  const { tipo_administracion, descripcion, estado } = req.body;
  try {
    const result = await addAdministration(
      tipo_administracion,
      descripcion,
      estado
    );
    res.status(200).json(result.recordset);
    console.log("Administracion creada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_administration = async (req, res) => {
  const { id } = req.params;
  const { tipo_administracion, descripcion, estado } = req.body;
  try {
    const result = await updateAdministration(
      tipo_administracion,
      descripcion,
      estado,
      id
    );
    res.status(200).json(result.recordset);
    console.log("Administracion actualizada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_administration = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeAdministration(id);
    res.status(200).json(result.recordset);
    console.log("Administracion eliminada por id obtenido con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
