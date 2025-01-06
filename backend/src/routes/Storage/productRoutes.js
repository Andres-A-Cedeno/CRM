import express from "express";
import {
  get_product,
  get_products,
  new_product,
  remove_product,
  update_product,
} from "../../controller/Storage/productController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     producto_variables:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del producto
 *           example: Nombre
 *         tipo:
 *           type: string
 *           description: Descripcion del producto
 *           example: Nombre
 *         admin_id:
 *           type: int
 *           description: id de la administracion fk
 *           example: 0
 *     productos:
 *       type: object
 *       properties:
 *         CPPS_NOMBRE_PRODUCTO:
 *           type: integer
 *           description: ID de la administracion.
 *           example: 0000000000
 *         CPPS_TIPO_PRODUCTO:
 *           type: string
 *           description: Nombre del tipo de administracion.
 *           example: Nombre de administracion
 *         CPAD_DESCRIPCION:
 *           type: string
 *           description: descripcion de la administracion.
 *           example: administracion
 */

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Solicita todos los productos
 *     tags:
 *       - almacenamiento
 *     responses:
 *       200:
 *         description: Una lista de todos los productos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productos'
 */

router.get("/productos", get_products);

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Consigue un solo producto por su id.
 *     tags:
 *       - almacenamiento
 *     description: Contiene toda la informacion correspondiente a un solo producto por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id de el producto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un solo producto.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productos'
 */

router.get("/productos/:id", get_product);

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags:
 *       - almacenamiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/producto_variables'
 *     responses:
 *       200:
 *         description: producto creado
 */

router.post("/productos", new_product);

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: edita un producto
 *     tags:
 *       - almacenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id del producto
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/producto_variables'
 *     responses:
 *       200:
 *         description: producto modificado
 */

router.put("/productos/:id", update_product);

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     tags:
 *       - almacenamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero id del producto.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de un producto el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de un producto.
 */

router.delete("/productos/:id", remove_product);

export default router;
