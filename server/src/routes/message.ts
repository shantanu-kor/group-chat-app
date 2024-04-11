import { Router } from "express";

import { authenticate } from "../middlewares/authentication";
import { addMessage } from "../controllers/message";

const router = Router();

router.post('/add-message', authenticate as any, addMessage as any);

export default router;