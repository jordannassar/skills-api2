import express from 'express';
import { verifySessionToken } from '../middleware/verifySessionToken';
import {
	createPost,
	deletePost,
	getAllPosts,
	getPostById,
	updatePost,
} from '../controllers/postController';

const router = express.Router();

router.post('/create', verifySessionToken, createPost);

router.get('/get', verifySessionToken, getAllPosts);

router.get('/get/:id', verifySessionToken, getPostById);

router.put('/update/:id', verifySessionToken, updatePost);

router.delete('/delete/:id', verifySessionToken, deletePost);

export default router;
