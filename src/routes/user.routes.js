import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";

import {
	createUser,
	getUserById,
	updateUserById,
	deleteUserById,
	getUsers,
	getMaleUsers
} from "../controllers/user.controllers.js";


let router = Router();

router.post('', createUser);
router.get('', getUsers);
router.get('/male', authenticate, getMaleUsers);

router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
