import { Router } from "express";
import { authenticate } from "../middlewares/authentication";
import { addMember, createGroup, getGroupDetails } from "../controllers/group";

const router = Router();

router.post('/create-group', authenticate as any, createGroup as any);
router.post('/add-member', authenticate as any, addMember as any);
router.get('/get-details/:name', authenticate as any, getGroupDetails as any);

export default router;