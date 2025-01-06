import express from "express";
import {
  get_department,
  get_departments,
  new_department,
  remove_department,
  update_department,
} from "../../controller/Users/departmentController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     departamentos_variables:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del departamento.
 *           example: Nombre
 *     departamentos:
 *       type: object
 *       properties:
 *         CPD_ID:
 *           type: integer
 *           description: ID del departamento.
 *           example: 0
 *         CPD_NOMBRE:
 *           type: string
 *           description: Nombre del departamento.
 *           example: Nombre
 */

/**
 * @swagger
 * /api/departamentos:
 *   get:
 *     summary: Solicita todos los departamentos
 *     tags:
 *       - usuarios
 *     description: Se seleccionan todos los roles.
 *     responses:
 *       200:
 *         description: Una lista de todos los departamnetos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/departamentos'
 */

router.get("/departamentos", get_departments);

/**
 * @swagger
 * /api/departamentos/{id}:
 *   get:
 *     summary: Consigue un solo departamento por su id.
 *     tags:
 *       - usuarios
 *     description: Contiene toda la informacion correspondiente a un solo departamento por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id del departamento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un solo departamento.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/departamentos'
 */

router.get("/departamentos/:id", get_department);

/**
 * @swagger
 * /api/departamentos:
 *   post:
 *     summary: Crea un nuevo departamentos
 *     tags:
 *       - usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/departamentos_variables'
 *     responses:
 *       200:
 *         description: Rol creado
 */

router.post("/departamentos", new_department);

/**
 * @swagger
 * /api/departamentos/{id}:
 *   put:
 *     summary: edita un departamento
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
 *             $ref: '#/components/schemas/departamentos_variables'
 *     responses:
 *       200:
 *         description: Rol modificado
 */

router.put("/departamentos/:id", update_department);

/**
 * @swagger
 * /api/departamentos/{id}:
 *   delete:
 *     summary: Elimina un departamento
 *     tags:
 *       - usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero id del departamento.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de un departamento el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de departamento.
 */

router.delete("/departamentos/:id", remove_department);

export default router;
