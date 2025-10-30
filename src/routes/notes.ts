import { Router } from "express";
import * as noteController from "../controllers/noteController";
import { authMiddleware } from "../middlewares/authMiddleware";

const notesRouter = Router();

// Todas as rotas protegidas pelo JWT
notesRouter.use(authMiddleware);

// CRUD completo
notesRouter.post("/", noteController.create);       // Criar nota
notesRouter.get("/", noteController.list);          // Listar todas as notas do usuário
notesRouter.get("/:id", noteController.getById);    // Buscar nota por ID
notesRouter.put("/:id", noteController.put);        // Substituir nota inteira
notesRouter.patch("/:id", noteController.patch);    // Atualização parcial
notesRouter.delete("/:id", noteController.remove);  // Deletar nota

export { notesRouter };
