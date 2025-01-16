import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import userRoutes from "./src/routes/Users/userRoutes.js";
import contactRoutes from "./src/routes/Contacts/contactRoutes.js";
import departmentRoutes from "./src/routes/Users/departmentRoutes.js";
import rolesRoutes from "./src/routes/Users/rolesRoutes.js";
import directoryRoutes from "./src/routes/Storage/directoryRoutes.js";
import administrationRoutes from "./src/routes/Users/administrationRoutes.js";
import menuRoutes from "./src/routes/Storage/menuRoutes.js";
import filesAddressRoutes from "./src/routes/Storage/filesAddressRoutes.js";
import companiesRoutes from "./src/routes/Contacts/companiesRoutes.js";
import clientRoutes from "./src/routes/Clients/clientRoutes.js";
import activitiesRoutes from "./src/routes/Storage/activitiesRoutes.js";
import dealRoutes from "./src/routes/Storage/dealRoutes.js";
import productRoutes from "./src/routes/Storage/productRoutes.js";
import clientsContactRoutes from "./src/routes/JoinTables/clientsContactRoutes.js";
import companyUsersRoutes from "./src/routes/JoinTables/companyUsersRoutes.js";
import serviceDealRoutes from "./src/routes/JoinTables/serviceDealRoutes.js";
import auditRoutes from "./src/routes/Storage/auditRoutes.js";
import dbConnection from "./src/config/sqlserver.js";
import sql from "mssql";

import protectedRoute from "./src/routes/protectedRoute.js";
import auth from "./src/routes/auth.js";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import cors from "cors";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for CRM DB",
    version: "1.0.0",
    description: "API CRM ",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());

app.use(
  "/api",
  userRoutes,
  contactRoutes,
  departmentRoutes,
  rolesRoutes,
  directoryRoutes,
  administrationRoutes,
  menuRoutes,
  filesAddressRoutes,
  companiesRoutes,
  clientRoutes,
  activitiesRoutes,
  dealRoutes,
  productRoutes,
  clientsContactRoutes,
  companyUsersRoutes,
  serviceDealRoutes,
  auditRoutes
);

//app.use(express.json());
app.use("/auth", auth);
app.use("/protected", protectedRoute);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
