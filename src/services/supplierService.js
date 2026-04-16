const prisma = require("../lib/prisma");

async function criarFornecedor(data, empresaId) {
  const fornecedor = await prisma.fornecedor.create({
    data: {
      empresaId: empresaId,
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      documento: data.documento,
      contato: data.contato
    }
  });

  return fornecedor;
}

async function listarFornecedores(empresaId) {
  const fornecedores = await prisma.fornecedor.findMany({
    where: {
      empresaId: empresaId
    },
    orderBy: {
      id: "desc"
    }
  });

  return fornecedores;
}

module.exports = {
  criarFornecedor,
  listarFornecedores
};