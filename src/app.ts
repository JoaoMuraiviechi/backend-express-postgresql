import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import sequelize from "./database/postgres";

dotenv.config();
const app = express();

// Middleware para JSON
app.use(express.json());

// Middleware de logs
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Rotas
app.use("/", router);

// Conexão com PostgreSQL
sequelize.authenticate()
  .then(() => console.log("Conexão com PostgreSQL bem-sucedida"))
  .catch((err) => console.error("Erro ao conectar:", err));

// Sincroniza modelos com o banco
sequelize.sync()  // cria tabelas se não existirem
  .then(() => console.log("Tabelas sincronizadas"))
  .catch((err) => console.error("Erro ao sincronizar tabelas:", err));

export default app;
