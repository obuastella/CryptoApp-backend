import { Router } from "express";
import { register } from "../controllers/authControllers";

const router = Router();

router.post("/signup", register);

export default router;
