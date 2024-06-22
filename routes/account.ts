import { Router } from "express";
import { register, login } from "../controllers/authControllers";
import { userVerification } from "../midddleware/authMiddleware";

const router = Router();

router.post("/signup", register);
router.post("/login", login);
// router.post("/confirmToken", userVerification)

export default router;