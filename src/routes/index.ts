import { Router } from "express";
import { register, login, protectedRoute } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { health } from "../controllers/healthController";
import { notesRouter } from "./notes";

const router = Router();

// Health check
router.get("/", health);

// Auth
router.post("/register", register);
router.post("/login", login);
router.get("/protected", authMiddleware, protectedRoute);

// Notes CRUD
router.use("/notes", notesRouter);

export default router;
