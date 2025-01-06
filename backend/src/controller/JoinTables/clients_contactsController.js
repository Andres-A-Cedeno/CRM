import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addClientsContacts,
  getAllClientsContacts,
  getClientsContactsbyId,
  removeClientsContacts,
  updateClientsContacts,
} from "../../module/JoinTables/clients_contacts.js";

export const get_clients_contacts = async (req, res) => {
  try {
    const result = await getAllClientsContacts();
    res.status(200).json(result.recordset);
    console.log("Relaciones clientes contactos obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_client_contact = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getClientsContactsbyId(id);
    res.status(200).json(result.recordset);
    console.log("Relacion cliente contacto por id obtenida con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_client_contact = async (req, res) => {
  const { cliente_ruc, contacto_id } = req.body;
  try {
    const result = await addClientsContacts(cliente_ruc, contacto_id);
    res.status(200).json(result.recordset);
    console.log("Relacion cliente contacto creada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_client_contact = async (req, res) => {
  const { id } = req.params;
  const { cliente_ruc, contacto_id } = req.body;
  try {
    const result = await updateClientsContacts(cliente_ruc, contacto_id, id);
    res.status(200).json(result.recordset);
    console.log("Relacion cliente contacto actualizada");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_client_contact = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeClientsContacts(id);
    res.status(200).json(result.recordset);
    console.log(
      "Relacion cliente contacto eliminado por id obtenido con exito: "
    );
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
