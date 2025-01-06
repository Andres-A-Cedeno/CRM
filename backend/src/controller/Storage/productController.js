import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addProduct,
  getAllProducts,
  getProductbyId,
  removeProduct,
  updateProduct,
} from "../../module/Storage/products_services.js";

export const get_products = async (req, res) => {
  try {
    const result = await getAllProducts();
    res.status(200).json(result.recordset);
    console.log("productos obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_product = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getProductbyId(id);
    res.status(200).json(result.recordset);
    console.log("producto por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_product = async (req, res) => {
  const { nombre, tipo, admin_id } = req.body;
  try {
    const result = await addProduct(nombre, tipo, admin_id);
    res.status(200).json(result.recordset);
    console.log("producto creado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_product = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, admin_id } = req.body;
  try {
    const result = await updateProduct(nombre, tipo, admin_id, id);
    res.status(200).json(result.recordset);
    console.log("producto actualizado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_product = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeProduct(id);
    res.status(200).json(result.recordset);
    console.log("producto eliminado por id obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
