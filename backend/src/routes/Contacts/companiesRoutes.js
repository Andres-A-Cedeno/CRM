import {
  get_companies,
  get_company,
  new_company,
  remove_company,
  update_company,
} from "../../controller/Contacts/CompanyController.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     empresas_variables:
 *       type: object
 *       properties:
 *         menu_id:
 *           type: integer
 *           description: Id del menu.
 *           example: 0
 *         nombre:
 *           type: string
 *           description: Nombre de la empresa
 *           example: nombre
 *     nueva_empresa:
 *       allOf:
 *         - type: object
 *           properties:
 *             ruc:
 *               type: integer
 *               description: ruc de la empresa.
 *               example: 0
 *         - $ref: '#/components/schemas/empresas_variables'
 *     edit_empresa:
 *       allOf:
 *         - type: object
 *           properties:
 *             new_ruc:
 *               type: integer
 *               description: nuevo ruc de la empresa.
 *               example: 0
 *         - $ref: '#/components/schemas/empresas_variables'
 *     empresas:
 *       type: object
 *       properties:
 *         CPE_RUC:
 *           type: integer
 *           description: RUC de la empresa.
 *           example: 0
 *         CPM_ID:
 *           type: integer
 *           description: id del menu
 *           example: 0
 *         CPE_NOMBRE:
 *           type: string
 *           description: Nombre de la empresa.
 *           example: Empresa
 */

/**
 * @swagger
 * /api/empresas:
 *   get:
 *     summary: Solicita todos los empresas
 *     tags:
 *       - Contactos
 *     description: Contiene fk sobre los menus.
 *     responses:
 *       200:
 *         description: Una lista de todos los empresas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/empresas'
 */

router.get("/empresas", get_companies);

/**
 * @swagger
 * /api/empresas/{ruc}:
 *   get:
 *     summary: Consigue una sola empresa por su nro de ruc.
 *     tags:
 *       - Contactos
 *     description: Contiene toda la informacion correspondiente a un solo empresa por solicitud.
 *     parameters:
 *       - in: path
 *         name: ruc
 *         required: true
 *         description: Numero ruc del empresa.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Una sola empresa.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/empresas'
 */

router.get("/empresas/:ruc", get_company);

/**
 * @swagger
 * /api/empresas:
 *   post:
 *     summary: Crea una nueva empresa
 *     tags:
 *       - Contactos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/nueva_empresa'
 *     responses:
 *       200:
 *         description: empresa creada
 */

router.post("/empresas", new_company);

/**
 * @swagger
 * /api/empresas/{ruc}:
 *   put:
 *     summary: Edita una empresa
 *     tags:
 *       - Contactos
 *     parameters:
 *       - in: path
 *         name: ruc
 *         required: true
 *         description: Numero de ruc de la empresa.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/edit_empresa'
 *     responses:
 *       200:
 *         description: empresa modificado
 */

router.put("/empresas/:ruc", update_company);

/**
 * @swagger
 * /api/empresas/{ruc}:
 *   delete:
 *     summary: Elimina una empresa
 *     tags:
 *       - Contactos
 *     parameters:
 *       - in: path
 *         name: ruc
 *         required: true
 *         description: Numero de id del empresa.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de un empresa el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de empresa.
 */

router.delete("/empresas/:ruc", remove_company);

export default router;
