import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserLogin } from "../module/Users/users";

const router = express.Router();

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserLogin(username);
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
