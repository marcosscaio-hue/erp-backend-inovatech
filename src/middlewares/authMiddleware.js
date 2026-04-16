const jwt = require("jsonwebtoken");

const SECRET = "segredo_super";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não informado" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido" });
  }
}

module.exports = authMiddleware;