import jwt from "jsonwebtoken";
function infoToken(req, res) {
  const token = req.body;
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded.userId;
    console.log(req.userId);
    res.status(201).json(req.userId);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export default infoToken;
