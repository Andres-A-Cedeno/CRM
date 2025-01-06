import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addCompanyUser,
  getAllCompanyUsers,
  getCompanyUsersbyId,
  removeCompanyUser,
  updateCompanyUser,
} from "../../module/JoinTables/company_users.js";

export const get_company_users = async (req, res) => {
  try {
    const result = await getAllCompanyUsers();
    res.status(200).json(result.recordset);
    console.log("Relaciones empresa usuario obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_company_user = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getCompanyUsersbyId(id);
    res.status(200).json(result.recordset);
    console.log("Relacion empresa usuario por id obtenida con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_company_user = async (req, res) => {
  const { empresa_ruc, usuario_ci } = req.body;
  try {
    const result = await addCompanyUser(empresa_ruc, usuario_ci);
    res.status(200).json(result.recordset);
    console.log("Relacion empresa usuario creada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_company_user = async (req, res) => {
  const { id } = req.params;
  const { empresa_ruc, usuario_ci } = req.body;
  try {
    const result = await updateCompanyUser(empresa_ruc, usuario_ci, id);
    res.status(200).json(result.recordset);
    console.log("Relacion empresa usuario actualizada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_company_user = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeCompanyUser(id);
    res.status(200).json(result.recordset);
    console.log("Relacion empresa usuario eliminado por id con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
