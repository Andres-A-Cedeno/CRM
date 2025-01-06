import express from "express";
import {
  get_rol,
  get_roles,
  new_rol,
  remove_rol,
  update_rol,
} from "../../controller/Users/rolesController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     rol_variables:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre delrol
 *           example: Nombre
 *         estado:
 *           type: bit
 *           description: Estado de uso de la tabla
 *           example: True
 *     roles:
 *       type: object
 *       properties:
 *         CPR_ID:
 *           type: integer
 *           description: ID del rol.
 *           example: 0000000000
 *         CPR_NOMBRE:
 *           type: string
 *           description: Nombre del rol.
 *           example: Nombre
 *         CPR_ESTADO:
 *           type: bit
 *           description: Estado de uso de la tabla
 *           example: True
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Solicita todos los roles
 *     tags:
 *       - usuarios
 *     description: Se seleccionan todos los roles.
 *     responses:
 *       200:
 *         description: Una lista de todos los roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/roles'
 */

router.get("/roles", get_roles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Consigue un solo rol por su id.
 *     tags:
 *       - usuarios
 *     description: Contiene toda la informacion correspondiente a un solo rol por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id del rol
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un solo rol.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/roles'
 */

router.get("/roles/:id", get_rol);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crea un nuevo rol
 *     tags:
 *       - usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/rol_variables'
 *     responses:
 *       200:
 *         description: Rol creado
 */

router.post("/roles", new_rol);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: edita un rol
 *     tags:
 *       - usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id de roles.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/rol_variables'
 *     responses:
 *       200:
 *         description: Rol modificado
 */

router.put("/roles/:id", update_rol);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Elimina un rol
 *     tags:
 *       - usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero id del rol.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de un rol el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de rol.
 */

router.delete("/roles/:id", remove_rol);

export default router;
