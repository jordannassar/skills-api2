import { Response } from 'express';
import prisma from '../utils/prismaClient';

export const createPost = async (req: any, res: Response) => {
	try {
		const post = await prisma.post.create({
			data: {
				userId: req.body.userId, //should be req.user.id, but cant fill req.user in postman
				title: req.body.title,
				details: req.body.details,
				type: req.body.type,
				categoryId: req.body.categoryId,
				//searchIndex: req.body.searchIndex, // commented out because it is not yet implemented
				postLink: req.body.postLink,
			},
		});
		res.status(200).send(post);
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not create post');
	}
};

export const getPostById = async (req: any, res: Response) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(req.params.id, 10),
            },
        });

        if (!post) {
            return res.status(404).send('Post not found');
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(400).send('Could not get post');
    }
}

export const getAllPosts = async (req: any, res: Response) => {
    try {
       // const allPosts = await prisma.post.findMany();

        res.status(202).json('allPosts');
    } catch (error) {
        console.error(error);
        res.status(400).send('Could not get all posts');
    }
}

export const deletePost = async (req: any, res: Response) => {
    try {
        await prisma.post.delete({
            where: {
                id: parseInt(req.params.id, 10),
            },
        });

        res.status(200).send('Post has been successfully deleted');
    } catch (error) {
        console.error(error);
        res.status(400).send('Could not delete post');
    }
}

export const updatePost = async (req: any, res: Response) => {
    try {
        const post = await prisma.post.update({
            where: {
                id: parseInt(req.params.id, 10),
            },
            data: {
                title: req.body.title,
                details: req.body.details,
                type: req.body.type,
                categoryId: req.body.categoryId,
                searchIndex: req.body.searchIndex,
                postLink: req.body.postLink,
            },
        });

        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res.status(400).send('Could not update post');
    }
}