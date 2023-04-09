import prisma from '../utils/prismaClient';
import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../types/IGetUserAuthInfoRequest-type';
import { user } from '../types/user-types';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const getAllUsers = async (res: Response) => {
	try {
		const allUsers = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				avatarUrl: true,
				bio: true,
				email: true,
				roles: true,
			},
		});

		res.status(202).json(allUsers);
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not get all users');
	}
};

export const getUserById = async (
	req: any,
	//IGetUserAuthInfoRequest<user>,
	res: Response,
) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(req.params.id, 10),
			},
			select: {
				id: true,
				name: true,
				avatarUrl: true,
				bio: true,
				email: true,
				yearBorn: true,
			},
		});
		if (!user) {
			return res.status(404).send('User not found');
		}
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not get user');
	}
};

export const getUserByReqUser = async (req: any, res: Response) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(req.user.id, 10),
			},
			select: {
				id: true,
				name: true,
				avatarUrl: true,
				bio: true,
				email: true,
				yearBorn: true,
			},
		});
		if (!user) {
			return res.status(405).send('User not found');
		}
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not get user');
	}
};

export const deleteUserById = async (
	req: any,
	//IGetUserAuthInfoRequest<user>,
	res: Response,
) => {
	try {
		await prisma.user.delete({
			where: {
				id: parseInt(req.params.id, 10),
			},
		});

		res.status(200).send('User has been successfully deleted');
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not delete user');
	}
};

export const deleteAllUsers = async (
	req: any,
	//IGetUserAuthInfoRequest<user>,
	res: Response,
) => {
	try {
		//delete all users
		await prisma.user.deleteMany({
			where: {
				email: req.body.email,
			},
		});
		res.status(200).send('all users have been successfully deleted');
	} catch (error) {
		console.error(error);
		res.status(404).send('Could not delete all users');
	}
};

export const updateUser = async (
	req: any,
	//IGetUserAuthInfoRequest<user>,
	res: Response,
) => {
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

		const updatedUser = await prisma.user.update({
			where: {
				id: parseInt(req.user.id, 10),
			},
			data: {
				...req.body,
				yearBorn: parseInt(req.body.yearBorn, 10),
				avatarUrl: s3File && s3File.Location,
			},
		});
		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not update user');
	}
};
