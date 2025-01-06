import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addServiceDeal,
  getAllServicesDeals,
  getServiceDealbyId,
  removeServiceDeal,
  updateServiceDeal,
} from "../../module/JoinTables/service_deal.js";

export const get_services_deals = async (req, res) => {
  try {
    const result = await getAllServicesDeals();
    res.status(200).json(result.recordset);
    console.log("Relaciones servicio trato obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_service_deal = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getServiceDealbyId(id);
    res.status(200).json(result.recordset);
    console.log("Relacion servicio trato por id obtenida con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_service_deal = async (req, res) => {
  const { id_producto, id_trato, estado } = req.body;
  try {
    const result = await addServiceDeal(id_producto, id_trato, estado);
    res.status(200).json(result.recordset);
    console.log("Relacion servicio trato creada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_service_deal = async (req, res) => {
  const { id } = req.params;
  const { id_producto, id_trato, estado } = req.body;
  try {
    const result = await updateServiceDeal(id_producto, id_trato, estado, id);
    res.status(200).json(result.recordset);
    console.log("Relacion servicio trato actualizada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_service_deal = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeServiceDeal(id);
    res.status(200).json(result.recordset);
    console.log("Relacion servicio trato eliminado por id con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
