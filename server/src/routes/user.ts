import { Router } from "express";

import { signUp, LogIn } from "../controllers/user";

const router = Router();

router.post("/sign-up", signUp);
router.post("/log-in", LogIn);

export default router;
