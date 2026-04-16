const prisma = require("../lib/prisma");

async function criarProduto(data, empresaId) {
  const produto = await prisma.produto.create({
    data: {
      empresaId: empresaId,
      nome: data.nome,
      descricao: data.descricao,
      codigo: data.codigo,
      precoVenda: Number(data.precoVenda || 0),
      custo: Number(data.custo || 0),
      estoqueAtual: Number(data.estoqueAtual || 0),
      estoqueMinimo: Number(data.estoqueMinimo || 0),
      tipoItem: data.tipoItem || "produto"
    }
  });

  return produto;
}

async function listarProdutos(empresaId) {
  const produtos = await prisma.produto.findMany({
    where: {
      empresaId: empresaId
    },
    orderBy: {
      id: "desc"
    }
  });

  return produtos;
}

module.exports = {
  criarProduto,
  listarProdutos
};