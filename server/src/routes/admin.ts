import { Router } from "express";
import { authenticate } from "../middlewares/authentication";
import { getAdmins, isAdmin, makeAdmin, removeMember } from "../controllers/admin";

const router = Router();

router.get('/is-admin', authenticate as any, isAdmin as any);
router.get('/get-admins', authenticate as any, getAdmins as any);
router.post('/make-admin', authenticate as any, makeAdmin as any);
router.post('/remove-member', authenticate as any, removeMember as any);

export default router;