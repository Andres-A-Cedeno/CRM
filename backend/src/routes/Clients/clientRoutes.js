import express from "express";
import {
  get_client,
  get_clients,
  new_client,
  remove_client,
  update_client,
} from "../../controller/Clients/clientController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     clientes_variables:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de cliente.
 *           example: Nombre
 *         tipo:
 *           type: string
 *           description: Tipo de cliente.
 *           example: Tipo cliente
 *         sector:
 *           type: string
 *           description: Sector del cliente
 *           example: Sector
 *         dir_fact:
 *           type: string
 *           description: direccion de facturacion del cliente.
 *           example: dir facturacion
 *         ciudad_fact:
 *           type: string
 *           description: Ciudad de facturacion del cliente.
 *           example: ciudad facturacion
 *         pais_fact:
 *           type: string
 *           description: Pais de facturacion del cliente.
 *           example: pais facturacion
 *         dir_envio:
 *           type: string
 *           description: direccion de envio del cliente.
 *           example: direccion envio
 *         ciudad_envio:
 *           type: string
 *           description: Ciudad de envio del cliente.
 *           example: ciudad envio
 *         pais_envio:
 *           type: string
 *           description: Pais de envio del cliente.
 *           example: pais envio
 *         estado:
 *           type: bit
 *           description: Estado de la tabla
 *           example: True
 *         cedula_fk:
 *           type: integer
 *           description: cedula en tabla usuario del cliente.
 *           example: 0
 *         admin_fk:
 *           type: integer
 *           description: id administracion del cliente.
 *           example: 0
 *     nuevo_cliente:
 *       allOf:
 *         - type: object
 *           properties:
 *             ci_ruc:
 *               type: integer
 *               description: cedula / ruc del cliente.
 *               example: 0
 *         - $ref: '#/components/schemas/clientes_variables'
 *     edit_cliente:
 *       allOf:
 *         - type: object
 *           properties:
 *             new_ci_ruc:
 *               type: integer
 *               description: cedula / ruc del cliente.
 *               example: 0
 *         - $ref: '#/components/schemas/clientes_variables'
 *     clientes:
 *       type: object
 *       properties:
 *         CPC_CI_RUC:
 *           type: integer
 *           description: Cedula / RUC del cliente.
 *           example: 0
 *         CPC_NOMBRE_CLIENTE:
 *           type: string
 *           description: Nombre de cliente.
 *           example: Nombre
 *         CPC_TIPOCLIENTE:
 *           type: string
 *           description: Tipo de cliente.
 *           example: Tipo cliente
 *         CPC_SECTOR:
 *           type: string
 *           description: Sector del cliente
 *           example: Sector
 *         CPC_DIR_FACTURACION:
 *           type: string
 *           description: direccion de facturacion del cliente.
 *           example: dir facturacion
 *         CPC_CIUDAD_FACTURACION:
 *           type: string
 *           description: Ciudad de facturacion del cliente.
 *           example: ciudad facturacion
 *         CPC_PAIS_FACTURACION:
 *           type: string
 *           description: Pais de facturacion del cliente.
 *           example: pais facturacion
 *         CPC_DIR_ENVIO:
 *           type: string
 *           description: direccion de envio del cliente.
 *           example: direccion envio
 *         CPC_CIUDAD_ENVIO:
 *           type: string
 *           description: Ciudad de envio del cliente.
 *           example: ciudad envio
 *         CPC_PAIS_ENVIO:
 *           type: string
 *           description: Pais de envio del cliente.
 *           example: pais envio
 *         CPC_ESTADO:
 *           type: bit
 *           description: Estado de la tabla
 *           example: True
 *         CPU_NICKNAME:
 *           type: string
 *           description: Nombre del usuario del cliente.
 *           example: Usuario
 *         CPAD_DESCRIPCION:
 *           type: string
 *           description: Descripcion de la administracion del cliente.
 *           example: Descripcion
 */

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Solicita todos los clientes
 *     tags:
 *       - clientes
 *     description: Contiene una fk para usuarios y otra para la administracion a la que pertenece.
 *     responses:
 *       200:
 *         description: Una lista de todos los clientes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/clientes'
 */

router.get("/clientes", get_clients);

/**
 * @swagger
 * /api/clientes/{ci_ruc}:
 *   get:
 *     summary: Consigue un solo cliente por su nro de cedula o ruc.
 *     tags:
 *       - clientes
 *     description: Contiene toda la informacion correspondiente a un solo cliente por solicitud.
 *     parameters:
 *       - in: path
 *         name: ci_ruc
 *         required: true
 *         description: Numero de cedula o ruc del cliente.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un solo cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/clientes'
 */

router.get("/clientes/:ci_ruc", get_client);

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags:
 *       - clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/nuevo_cliente'
 *     responses:
 *       200:
 *         description: cliente creado
 */

router.post("/clientes", new_client);

/**
 * @swagger
 * /api/clientes/{ci_ruc}:
 *   put:
 *     summary: Edita a un cliente
 *     tags:
 *       - clientes
 *     parameters:
 *       - in: path
 *         name: ci_ruc
 *         required: true
 *         description: Numero de cedula / ruc del cliente.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/edit_cliente'
 *     responses:
 *       200:
 *         description: cliente editado
 */

router.put("/clientes/:ci_ruc", update_client);

/**
 * @swagger
 * /api/clientes/{ci_ruc}:
 *   delete:
 *     summary: Elimina un cliente
 *     tags:
 *       - clientes
 *     parameters:
 *       - in: path
 *         name: ci_ruc
 *         required: true
 *         description: Numero de cedula / ruc del cliente.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de un cliente el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de cliente.
 */

router.delete("/clientes/:ci_ruc", remove_client);

export default router;
