import { verifySessionToken } from '../middleware/verifySessionToken';
import { Router } from 'express';
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getCategoryById,
} from '../controllers/categoryController';

const router = Router();

router.post('/create', verifySessionToken, createCategory);

router.get('/get', verifySessionToken, getAllCategories);

router.get('/get/:id', verifySessionToken, getCategoryById);

router.delete('/delete/:id', verifySessionToken, deleteCategory);

export default router;
