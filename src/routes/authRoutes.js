const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET; // depois vamos melhorar isso

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);

    if (!senhaValida) {
      return res.status(400).json({ erro: "Senha inválida" });
    }

    const token = jwt.sign(
      {
        userId: usuario.id,
        empresaId: usuario.empresaId
      },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      usuario,
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
});

module.exports = router;