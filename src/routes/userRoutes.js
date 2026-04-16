const express = require("express");
const router = express.Router();
const { criarUsuario } = require("../services/userService");

router.post("/usuarios", async (req, res) => {
  try {
    const usuario = await criarUsuario(req.body);
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: "Erro ao criar usuário",
      detalhe: error.message
    });
  }
});

module.exports = router;