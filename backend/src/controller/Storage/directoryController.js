import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addAddress,
  getAddresbyId,
  getAllAddress,
  removeAddres,
  updateAddres,
} from "../../module/Storage/directory.js";

export const get_directory = async (req, res) => {
  try {
    const result = await getAllAddress();
    res.status(200).json(result.recordset);
    console.log("Direcciones obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_address = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getAddresbyId(id);
    res.status(200).json(result.recordset);
    console.log("Direccion por id obtenida con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_addres = async (req, res) => {
  const { fecha_creacion, id_padre, nombre, orden } = req.body;
  try {
    const result = await addAddress(fecha_creacion, id_padre, nombre, orden);
    res.status(200).json(result.recordset);
    console.log("Direccion creada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_address = async (req, res) => {
  const { id } = req.params;
  const { fecha_creacion, id_padre, nombre, orden } = req.body;
  try {
    const result = await updateAddres(
      fecha_creacion,
      id_padre,
      nombre,
      orden,
      id
    );
    res.status(200).json(result.recordset);
    console.log("Direccion actualizada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_address = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeAddres(id);
    res.status(200).json(result.recordset);
    console.log("Direccion eliminado por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
