import { Router } from "express";

import { signUp, LogIn, getGroups } from "../controllers/user";
import { authenticate } from "../middlewares/authentication";

const router = Router();

router.post("/sign-up", signUp);
router.post("/log-in", LogIn);
router.get('/get-groups', authenticate as any, getGroups as any);

export default router;
