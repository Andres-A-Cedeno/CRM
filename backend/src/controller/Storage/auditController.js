import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addAudit,
  getAllAudits,
  getAuditbyId,
} from "../../module/Storage/audit.js";

export const get_audits = async (req, res) => {
  try {
    const result = await getAllAudits();
    res.status(200).json(result.recordset);
    console.log("auditorias obtenidas con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_audit = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getAuditbyId(id);
    res.status(200).json(result.recordset);
    console.log("auditoria por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_audit = async (tabla, accion, sentencia, usuario_ci) => {
  try {
    const result = await addAudit(tabla, accion, sentencia, usuario_ci);
    res.status(200).json(result.recordset);
    console.log("auditoria creada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
