import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addMenu,
  getAllMenus,
  getMenubyId,
  removeMenu,
  updateMenu,
} from "../../module/Storage/menu.js";

export const get_menus = async (req, res) => {
  try {
    const result = await getAllMenus();
    res.status(200).json(result.recordset);
    console.log("menus obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_menu = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getMenubyId(id);
    res.status(200).json(result.recordset);
    console.log("menu por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_menu = async (req, res) => {
  const { estado, pestanas } = req.body;
  try {
    const result = await addMenu(estado, pestanas);
    res.status(200).json(result.recordset);
    console.log("menu creado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_menu = async (req, res) => {
  const { id } = req.params;
  const { pestanas, estado } = req.body;
  try {
    const result = await updateMenu(pestanas, estado, id);
    res.status(200).json(result.recordset);
    console.log("menu actualizado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_menu = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeMenu(id);
    res.status(200).json(result.recordset);
    console.log("menu eliminado por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
