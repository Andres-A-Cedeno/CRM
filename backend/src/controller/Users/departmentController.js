import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addDepartment,
  getAllDepartments,
  getDepartmentbyId,
  removeDepartment,
  updateDepartment,
} from "../../module/Users/departments.js";

export const get_departments = async (req, res) => {
  try {
    const result = await getAllDepartments();
    res.status(200).json(result.recordset);
    console.log("Departamentos obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_department = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getDepartmentbyId(id);
    res.status(200).json(result.recordset);
    console.log("Departamento por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_department = async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await addDepartment(nombre);
    res.status(200).json(result.recordset);
    console.log("Departamento creado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_department = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const result = await updateDepartment(nombre, id);
    res.status(200).json(result.recordset);
    console.log("Departamento actualizado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_department = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeDepartment(id);
    res.status(200).json(result.recordset);
    console.log("Departamento eliminado por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
