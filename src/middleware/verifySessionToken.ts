import jwt from 'jsonwebtoken';
import { invalidateCookie } from '../utils/invalidateCookie';
import prisma from '../utils/prismaClient';
import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../types/IGetUserAuthInfoRequest-type';
import { jwtUser } from '../types/jwtUser-types';
import { user } from '../types/user-types';

const verifyUser = (
	req: any,
	//IGetUserAuthInfoRequest<jwtUser>,
	res: Response,
	next: any,
) => {
	if (
		req.user.id === parseInt(req.params.id, 10) ||
		req.user.isAdmin ||
		req.body.userId === req.user.id
	) {
		next();
	} else {
		return res.status(403).send({ message: 'You are not authorized' });
	}
};

const verifyAdmin = (
	req: any,
	//IGetUserAuthInfoRequest<jwtUser>,
	res: Response,
	next: any,
) => {
	if (req.jwtUser.isAdmin) {
		next();
	} else {
		return res.status(403).send({ message: 'You are not authorized' });
	}
};

export const verifySessionToken = (
	req: any,
	//IGetUserAuthInfoRequest<jwtUser>,
	res: Response,
	next: any,
) => {
	const token = req.headers.session_token;

	if (!token) {
		return res.status(401).send({ message: 'No token provided' });
	}

	jwt.verify(
		token,
		process.env.JWT_SECRET as string,
		async (err: any, decodedToken: any) => {
			try {
				if (err) {
					return res.status(403).send({ message: 'Invalid token' });
				}

				req.user = decodedToken;

				const user = await prisma.user.findUnique({
					where: {
						id: req.user.id,
					},
				});

				const recordsNotMatch = user
					? user.isAdmin !== req.user.isAdmin
					: false;

				invalidateCookie(recordsNotMatch, res);

				const adminRoutes =
					req.params.path === '/get' ||
					req.params.path === '/delete' ||
					req.params.path === '/update' ||
					req.params.id;

				adminRoutes
					? verifyAdmin(req, res, next)
					: verifyUser(req, res, next);
			} catch (error) {
				console.error(error);
			}
		},
	);
};
