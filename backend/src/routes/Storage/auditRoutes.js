import express from "express";
import {
  get_audit,
  get_audits,
} from "../../controller/Storage/auditController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     auditoria:
 *       type: object
 *       properties:
 *         CPAU_TABLA:
 *           type: string
 *           description: Tabla modificada.
 *           example: CP_TABLA
 *         CPAU_SENTENCIA:
 *           type: string
 *           description: Sentencia ejecutada.
 *           example: SELECT / UPDATE / DELETE
 *         CPAU_FECHA:
 *           type: dateTime
 *           description: fecha en la que se realizo.
 *           example: 2020/12/31
 *         CPU_CEDULA:
 *           type: integer
 *           description: quien la realizo.
 *           example: 0
 */

/**
 * @swagger
 * /api/auditoria:
 *   get:
 *     summary: Solicita todas las auditorias
 *     tags:
 *       - almacenamiento
 *     responses:
 *       200:
 *         description: Una lista de todas las auditorias.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/auditoria'
 */

router.get("/auditoria", get_audits);

/**
 * @swagger
 * /api/auditoria/{id}:
 *   get:
 *     summary: Consigue una sola auditoria por su id.
 *     tags:
 *       - almacenamiento
 *     description: Contiene toda la informacion correspondiente a una sola auditoria por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id de la auditoria
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Una sola auditoria.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/auditoria'
 */

router.get("/auditoria/:id", get_audit);

export default router;
