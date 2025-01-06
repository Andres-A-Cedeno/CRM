import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addRol,
  getAllRoles,
  getRolbyId,
  removeRol,
  updateRol,
} from "../../module/Users/roles.js";

export const get_roles = async (req, res) => {
  try {
    const result = await getAllRoles();
    res.status(200).json(result.recordset);
    console.log("roles obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_rol = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getRolbyId(id);
    res.status(200).json(result.recordset);
    console.log("Rol por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_rol = async (req, res) => {
  const { nombre, estado } = req.body;
  try {
    const result = await addRol(nombre, estado);
    res.status(200).json(result.recordset);
    console.log("Rol creado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_rol = async (req, res) => {
  const { id } = req.params;
  const { nombre, estado } = req.body;
  try {
    const result = await updateRol(nombre, estado, id);
    res.status(200).json(result.recordset);
    console.log("Rol actualizado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_rol = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeRol(id);
    res.status(200).json(result.recordset);
    console.log("Rol eliminado por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
