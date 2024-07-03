import { Router } from "express";
import {
  deposit,
  getTransactions,
  stake,
  withdraw,
} from "../controllers/accountController";
import { getUser } from "../utils/getUser";

const router = Router();

router.post("/deposit", deposit);
router.post("/withdraw", withdraw);
router.post("/stake", stake);
router.get("/getTransactions", getTransactions);
router.get("/user", getUser);

export default router;
