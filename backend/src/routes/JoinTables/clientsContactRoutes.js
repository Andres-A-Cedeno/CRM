import express from "express";
import {
  get_client_contact,
  get_clients_contacts,
  new_client_contact,
  remove_client_contact,
  update_client_contact,
} from "../../controller/JoinTables/clients_contactsController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     clientes-contactos_variables:
 *       type: object
 *       properties:
 *         cliente_ruc:
 *           type: integer
 *           description: ruc del cliente
 *           example: 0
 *         contacto_id:
 *           type: integer
 *           description: id del contacto
 *           example: 0
 *     clientes-contactos:
 *       type: object
 *       properties:
 *         CPC_NOMBRE_CLIENTE:
 *           type: string
 *           description: nombre del cliente dentro del contacto.
 *           example: cliente
 *         CPCO_NOMBRE:
 *           type: string
 *           description: nombre del contacto que incluye el cliente.
 *           example: contacto
 */

/**
 * @swagger
 * /api/clientes-contactos:
 *   get:
 *     summary: Solicita la tabla intermedia clientes-contactos
 *     tags:
 *       - JoinTables
 *     responses:
 *       200:
 *         description: Una lista de todas las relaciones clientes-contactos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/clientes-contactos'
 */

router.get("/clientes-contactos", get_clients_contacts);

/**
 * @swagger
 * /api/clientes-contactos/{id}:
 *   get:
 *     summary: Consigue una sola relacion de clientes-contactos por su id.
 *     tags:
 *       - JoinTables
 *     description: Contiene toda la informacion correspondiente a una sola relacion clientes-contactos por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id de la relacion clientes-contactos
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Una sola relacion clientes-contactos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/clientes-contactos'
 */

router.get("/clientes-contactos/:id", get_client_contact);

/**
 * @swagger
 * /api/clientes-contactos:
 *   post:
 *     summary: Crea una nueva relacion clientes-contactos
 *     tags:
 *       - JoinTables
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/clientes-contactos_variables'
 *     responses:
 *       200:
 *         description: relacion clientes-contactos creado
 */

router.post("/clientes-contactos", new_client_contact);

/**
 * @swagger
 * /api/clientes-contactos/{id}:
 *   put:
 *     summary: edita una relacion clientes-contactos
 *     tags:
 *       - JoinTables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id de la relacion clientes-contactos
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/clientes-contactos_variables'
 *     responses:
 *       200:
 *         description: relacion clientes-contactos modificado
 */

router.put("/clientes-contactos/:id", update_client_contact);

/**
 * @swagger
 * /api/clientes-contactos/{id}:
 *   delete:
 *     summary: Elimina una relacion clientes-contactos
 *     tags:
 *       - JoinTables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero id de la relacion clientes-contactos.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de una relacion clientes-contactos el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de una relacion clientes-contactos.
 */

router.delete("/clientes-contactos/:id", remove_client_contact);

export default router;
