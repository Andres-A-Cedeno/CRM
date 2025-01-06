import {
  get_administration,
  get_administrations,
  new_administration,
  remove_administration,
  update_administration,
} from "../../controller/Users/administrationController.js";

import express from "express";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     admin_variables:
 *       type: object
 *       properties:
 *         tipo_administracion:
 *           type: string
 *           description: Nombre del tipo de administracion
 *           example: Nombre
 *         descripcion:
 *           type: string
 *           description: Descripcion de la administracion
 *           example: Nombre
 *         estado:
 *           type: bit
 *           description: Estado de uso de la tabla
 *           example: True
 *     administraciones:
 *       type: object
 *       properties:
 *         CPAD_ID:
 *           type: integer
 *           description: ID de la administracion.
 *           example: 0000000000
 *         CPAD_TIPO_ADMINISTRACION:
 *           type: string
 *           description: Nombre del tipo de administracion.
 *           example: Nombre de administracion
 *         CPAD_DESCRIPCION:
 *           type: string
 *           description: descripcion de la administracion.
 *           example: administracion
 *         CPAD_ESTADO:
 *           type: bit
 *           description: Estado de uso de la tabla
 *           example: True
 */

/**
 * @swagger
 * /api/administraciones:
 *   get:
 *     summary: Solicita todas las administraciones
 *     tags:
 *       - usuarios
 *     responses:
 *       200:
 *         description: Una lista de todas las administraciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/administraciones'
 */

router.get("/administraciones", get_administrations);

/**
 * @swagger
 * /api/administraciones/{id}:
 *   get:
 *     summary: Consigue una sola administracion por su id.
 *     tags:
 *       - usuarios
 *     description: Contiene toda la informacion correspondiente a una sola administracion por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id de la administracion
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Una sola administracion.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/administraciones'
 */

router.get("/administraciones/:id", get_administration);

/**
 * @swagger
 * /api/administraciones:
 *   post:
 *     summary: Crea una nueva administracion
 *     tags:
 *       - usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/admin_variables'
 *     responses:
 *       200:
 *         description: administracion creada
 */

router.post("/administraciones", new_administration);

/**
 * @swagger
 * /api/administraciones/{id}:
 *   put:
 *     summary: edita una administracion
 *     tags:
 *       - usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id de administracion.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/admin_variables'
 *     responses:
 *       200:
 *         description: administraciones modificado
 */

router.put("/administraciones/:id", update_administration);

/**
 * @swagger
 * /api/administraciones/{id}:
 *   delete:
 *     summary: Elimina una administracion
 *     tags:
 *       - usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero id de la administracion.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de una administracion la cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de administracion.
 */

router.delete("/administraciones/:id", remove_administration);

export default router;
