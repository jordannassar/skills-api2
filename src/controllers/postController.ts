import { Response } from 'express';
import prisma from '../utils/prismaClient';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const createPost = async (req: any, res: Response) => {
	console.log(req.body);
	try {
		const s3File =
			req.file &&
			(await s3
				.upload({
					Bucket: 'skillspublicbucket',
					Key: `${uuidv4()}.jpg`,
					Body: req.file.buffer,
				})
				.promise());
		console.log(await s3File);
		console.log(req.user.id + 'iddDIWJDJAIAWWHDIUWAIHIDH');
		const post = await prisma.post.create({
			data: {
				title: req.body.title,
				details: req.body.details,
				type: parseInt(req.body.type),
				category: {
					connect: {
						name: req.body.categoryName
							? req.body.categoryName
							: 'Not listed',
					},
				},
				user: {
					connect: {
						id: req.user.id,
					},
				},
				//searchIndex: req.body.searchIndex, // commented out because it is not yet implemented
				link: req.body.link ? req.body.link : null,
				imageLink: s3File ? s3File.Location : null,
			},
		});
		console.log(post);
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
};

export const getAllPosts = async (req: any, res: Response) => {
	try {
		// const allPosts = await prisma.post.findMany();

		res.status(202).json('allPosts');
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not get all posts');
	}
};

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
};

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
				category: {
					connect: {
						name: req.body.categoryName,
					},
				},
				searchIndex: req.body.searchIndex,
				link: req.body.link,
			},
		});

		res.status(200).send(post);
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not update post');
	}
};
