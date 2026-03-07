import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/posts", authMiddleware, PostController.create);
router.get("/posts", PostController.list);

export default router;