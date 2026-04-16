const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");

async function criarUsuario(data) {
  const senhaHash = await bcrypt.hash(data.senha, 10);

  const usuario = await prisma.usuario.create({
    data: {
      nome: data.nome,
      email: data.email,
      senhaHash,
      empresaId: data.empresaId
    }
  });

  return usuario;
}

module.exports = {
  criarUsuario
};