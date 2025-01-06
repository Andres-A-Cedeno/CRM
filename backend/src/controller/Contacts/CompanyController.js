import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addCompany,
  getAllCompanies,
  getCompanybyId,
  removeCompany,
  updateCompany,
} from "../../module/Contacts/company.js";

export const get_companies = async (req, res) => {
  try {
    const result = await getAllCompanies();
    res.status(200).json(result.recordset);
    console.log("Empresas obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_company = async (req, res) => {
  const { ruc } = req.params;
  try {
    const result = await getCompanybyId(ruc);
    res.status(200).json(result.recordset);
    console.log("Empresa por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_company = async (req, res) => {
  const { ruc, menu_id, nombre } = req.body;
  try {
    const result = await addCompany(ruc, menu_id, nombre);
    res.status(200).json(result.recordset);
    console.log("Empresa creada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_company = async (req, res) => {
  const { ruc } = req.params;
  const { new_ruc, menu_id, nombre } = req.body;
  try {
    const result = await updateCompany(new_ruc, menu_id, nombre, ruc);
    res.status(200).json(result.recordset);
    console.log("Empresa actualizada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_company = async (req, res) => {
  const { ruc } = req.params;
  try {
    const result = await removeCompany(ruc);
    res.status(200).json(result.recordset);
    console.log("Empresa eliminada por id obtenido con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
