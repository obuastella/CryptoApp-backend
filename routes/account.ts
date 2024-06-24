import { Router } from "express";
import { deposit, getTransactions, withdraw } from "../controllers/accountController";
import { verifyToken } from "../midddleware/verifyToken";
import { userVerification } from "../utils/userVerification";

const router = Router();

router.post("/deposit", verifyToken, deposit);
router.post("/withdraw", verifyToken, withdraw);
router.get("/getTransactions", verifyToken, getTransactions);
router.post("/confirmToken", verifyToken, userVerification);

export default router;