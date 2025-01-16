import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AddUser, getUserLogin } from "../module/Users/users.js";
import infoToken from "../middleware/tokenInfo.js";

const router = express.Router();

// User registration
router.post("/register", async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

    const { cedula, nombre, apellido, nickname, correo, contrasena, dep_id } =
      req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const defaultState = false;
    const defaultRole = 1;
    const user = await AddUser(
      cedula,
      nombre,
      apellido,
      defaultState,
      nickname,
      correo,
      hashedPassword,
      defaultRole,
      dep_id
    );
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
    console.log(error);
  }
});

// User login
// router.get("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await getUserLogin(email);

//     const values = JSON.stringify(user.recordset[0]);
//     const JSONvalues = JSON.parse(values);
//     const true_password = JSONvalues.CPU_CONTRASENA;
//     const passwordMatch = await bcrypt.compare(password, true_password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: "Authentication failed" });
//     }
//     const token = jwt.sign(
//       { userId: JSONvalues.CPU_CEDULA },
//       "your-secret-key",
//       {
//         expiresIn: "1h",
//       }
//     );
//     console.log("El token es: " + token);
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//     console.log(error);
//   }
// });

router.post("/login", async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    const { email, password } = req.body;
    const user = await getUserLogin(email);

    if (user.rowsAffected[0] == 0) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const values = JSON.stringify(user.recordset[0]);
    const JSONvalues = JSON.parse(values);
    const true_password = JSONvalues.CPU_CONTRASENA;
    // const hashedPassword = await bcrypt.hash(true_password, 10);
    const passwordMatch = await bcrypt.compare(password, true_password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign(
      { userId: JSONvalues.CPU_CEDULA },
      "your-secret-key",
      {
        expiresIn: "1h",
      }
    );
    console.log("El token es: " + token);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
    console.log(error);
  }
});

//obtener por token

router.post("/info-token", async (req, res) => {
  console.log(req.body);
  try {
    const { token } = req.body;
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    const decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded.userId;
    console.log(req.userId);
    res.status(201).json(req.userId);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
    console.log(error);
  }
});

export default router;
