import express from "express";
import {
  get_files_route,
  get_files_routes,
  new_files_route,
  remove_files_route,
  update_files_route,
} from "../../controller/Storage/files_routesController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     rutas_archivos_variables:
 *       type: object
 *       properties:
 *         dir_id:
 *           type: integer
 *           description: id de la ruta de archivos
 *           example: 0
 *         ruta:
 *           type: string
 *           description: ruta del archivo.
 *           example: '//xxxxx/xxxxx/xxxxx.doc'
 *         nombre:
 *           type: string
 *           description: Denominacion para la ruta
 *           example: Nombre
 *         fecha_subida:
 *           type: dateTime
 *           description: Fecha en la que subio el archivo.
 *           example: 2020/12/31
 *         tipo_archivo:
 *           type: string
 *           description: Formato del archivo.
 *           example: doc
 *         estado:
 *           type: bit
 *           description: Estado de la tabla.
 *           example: True
 *     rutas_archivos:
 *       type: object
 *       properties:
 *         CPRA_ID:
 *           type: integer
 *           description: Id de la ruta.
 *           example: 0
 *         CPRA_RUTA:
 *           type: bit
 *           description: Ruta del archivo.
 *           example: True
 *         CPRA_NOMBRE:
 *           type: string
 *           description: CPA_NOMBRE.
 *           example: nombre de la ruta
 *         CPRA_FECHA_SUBIDA:
 *           type: datetime
 *           description: fecha en la que se subio la ruta
 *           example: aaaa/mm/dd
 *         CPRA_TIPO_ARCHIVO:
 *           type: string
 *           description: tipo de archivo que se subio.
 *           example: .doc
 *         CPRA_ESTADO:
 *           type: string
 *           description: estado de la tabla.
 *           example: True
 *         CPA_NOMBRE:
 *           type: string
 *           description: Nombre del directorio.
 *           example: Nombre
 */

/**
 * @swagger
 * /api/rutas-archivos:
 *   get:
 *     summary: Solicita todas las rutas de los archivos
 *     tags:
 *       - almacenamiento
 *     responses:
 *       200:
 *         description: Una lista de todas las rutas de los archivos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/rutas_archivos'
 */

router.get("/rutas-archivos", get_files_routes);

/**
 * @swagger
 * /api/rutas-archivos/{id}:
 *   get:
 *     summary: Consigue una sola ruta de archivos por su id.
 *     tags:
 *       - almacenamiento
 *     description: Contiene toda la informacion correspondiente a una sola rutas de archivos por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id de la ruta de archivos
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Una sola ruta de archivos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/rutas_archivos'
 */

router.get("/rutas-archivos/:id", get_files_route);

/**
 * @swagger
 * /api/rutas-archivos:
 *   post:
 *     summary: Crea una nueva ruta de archivos
 *     tags:
 *       - almacenamiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/rutas_archivos_variables'
 *     responses:
 *       200:
 *         description: ruta de archivos creado
 */

router.post("/rutas-archivos", new_files_route);

/**
 * @swagger
 * /api/rutas-archivos/{id}:
 *   put:
 *     summary: edita una ruta de archivos
 *     tags:
 *       - almacenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id de la ruta de archivos
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/rutas_archivos_variables'
 *     responses:
 *       200:
 *         description: ruta de archivos modificado
 */

router.put("/rutas-archivos/:id", update_files_route);

/**
 * @swagger
 * /api/rutas-archivos/{id}:
 *   delete:
 *     summary: Elimina una ruta de archivos
 *     tags:
 *       - almacenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero id de la ruta de archivos
 *         schema:
 *           type: integer
 *     description: Elimina el registro de un rutas-archivos el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de un rutas-archivos.
 */

router.delete("/rutas-archivos/:id", remove_files_route);

export default router;
