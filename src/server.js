const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const productRoutes = require("./routes/productRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
const PORT = 3334;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API ERP rodando" });
});

app.get("/perfil", authMiddleware, (req, res) => {
  res.json({
    mensagem: "Rota protegida acessada com sucesso",
    usuario: req.user
  });
});


app.use(userRoutes);
app.use(authRoutes);
app.use(clientRoutes);
app.use(productRoutes);
app.use(supplierRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});