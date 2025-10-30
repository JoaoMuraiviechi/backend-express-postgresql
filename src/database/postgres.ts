import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.PG_DATABASE || "mini_projeto_db",
    process.env.PG_USER || "mini_user",
    process.env.PG_PASSWORD || "12141925",
    {
    host: process.env.PG_HOST || "localhost",
    port: Number(process.env.PG_PORT) || 5432,
    dialect: "postgres",
    logging: console.log,
    }
);

export default sequelize;
