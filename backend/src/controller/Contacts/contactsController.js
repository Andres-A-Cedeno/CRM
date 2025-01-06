import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  addContact,
  getAllContacts,
  getContactbyId,
  removeContact,
  updateContact,
} from "../../module/Contacts/contacts.js";

export const get_contacts = async (req, res) => {
  try {
    const result = await getAllContacts();
    res.status(200).json(result.recordset);
    console.log("Contactos obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_contact = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getContactbyId(id);
    res.status(200).json(result.recordset);
    console.log("Contacto obtenido por id con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_contact = async (req, res) => {
  const {
    nombre,
    apellido,
    cargo,
    correo,
    movil,
    telefono,
    dir_correspondencia,
    ciudad_correspondencia,
    pais_correspondencia,
    posible_cliente,
    estado,
  } = req.body;
  try {
    const result = await addContact(
      nombre,
      apellido,
      cargo,
      correo,
      movil,
      telefono,
      dir_correspondencia,
      ciudad_correspondencia,
      pais_correspondencia,
      posible_cliente,
      estado
    );
    res.status(200).json(result.recordset);
    console.log("contacto creado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_contact = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    cargo,
    correo,
    movil,
    telefono,
    dir_correspondencia,
    ciudad_correspondencia,
    pais_correspondencia,
    posible_cliente,
    estado,
  } = req.body;
  try {
    const result = await updateContact(
      nombre,
      apellido,
      cargo,
      correo,
      movil,
      telefono,
      dir_correspondencia,
      ciudad_correspondencia,
      pais_correspondencia,
      posible_cliente,
      estado,
      id
    );
    res.status(200).json(result.recordset);
    console.log("Contacto actualizado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_contact = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeContact(id);
    res.status(200).json(result.recordset);
    console.log("Contacto eliminado por id con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
