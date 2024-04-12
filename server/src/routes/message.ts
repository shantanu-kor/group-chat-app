import { Router } from "express";

import { authenticate } from "../middlewares/authentication";
import { addMessage, getMessages } from "../controllers/message";

const router = Router();

router.post('/add-message', authenticate as any, addMessage as any);
router.get('/get-messages', authenticate as any, getMessages as any);

export default router;