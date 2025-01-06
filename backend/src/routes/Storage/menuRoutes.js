import express from "express";
import {
  get_menu,
  get_menus,
  new_menu,
  remove_menu,
  update_menu,
} from "../../controller/Storage/menuController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     menu_variables:
 *       type: object
 *       properties:
 *         pestanas:
 *           type: string
 *           description: pestanas del menu
 *           example: window1, window2
 *         estado:
 *           type: bit
 *           description: Estado de la tabla.
 *           example: True
 *     menu:
 *       type: object
 *       properties:
 *         CPM_ID:
 *           type: integer
 *           description: Id del menu.
 *           example: 0
 *         CPM_ESTADO:
 *           type: bit
 *           description: Estado de la tabla.
 *           example: True
 *         CPM_PESTANAS:
 *           type: string
 *           description: pestañas de cada menu.
 *           example: window1, window2
 */

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Solicita todos los menus
 *     tags:
 *       - almacenamiento
 *     responses:
 *       200:
 *         description: Una lista de todos los menus.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/menu'
 */

router.get("/menu", get_menus);

/**
 * @swagger
 * /api/menu/{id}:
 *   get:
 *     summary: Consigue un solo menu por su id.
 *     tags:
 *       - almacenamiento
 *     description: Contiene toda la informacion correspondiente a un solo menu por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id del menu
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un solo menu.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/menu'
 */

router.get("/menu/:id", get_menu);

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Crea un nuevo menu
 *     tags:
 *       - almacenamiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/menu_variables'
 *     responses:
 *       200:
 *         description: menu creado
 */

router.post("/menu", new_menu);

/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: edita un menu
 *     tags:
 *       - almacenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id del menu
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/menu_variables'
 *     responses:
 *       200:
 *         description: menu modificado
 */

router.put("/menu/:id", update_menu);

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Elimina un menu
 *     tags:
 *       - almacenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero id del menu.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de un menu el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de un menu.
 */

router.delete("/menu/:id", remove_menu);

export default router;
