import express from "express";
import {
  get_deal,
  get_deals,
  new_deal,
  remove_deal,
  update_deal,
} from "../../controller/Storage/dealController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     tratos_variables:
 *       type: object
 *       properties:
 *         directorio_id:
 *           type: integer
 *           description: id de el directorio al que se tiene una fk
 *           example: 0
 *         cliente_ruc:
 *           type: integer
 *           description: ruc con el que identificamos a nuestro cliente.
 *           example: '0'
 *         admin_id:
 *           type: integer
 *           description: id para definir la administracion con fk
 *           example: 0
 *         estado:
 *           type: bit
 *           description: Estado de la tabla.
 *           example: True
 *         nombre:
 *           type: string
 *           description: nombre del trato.
 *           example: nombre
 *         tipo:
 *           type: string
 *           description: Tipo del trato.
 *           example: tipo
 *         recurrencia:
 *           type: string
 *           description: recurrencia del trato.
 *           example: recurrencia
 *         fuente_cliente:
 *           type: string
 *           description: Razon del cliente.
 *           example: fuente cliente
 *         facturacion:
 *           type: string
 *           description: Facturacion para el cliente.
 *           example: factuacion
 *         margen:
 *           type: string
 *           description: msrgen disponible para el trato.
 *           example: margen
 *         fecha_creacion:
 *           type: dateTime
 *           description: Fecha de creacion del trato.
 *           example: 2020/12/31
 *         fecha_modificacion:
 *           type: dateTime
 *           description: Fecha de modificion del trato.
 *           example: 2020/12/31
 *         fecha_cierre:
 *           type: dateTime
 *           description: Fecha de cierre del trato
 *           example: 2020/12/31
 *         fase:
 *           type: string
 *           description: Fase en la que sencuentra el trato
 *           example: fase
 *         probabilidad:
 *           type: string
 *           description: Formato del archivo.
 *           example: probabilidad
 *         ingresos_esperados:
 *           type: string
 *           description: Prediccion de ingresos del trato.
 *           example: ingresos esperados
 *         etapa:
 *           type: string
 *           description: etapa en la que se encuentra el trato.
 *           example: etapa
 *         codigo:
 *           type: string
 *           description: Codigo del trato.
 *           example: codigo
 *
 *     tratos:
 *       type: object
 *       properties:
 *         CPT_ESTADO:
 *           type: bit
 *           description: Estado de la tabla.
 *           example: True
 *         CPT_NOMBRE_TRATO:
 *           type: string
 *           description: Nombre del trato.
 *           example: Nombre
 *         CPT_TIPO_TRATO:
 *           type: string
 *           description: Tipo del trato.
 *           example: tipo
 *         CPT_RECURRENCIA:
 *           type: string
 *           description: recurrencia en el trato
 *           example: recurrencia
 *         CPT_FUENTE_POSIBLE_CLIENTE:
 *           type: string
 *           description: fuente del posible cliente.
 *           example: fuente
 *         CPT_FACTURACION:
 *           type: string
 *           description: facturacion para el cliente.
 *           example: facturacion
 *         CPT_MARGEN:
 *           type: string
 *           description: margen del trato.
 *           example: margen
 *         CPT_FECHA_CREACION:
 *           type: dateTime
 *           description: fecha de creacion del trato.
 *           example: Nombre
 *         CPT_FECHA_MODIFICACION:
 *           type: dateTime
 *           description: Fecha de la ultima modificacion.
 *           example: 2020/12/31
 *         CPT_FECHA_CIERRE:
 *           type: dateTime
 *           description: Fecha en la que se cierra el trato.
 *           example: 2020/12/31
 *         CPT_FASE:
 *           type: string
 *           description: Fase en la que se encuentra el trato.
 *           example: Fase
 *         CPT_PROBABILIDAD:
 *           type: string
 *           description: Porcentaje de probabilidad calculado para el trato.
 *           example: Nombre
 *         CPT_INGRESOS_ESPERADOS:
 *           type: string
 *           description: Ingresos esperados para este trato.
 *           example: Ingresos e
 *         CPT_ETAPA:
 *           type: string
 *           description: Etapa en la que se encuentra el trato.
 *           example: Etapa
 *         CPT_CODIGO:
 *           type: string
 *           description: Codigo del trato.
 *           example: Codigo
 *         CPA_NOMBRE:
 *           type: string
 *           description: Nombre del directorio del trato.
 *           example: Nombre directorio
 *         CPC_NOMBRE_CLIENTE:
 *           type: string
 *           description: Nombre del cliente con el que se hace el trato.
 *           example: Nombre cliente
 *         CPAD_DESCRIPCION:
 *           type: string
 *           description: Descripcion de la administracion del trato.
 *           example: Descripcion
 */

/**
 * @swagger
 * /api/tratos:
 *   get:
 *     summary: Solicita todos los tratos
 *     tags:
 *       - almacenamiento
 *     responses:
 *       200:
 *         description: Una lista de todos los tratos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/tratos'
 */

router.get("/tratos", get_deals);

/**
 * @swagger
 * /api/tratos/{id}:
 *   get:
 *     summary: Consigue un solo trato por su id.
 *     tags:
 *       - almacenamiento
 *     description: Contiene toda la informacion correspondiente a un solo trato por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id del trato
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un solo trato.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/tratos'
 */

router.get("/tratos/:id", get_deal);

/**
 * @swagger
 * /api/tratos:
 *   post:
 *     summary: Crea un nuevo trato
 *     tags:
 *       - almacenamiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tratos_variables'
 *     responses:
 *       200:
 *         description: trato creado
 */

router.post("/tratos", new_deal);

/**
 * @swagger
 * /api/tratos/{id}:
 *   put:
 *     summary: edita un trato
 *     tags:
 *       - almacenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id del trato
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tratos_variables'
 *     responses:
 *       200:
 *         description: trato modificado
 */

router.put("/tratos/:id", update_deal);

/**
 * @swagger
 * /api/tratos/{id}:
 *   delete:
 *     summary: Elimina un trato
 *     tags:
 *       - almacenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero id del trato
 *         schema:
 *           type: integer
 *     description: Elimina el registro de un trato el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de un directorio.
 */

router.delete("/tratos/:id", remove_deal);

export default router;
