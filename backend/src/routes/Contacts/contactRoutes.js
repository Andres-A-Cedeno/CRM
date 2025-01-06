import express from "express";
import {
  new_contact,
  get_contact,
  get_contacts,
  update_contact,
  remove_contact,
} from "../../controller/Contacts/contactsController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     contactos_variables:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del contacto
 *           example: Nombre
 *         apellido:
 *           type: string
 *           description: Apellido del contacto
 *           example: Apellido
 *         cargo:
 *           type: string
 *           description: Cargo del contacto
 *           example: Cargo
 *         correo:
 *           type: string
 *           description: Correo del contacto
 *           example: ejemplo@inveligent.com
 *         movil:
 *           type: string
 *           description: Telefono movil del contacto
 *           example: Movil +593
 *         telefono:
 *           type: string
 *           description: Telefono del contacto
 *           example: Telefono (02)000-0000
 *         dir_correspondencia:
 *           type: string
 *           description: Direccion de correspondencia de contacto
 *           example: Av. Nro. calle secundaria
 *         ciudad_correspondencia:
 *           type: string
 *           description: Ciudad de correspondencia de contacto
 *           example: Ciudad
 *         pais_correspondencia:
 *           type: string
 *           description: Pais de correspondencia de contacto
 *           example: Pais
 *         posible_cliente:
 *           type: string
 *           description: Es posible cliente el contacto
 *           example: Posible
 *         estado:
 *           type: bit
 *           description: Estado de uso de la tabla
 *           example: True
 *     contactos:
 *       type: object
 *       properties:
 *         CPCO_ID:
 *           type: integer
 *           description: Id del contacto.
 *           example: 0
 *         CPCO_NOMBRE:
 *           type: string
 *           description: Nombre del contacto
 *           example: Nombre
 *         CPCO_APELLIDO:
 *           type: string
 *           description: Apellido del contacto
 *           example: Apellido
 *         CPCO_CARGO:
 *           type: string
 *           description: Cargo del contacto
 *           example: Cargo
 *         CPCO_CORREO:
 *           type: string
 *           description: Correo del contacto
 *           example: ejemplo@inveligent.com
 *         CPCO_MOVIL:
 *           type: string
 *           description: Telefono movil del contacto
 *           example: Movil +593
 *         CPCO_TELEFONO:
 *           type: string
 *           description: Telefono del contacto
 *           example: Telefono (02)000-0000
 *         CPCO_DIR_CORRESPONDENCIA:
 *           type: string
 *           description: Direccion de correspondencia de contacto
 *           example: Av. Nro. calle secundaria
 *         CPCO_CIUDAD_CORRESPONDENCIA:
 *           type: string
 *           description: Ciudad de correspondencia de contacto
 *           example: Ciudad
 *         CPCO_PAIS_CORRESPONDENCIA:
 *           type: string
 *           description: Pais de correspondencia de contacto
 *           example: Pais
 *         CPCO_POSIBLE_CLIENTE:
 *           type: string
 *           description: Es posible cliente el contacto
 *           example: Posible
 *         CPCO_ESTADO:
 *           type: bit
 *           description: Estado de uso de la tabla
 *           example: True
 */

/**
 * @swagger
 * /api/contactos:
 *   get:
 *     summary: Solicita todos los contactos
 *     tags:
 *       - Contactos
 *     description: No contiene fk.
 *     responses:
 *       200:
 *         description: Una lista de todos los contactos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/contactos'
 */

router.get("/contactos", get_contacts);

/**
 * @swagger
 * /api/contactos/{id}:
 *   get:
 *     summary: Consigue un solo contacto por su nro de id.
 *     tags:
 *       - Contactos
 *     description: Contiene toda la informacion correspondiente a un solo contacto por solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero id del contacto.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un solo contacto.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/contactos'
 */

router.get("/contactos/:id", get_contact);

/**
 * @swagger
 * /api/contactos:
 *   post:
 *     summary: Crea un nuevo contacto
 *     tags:
 *       - Contactos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/contactos_variables'
 *     responses:
 *       200:
 *         description: Contacto creado
 */

router.post("/contactos", new_contact);

/**
 * @swagger
 * /api/contactos/{id}:
 *   put:
 *     summary: Crea un nuevo contacto
 *     tags:
 *       - Contactos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id del contacto.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/contactos_variables'
 *     responses:
 *       200:
 *         description: contacto modificado
 */

router.put("/contactos/:id", update_contact);

/**
 * @swagger
 * /api/contactos/{id}:
 *   delete:
 *     summary: Elimina un contacto
 *     tags:
 *       - Contactos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero de id del contacto.
 *         schema:
 *           type: integer
 *     description: Elimina el registro de un contacto el cual se especifica en los parametros
 *     responses:
 *       200:
 *         description: Eliminacion de contacto.
 */

router.delete("/contactos/:id", remove_contact);

export default router;
