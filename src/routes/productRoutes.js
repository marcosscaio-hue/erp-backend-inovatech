const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { criarProduto, listarProdutos } = require("../services/productService");

router.post("/produtos", authMiddleware, async (req, res) => {
  try {
    const empresaId = req.user.empresaId;

    const produto = await criarProduto(req.body, empresaId);

    res.json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: "Erro ao criar produto",
      detalhe: error.message
    });
  }
});

router.get("/produtos", authMiddleware, async (req, res) => {
  try {
    const empresaId = req.user.empresaId;

    const produtos = await listarProdutos(empresaId);

    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: "Erro ao listar produtos",
      detalhe: error.message
    });
  }
});

module.exports = router;