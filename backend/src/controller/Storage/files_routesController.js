import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addFileRoute,
  getAllFileRoutes,
  getFileRoutebyId,
  removeFileRoute,
  updateFileRoute,
} from "../../module/Storage/files_routes.js";

export const get_files_routes = async (req, res) => {
  try {
    const result = await getAllFileRoutes();
    res.status(200).json(result.recordset);
    console.log("Rutas de Archivo obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_files_route = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getFileRoutebyId(id);
    res.status(200).json(result.recordset);
    console.log("Rutas de archivos por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_files_route = async (req, res) => {
  const { dir_id, ruta, nombre, fecha_subida, tipo_archivo, estado } = req.body;
  try {
    const result = await addFileRoute(
      dir_id,
      ruta,
      nombre,
      fecha_subida,
      tipo_archivo,
      estado
    );
    res.status(200).json(result.recordset);
    console.log("Rutas de archivos creada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_files_route = async (req, res) => {
  const { id } = req.params;
  const { dir_id, ruta, nombre, fecha_subida, tipo_archivo, estado } = req.body;
  try {
    const result = await updateFileRoute(
      dir_id,
      ruta,
      nombre,
      fecha_subida,
      tipo_archivo,
      estado,
      id
    );
    res.status(200).json(result.recordset);
    console.log("Ruta de archivos actualizada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_files_route = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeFileRoute(id);
    res.status(200).json(result.recordset);
    console.log("Ruta de archivos eliminada por id con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
