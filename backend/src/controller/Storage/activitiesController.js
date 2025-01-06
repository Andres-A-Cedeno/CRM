import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  AddActivity,
  getActivitybyId,
  getAllActivities,
  removeActivity,
  UpdateActivity,
} from "../../module/Storage/activities.js";

export const get_activities = async (req, res) => {
  try {
    const result = await getAllActivities();
    res.status(200).json(result.recordset);
    console.log("Rutas de Archivo obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_activity = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getActivitybyId(id);
    res.status(200).json(result.recordset);
    console.log("Rutas de archivos por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_activity = async (req, res) => {
  const {
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
  } = req.body;
  try {
    const result = await AddActivity(
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
    );
    res.status(200).json(result.recordset);
    console.log("Rutas de archivos creada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_activity = async (req, res) => {
  const { id } = req.params;
  const {
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
  } = req.body;
  try {
    const result = await UpdateActivity(
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
    );
    res.status(200).json(result.recordset);
    console.log("Ruta de archivos actualizada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_activity = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeActivity(id);
    res.status(200).json(result.recordset);
    console.log("Ruta de archivos eliminada por id con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
