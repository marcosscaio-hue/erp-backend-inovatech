const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { criarFornecedor, listarFornecedores } = require("../services/supplierService");

router.post("/fornecedores", authMiddleware, async (req, res) => {
  try {
    const empresaId = req.user.empresaId;

    const fornecedor = await criarFornecedor(req.body, empresaId);

    res.json(fornecedor);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: "Erro ao criar fornecedor",
      detalhe: error.message
    });
  }
});

router.get("/fornecedores", authMiddleware, async (req, res) => {
  try {
    const empresaId = req.user.empresaId;

    const fornecedores = await listarFornecedores(empresaId);

    res.json(fornecedores);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: "Erro ao listar fornecedores",
      detalhe: error.message
    });
  }
});

module.exports = router;