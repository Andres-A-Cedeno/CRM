import express from "express";
import {
  get_service_deal,
  get_services_deals,
  new_service_deal,
  remove_service_deal,
  update_service_deal,
} from "../../controller/JoinTables/serviceDealController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     servicios-tratos_variables:
 *       type: object
 *       properties:
 *         id_producto:
 *           type: integer
 *           description: id del producto o servicio
 *           example: 0
 *         id_trato:
 *           type: integer
 *           description: id del trato
 *           example: 0
 *         estado:
 *           type: bit
 *           description: Estado de la tabla.
 *           example: True
 *     servicios-tratos:
 *       type: object
 *       properties:
 *         CPPS_NOMBRE_PRODUCTO:
 *           type: string
 *           description: nombre del producto dentro del trato.
 *           example: producto
 *         CPT_NOMBRE_TRATO:
 *           type: string
 *           description: nombre del trato que incluye el producto.
 *           example: trato
 *         CPM_ESTADO:
 *           type: bit
 *           description: Estado de la tabla.
 *           example: True
 */

/**
 * @swagger
 * /api/servicios-tratos:
 *   get:
 *     summary: Solicita la tabla intermedia servicios - tratos
 *     tags:
 *       - JoinTables
 *     responses:
 *       200:
 *         description: Una lista de todas las relaciones servicios - tratos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/servicios-tratos'
 */

router.get("/servicios-tratos", get_services_deals);

/**
 * @swagger
 * /api/servicios-tratos/{id}:
 *   get:
 *     summary: Consigue una sola relacion de servicios-tratos por su id.
 *     tags:
 *       - JoinTables
 *     description: Contiene toda la informacion correspondiente a una sola relacion servicios-tratos por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id de la relacion servicios-tratos
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Una sola relacion servicios-tratos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/servicios-tratos'
 */

router.get("/servicios-tratos/:id", get_service_deal);

/**
 * @swagger
 * /api/servicios-tratos:
 *   post:
 *     summary: Crea una nueva relacion servicios-tratos
 *     tags:
 *       - JoinTables
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/servicios-tratos_variables'
 *     responses:
 *       200:
 *         description: relacion servicios-tratos creado
 */

router.post("/servicios-tratos", new_service_deal);

/**
 * @swagger
 * /api/servicios-tratos/{id}:
 *   put:
 *     summary: edita una relacion servicios-tratos
 *     tags:
 *       - JoinTables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id de la relacion servicios-tratos
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/servicios-tratos_variables'
 *     responses:
 *       200:
 *         description: relacion servicios-tratos modificado
 */

router.put("/servicios-tratos/:id", update_service_deal);

/**
 * @swagger
 * /api/servicios-tratos/{id}:
 *   delete:
 *     summary: Elimina una relacion servicios-tratos
 *     tags:
 *       - JoinTables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero id de la relacion servicios-tratos.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de una relacion servicios-tratos el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de una relacion servicios-tratos.
 */

router.delete("/servicios-tratos/:id", remove_service_deal);

export default router;
