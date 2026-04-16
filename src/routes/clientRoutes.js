const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { criarCliente, listarClientes } = require("../services/clientService");

router.post("/clientes", authMiddleware, async (req, res) => {
  try {
    const empresaId = req.user.empresaId;

    const cliente = await criarCliente(req.body, empresaId);

    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: "Erro ao criar cliente",
      detalhe: error.message
    });
  }
});

router.get("/clientes", authMiddleware, async (req, res) => {
  try {
    const empresaId = req.user.empresaId;

    const clientes = await listarClientes(empresaId);

    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: "Erro ao listar clientes",
      detalhe: error.message
    });
  }
});

module.exports = router;