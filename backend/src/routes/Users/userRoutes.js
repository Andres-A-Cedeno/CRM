import {
  get_users,
  get_user,
  new_user,
  update_user,
  remove_user,
  nickname_list,
  email_list,
} from "../../controller/Users/usersController.js";
import express, { Router } from "express";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     usuario_variables:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de usuario
 *           example: Nombre
 *         apellido:
 *           type: string
 *           description: Apellido de usuario
 *           example: Apellido
 *         estado:
 *           type: bit
 *           description: Estado de uso de la tabla
 *           example: True
 *         nickname:
 *           type: string
 *           description: Nombre-Apodo de usuario
 *           example: Nickname
 *         correo:
 *           type: string
 *           description: Correo del usuario
 *           example: ejemplo@inveligent.com
 *         contrasena:
 *           type: string
 *           description: Contrasena del usuario
 *           example: contrasena
 *         rol_id:
 *           type: integer
 *           description: id de rol
 *           example: 0
 *         dep_id:
 *           type: integer
 *           description: id de departamento
 *           example: 0
 *     nuevo_usuario:
 *       allOf:
 *         - type: object
 *           properties:
 *             cedula:
 *               type: integer
 *               description: cedula del usuario.
 *               example: 0
 *         - $ref: '#/components/schemas/usuario_variables'
 *     edit_usuario:
 *       allOf:
 *         - type: object
 *           properties:
 *             new_ci:
 *               type: integer
 *               description: cedula del usuario.
 *               example: 0
 *         - $ref: '#/components/schemas/usuario_variables'
 *     usuario:
 *       type: object
 *       properties:
 *         CPU_CEDULA:
 *           type: integer
 *           description: Cedula del usuario.
 *           example: 0000000000
 *         CPU_NOMBRE:
 *           type: string
 *           description: Nombre de usuario
 *           example: Nombre
 *         CPU_APELLIDO:
 *           type: string
 *           description: Apellido de usuario
 *           example: Apellido
 *         CPU_ESTADO:
 *           type: bit
 *           description: Estado de uso de la tabla
 *           example: True
 *         CPU_NICKNAME:
 *           type: string
 *           description: Nombre-Apodo de usuario
 *           example: Nickname
 *         CPU_CORREO:
 *           type: string
 *           description: Correo del usuario
 *           example: ejemplo@inveligent.com
 *         CPR_NOMBRE:
 *           type: string
 *           description: Nombre del rol del usuario
 *           example: ADMIN
 *         CPD_NOMBRE:
 *           type: string
 *           description: Nombre del departamento del usuario
 *           example: Software
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Solicita todos los usuarios
 *     tags:
 *       - usuarios
 *     description: Contiene una fk para roles y otra para el departamento al que pertenece.
 *     responses:
 *       200:
 *         description: Una lista de todos los usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/usuario'
 */

router.get("/usuarios", get_users);

/**
 * @swagger
 * /api/usuarios/{cedula}:
 *   get:
 *     summary: Consigue un solo usuario por su nro de cedula.
 *     tags:
 *       - usuarios
 *     description: Contiene toda la informacion correspondiente a un solo usuario por solicitud.
 *     parameters:
 *       - in: path
 *         name: cedula
 *         required: true
 *         description: Numero de cedula del usuario.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un solo usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/usuario'
 */

router.get("/usuarios/:cedula", get_user);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/nuevo_usuario'
 *     responses:
 *       200:
 *         description: Usuario creado
 */

router.post("/usuarios", new_user);

/**
 * @swagger
 * /api/usuarios/{cedula}:
 *   put:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - usuarios
 *     parameters:
 *       - in: path
 *         name: cedula
 *         required: true
 *         description: Numero de cedula del usuario.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/edit_usuario'
 *     responses:
 *       200:
 *         description: Usuario creado
 */

router.put("/usuarios/:cedula", update_user);

/**
 * @swagger
 * /api/usuarios/{cedula}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags:
 *       - usuarios
 *     parameters:
 *       - in: path
 *         name: cedula
 *         required: true
 *         description: Numero de cedula del usuario.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de un usuario el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de usuario.
 */

router.delete("/usuarios/:cedula", remove_user);

router.get("/usuarios-list/:nickname", nickname_list);

router.get("/email-list/:email", email_list);

export default router;
