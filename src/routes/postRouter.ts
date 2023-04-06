import express from 'express';
import { verifySessionToken } from '../middleware/verifySessionToken';
import {
	createPost,
	deletePost,
	getAllPosts,
	getPostById,
	updatePost,
} from '../controllers/postController';
import { formDataUtil } from '../utils/formDataUtil';

const router = express.Router();

router.post(
	'/create',
	verifySessionToken,
	formDataUtil.single('file'),
	createPost,
);

router.get('/get', getAllPosts);

router.get('/get/:id', verifySessionToken, getPostById);

router.put('/update/:id', verifySessionToken, updatePost);

router.delete('/delete/:id', verifySessionToken, deletePost);

export default router;
