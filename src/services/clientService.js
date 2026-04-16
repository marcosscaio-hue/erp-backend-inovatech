const prisma = require("../lib/prisma");

async function criarCliente(data, empresaId) {
  const cliente = await prisma.cliente.create({
    data: {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      documento: data.documento,
      empresaId: empresaId
    }
  });

  return cliente;
}

async function listarClientes(empresaId) {
  const clientes = await prisma.cliente.findMany({
    where: {
      empresaId: empresaId
    },
    orderBy: {
      id: "desc"
    }
  });

  return clientes;
}

module.exports = {
  criarCliente,
  listarClientes
};