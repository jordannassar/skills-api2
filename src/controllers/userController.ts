import prisma from '../utils/prismaClient';
import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../types/IGetUserAuthInfoRequest-type';
import { user } from '../types/user-types';
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
				roles: true,
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
		const updatedUser = await prisma.user.update({
			where: {
				id: parseInt(req.params.id, 10),
			},
			data: {
				...req.body,
				roles: req.body.roles ? req.body.roles : undefined,
			},
		});
		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not update user');
	}
};
