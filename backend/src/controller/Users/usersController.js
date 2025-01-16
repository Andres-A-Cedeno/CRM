import dbConnection from "../../config/sqlserver.js";
import sql from "mssql";
import {
  getAllUsers,
  getUserbyCI,
  AddUser,
  UpdateUser,
  RemoveUser,
  getAllNicknames,
  getAllEmails,
} from "../../module/Users/users.js";

export const get_users = async (req, res) => {
  try {
    const result = await getAllUsers();
    res.status(200).json(result.recordset);
    console.log("Usuarios obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const get_user = async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await getUserbyCI(cedula);
    res.status(200).json(result.recordset);
    console.log("Usuarios por ci obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const new_user = async (req, res) => {
  const {
    cedula,
    nombre,
    apellido,
    estado,
    nickname,
    correo,
    contrasena,
    rol_id,
    dep_id,
  } = req.body;
  try {
    const result = await AddUser(
      cedula,
      nombre,
      apellido,
      estado,
      nickname,
      correo,
      contrasena,
      rol_id,
      dep_id
    );
    res.status(200).json(result.recordset);
    console.log("Usuario creado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const update_user = async (req, res) => {
  const { cedula } = req.params;
  const {
    new_ci,
    nombre,
    apellido,
    estado,
    nickname,
    correo,
    contrasena,
    rol_id,
    dep_id,
  } = req.body;
  try {
    const result = await UpdateUser(
      new_ci,
      nombre,
      apellido,
      estado,
      nickname,
      correo,
      contrasena,
      rol_id,
      dep_id,
      cedula
    );
    res.status(200).json(result.recordset);
    console.log("Usuario actualizado");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const remove_user = async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await RemoveUser(cedula);
    res.status(200).json(result.recordset);
    console.log("Usuarios eliminado por ci obtenido con exito: ");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const nickname_list = async (req, res) => {
  try {
    const { nickname } = req.params;
    const result = await getAllNicknames(nickname);
    res.status(200).json(result.recordset);
    console.log("Usuarios obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};

export const email_list = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await getAllEmails(email);
    res.status(200).json(result.recordset);
    console.log("Usuarios obtenidos con exito");
  } catch (err) {
    res.status(500).send("error en controlador" + err.message);
    console.log(err);
  }
};
