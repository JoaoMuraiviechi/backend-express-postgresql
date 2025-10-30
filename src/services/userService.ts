import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// 🧩 Registrar novo usuário
export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("E-mail já cadastrado.");
  }

  if (password.length < 6) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  // remove o campo password do objeto retornado
  const userObj = newUser.toJSON() as any;
  delete userObj.password;

  return userObj;
};

// 🔐 Login do usuário
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Senha incorreta.");
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  const userObj = user.toJSON() as any;
  delete userObj.password;

  return { user: userObj, token };
};

// 👤 Buscar usuário por ID (opcional)
export const getUserById = async (id: number) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  return user;
};
