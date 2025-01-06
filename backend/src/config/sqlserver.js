import sql from "mssql";
import "dotenv/config";

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_SERVER_PORT || 1435),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
};

let pool;

const dbConnection = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    if (pool.connected) {
      console.log("La conexion se realizo con exito");
      return pool;
    }
  })
  .catch((err) => {
    console.error("Error", err);
    process.exit(1);
  });

export default dbConnection;