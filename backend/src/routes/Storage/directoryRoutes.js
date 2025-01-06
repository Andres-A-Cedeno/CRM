import express from "express";
import {
  get_address,
  get_directory,
  new_addres,
  remove_address,
  update_address,
} from "../../controller/Storage/directoryController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     directorio_variables:
 *       type: object
 *       properties:
 *         fecha_creacion:
 *           type: dateTime
 *           description: fecha de creacion del directorio
 *           example: 2020/12/31
 *         id_padre:
 *           type: integer
 *           description: Id padre del directorio.
 *           example: 0
 *         nombre:
 *           type: string
 *           description: Nombre del directorio.
 *           example: nombre
 *         orden:
 *           type: integer
 *           description: Orden del directorio.
 *           example: 0
 *     directorio:
 *       type: object
 *       properties:
 *         CPA_ID:
 *           type: integer
 *           description: Id del directorio.
 *           example: 0
 *         CPA_FECHA_CREACION:
 *           type: DateTime
 *           description: Fecha de creacion de la tabla.
 *           example: 2020/12/31
 *         CPA_ID_PADRE:
 *           type: integer
 *           description: id padre del directorio.
 *           example: 0
 *         CPA_NOMBRE:
 *           type: string
 *           description: nombre del directorio.
 *           example: Nombre
 *         CPA_ORDEN:
 *           type: integer
 *           description: orden del directorio.
 *           example: window1, window2
 */

/**
 * @swagger
 * /api/directorio:
 *   get:
 *     summary: Solicita todos los directorios
 *     tags:
 *       - almacenamiento
 *     responses:
 *       200:
 *         description: Una lista de todos los directorios.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/directorio'
 */

router.get("/directorio", get_directory);

/**
 * @swagger
 * /api/directorio/{id}:
 *   get:
 *     summary: Consigue un solo directorio por su id.
 *     tags:
 *       - almacenamiento
 *     description: Contiene toda la informacion correspondiente a un solo directorio por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id del directorio
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un solo directorio.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/directorio'
 */

router.get("/directorio/:id", get_address);

/**
 * @swagger
 * /api/directorio:
 *   post:
 *     summary: Crea un nuevo directorio
 *     tags:
 *       - almacenamiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/directorio_variables'
 *     responses:
 *       200:
 *         description: directorio creado
 */

router.post("/directorio", new_addres);

/**
 * @swagger
 * /api/directorio/{id}:
 *   put:
 *     summary: edita un directorio
 *     tags:
 *       - almacenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id del directorio
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/directorio_variables'
 *     responses:
 *       200:
 *         description: menu modificado
 */

router.put("/directorio/:id", update_address);

/**
 * @swagger
 * /api/directorio/{id}:
 *   delete:
 *     summary: Elimina un directorio
 *     tags:
 *       - almacenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero id del directorio.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de un directorio el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de un directorio.
 */

router.delete("/directorio/:id", remove_address);

export default router;
