import jwt from 'jsonwebtoken';
import { invalidateCookie } from '../utils/invalidateCookie';
import prisma from '../utils/prismaClient';
import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../types/IGetUserAuthInfoRequest-type';
import { jwtUser } from '../types/jwtUser-types';
import {user} from '../types/user-types';

const verifyUser = (
	req: any, 
	//IGetUserAuthInfoRequest<jwtUser>,
	res: Response,
	next: any,
) => {
	if (req.jwtUser.id === parseInt(req.params.id, 10) || req.jwtUser.isAdmin || req.body.userId === req.jwtUser.id) {
		next();
	} else {
		return res.status(403).send('You are not authorized');
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
		return res.status(403).send('You are not admin');
	}
};

export const verifySessionToken = (
	req: any, 
	//IGetUserAuthInfoRequest<jwtUser>,
	res: Response,
	next: any,
) => {
	console.log(req.cookies.session_token);

	const token = req.cookies.session_token;

	if (!token) {
		return res.status(401).send('Not authorized!');
	}

	jwt.verify(
		token,
		process.env.JWT_SECRET as string,
		async (err: any, decodedToken: any) => {
			try {
				if (err) {
					return res.status(403).send('Token is not valid!');
				}

				req.jwtUser = decodedToken;

				const user = await prisma.user.findUnique({
					where: {
						id: req.jwtUser.id,
					},
				});

				const recordsNotMatch = user
					? user.isAdmin !== req.jwtUser.isAdmin
					: false;

				invalidateCookie(recordsNotMatch, res);

				const adminRoutes =
					req.params.path === '/get' || req.params.path === '/delete' || req.params.path === '/update' || req.params.id;

				adminRoutes
					? verifyAdmin(req, res, next)
					: verifyUser(req, res, next);
			} catch (error) {
				console.error(error);
			}
		},
	);
};
