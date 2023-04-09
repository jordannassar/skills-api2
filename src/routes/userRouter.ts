import express from 'express';
import { verifySessionToken } from '../middleware/verifySessionToken';
import {
	deleteAllUsers,
	deleteUserById,
	getAllUsers,
	getUserById,
	getUserByReqUser,
	updateUser,
} from '../controllers/userController';
import { formDataUtil } from '../utils/formDataUtil';
const router = express.Router();

router.get('/get', verifySessionToken, getAllUsers);

router.get('/get/:id', verifySessionToken, getUserById);

router.get('/getreq', verifySessionToken, getUserByReqUser);

router.delete('/delete/:id', verifySessionToken, deleteUserById);

router.patch(
	'/update',
	verifySessionToken,
	formDataUtil.single('file'),
	updateUser,
);

router.delete('/delete', verifySessionToken, deleteAllUsers);

export default router;
