import express from "express";
import {
  get_activities,
  get_activity,
  new_activity,
  remove_activity,
  update_activity,
} from "../../controller/Storage/activitiesController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     actividades_variables:
 *       type: object
 *       properties:
 *         user_ci:
 *           type: integer
 *           description: cedula del usuario
 *           example: 0
 *         ci_ruc:
 *           type: integer
 *           description: ci / ruc del cliente
 *           example: 0
 *         titulo:
 *           type: string
 *           description: Titulo de la actividad.
 *           example: titulo
 *         fecha_registro:
 *           type: dateTime
 *           description: Fecha en la que se registra la actividad
 *           example: 2020/12/31
 *         tiempo_inicio:
 *           type: Time
 *           description: Hora en la que se inicia la actividad.
 *           example: 00:00:00
 *         tiempo_final:
 *           type: Time
 *           description: Hora en la que se finaliza la actividad.
 *           example: 00:00:00
 *         proyecto:
 *           type: string
 *           description: Proyecto en el que se trabaja
 *           example: proyecto
 *         seccion:
 *           type: string
 *           description: Seccion en la que se trabaja.
 *           example: seccion
 *         descripcion:
 *           type: string
 *           description: Descripcion del proyecto.
 *           example: descripcion
 *         tiempo_total:
 *           type: Time
 *           description: Tiempo total que tomo el desarrollo de la actividad
 *           example: 0
 *
 *     actividades:
 *       type: object
 *       properties:
 *         CPU_NICKNAME:
 *           type: string
 *           description: nombre de usuario.
 *           example: nickname
 *         CPC_NOMBRE_CLIENTE:
 *           type: string
 *           description: Nombre del cliente.
 *           example: nombre
 *         CPA_TITULO_TAREA:
 *           type: string
 *           description: titulo de la actividad.
 *           example: titulo
 *         CPA_FECHA_REGISTRO:
 *           type: dateTime
 *           description: fecha en la que se registra
 *           example: 2020/12/31
 *         CPA_TIEMPO_INICIO:
 *           type: Time
 *           description: tiempo en el que se inicia la actividad.
 *           example: 17:00:00
 *         CPA_TIEMPO_FINAL:
 *           type: Time
 *           description: tiempo en el que se finaliza la actividad.
 *           example: 20:00:00
 *         CPA_PROYECTO:
 *           type: string
 *           description: proyecto en el que se trabaja.
 *           example: proyecto
 *         CPA_SECCION:
 *           type: string
 *           description: seccion en la que se desarrolla la actividad
 *           example: seccion
 *         CPA_DESCRIPCION:
 *           type: string
 *           description: descripcion de la actividad.
 *           example: descripcion
 *         CPA_TIEMPO_TOTAL:
 *           type: Time
 *           description: tiempo total de la actividad
 *           example: 02:00:00
 */

/**
 * @swagger
 * /api/actividades:
 *   get:
 *     summary: Solicita todos las actividades
 *     tags:
 *       - almacenamiento
 *     responses:
 *       200:
 *         description: Una lista de todas las actividades.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/actividades'
 */

router.get("/actividades", get_activities);

/**
 * @swagger
 * /api/actividades/{id}:
 *   get:
 *     summary: Consigue una sola actividad por su id.
 *     tags:
 *       - almacenamiento
 *     description: Contiene toda la informacion correspondiente a una sola actividad por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id de la actividad.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Una sola actividad.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/actividades'
 */

router.get("/actividades/:id", get_activity);

/**
 * @swagger
 * /api/actividades:
 *   post:
 *     summary: Crea una nueva actividad
 *     tags:
 *       - almacenamiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/actividades_variables'
 *     responses:
 *       200:
 *         description: actividad creada
 */

router.post("/actividades", new_activity);

/**
 * @swagger
 * /api/actividades/{id}:
 *   put:
 *     summary: edita una actividad
 *     tags:
 *       - almacenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id de la actividad
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/actividades_variables'
 *     responses:
 *       200:
 *         description: actividad modificada
 */

router.put("/actividades/:id", update_activity);

/**
 * @swagger
 * /api/actividades/{id}:
 *   delete:
 *     summary: Elimina una actividad
 *     tags:
 *       - almacenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero id de la actividad.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de una actividad la cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de un actividad.
 */

router.delete("/actividades/:id", remove_activity);

export default router;
