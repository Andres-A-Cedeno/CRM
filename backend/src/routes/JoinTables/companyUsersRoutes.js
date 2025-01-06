import express from "express";
import {
  get_company_user,
  get_company_users,
  new_company_user,
  remove_company_user,
  update_company_user,
} from "../../controller/JoinTables/companyUsersController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     empresa-usuarios_variables:
 *       type: object
 *       properties:
 *         empresa_ruc:
 *           type: integer
 *           description: nro ruc de la empresa
 *           example: 0
 *         usuario_ci:
 *           type: integer
 *           description: nro de cedula del usuario
 *           example: 0
 *     empresa-usuarios:
 *       type: object
 *       properties:
 *         CPE_NOMBRE:
 *           type: string
 *           description: nombre del usuario dentro de la empresa.
 *           example: empresa
 *         CPU_NICKNAME:
 *           type: string
 *           description: nombre de la empresa que incluye el usuario.
 *           example: usuario
 */

/**
 * @swagger
 * /api/empresa-usuarios:
 *   get:
 *     summary: Solicita la tabla intermedia empresa-usuarios
 *     tags:
 *       - JoinTables
 *     responses:
 *       200:
 *         description: Una lista de todas las relaciones empresa-usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/empresa-usuarios'
 */

router.get("/empresa-usuarios", get_company_users);

/**
 * @swagger
 * /api/empresa-usuarios/{id}:
 *   get:
 *     summary: Consigue una sola relacion de empresa-usuarios por su id.
 *     tags:
 *       - JoinTables
 *     description: Contiene toda la informacion correspondiente a una sola relacion empresa-usuarios por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id de la relacion empresa-usuarios
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Una sola relacion empresa-usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/empresa-usuarios'
 */

router.get("/empresa-usuarios/:id", get_company_user);

/**
 * @swagger
 * /api/empresa-usuarios:
 *   post:
 *     summary: Crea una nueva relacion empresa-usuarios
 *     tags:
 *       - JoinTables
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/empresa-usuarios_variables'
 *     responses:
 *       200:
 *         description: relacion empresa-usuarios creado
 */

router.post("/empresa-usuarios", new_company_user);

/**
 * @swagger
 * /api/empresa-usuarios/{id}:
 *   put:
 *     summary: edita una relacion empresa-usuarios
 *     tags:
 *       - JoinTables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id de la relacion empresa-usuarios
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/empresa-usuarios_variables'
 *     responses:
 *       200:
 *         description: relacion empresa-usuarios modificado
 */

router.put("/empresa-usuarios/:id", update_company_user);

/**
 * @swagger
 * /api/empresa-usuarios/{id}:
 *   delete:
 *     summary: Elimina una relacion empresa-usuarios
 *     tags:
 *       - JoinTables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero id de la relacion empresa-usuarios.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de una relacion empresa-usuarios el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de una relacion empresa-usuarios.
 */

router.delete("/empresa-usuarios/:id", remove_company_user);

export default router;
