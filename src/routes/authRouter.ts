import express from 'express';
import { createUser, loginUser } from '../controllers/authController';
import { formDataUtil } from '../utils/formDataUtil';

const router = express.Router();

//User creation
router.post('/register', formDataUtil.single('file'), createUser);

//User login
router.post('/login', loginUser);

export default router;
