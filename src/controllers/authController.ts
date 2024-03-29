import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import prisma from '../utils/prismaClient';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const createUser = async (req: any, res: Response) => {
	console.log(await req.body.email);
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			},
		});
		if (user) {
			return res.status(409).send('User already exists');
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send('Error checking if user already exists');
	}
	try {
		(req.file &&
			s3.upload(
				{
					Bucket: 'skillspublicbucket',
					Key: `${uuidv4()}.jpg`,
					Body: req.file.buffer,
				},
				async (error: any, s3data: any) => {
					if (error) {
						console.log(error);
					}
					if (s3data) {
						console.log(s3data);
						try {
							const salt = bcrypt.genSaltSync(10);
							const hash = bcrypt.hashSync(
								req.body.password,
								salt,
							);

							const newUser = await prisma.user
								.create({
									data: {
										...req.body,
										yearBorn: parseInt(req.body.yearBorn),
										isAdmin: true,
										password: hash,
										avatarUrl: s3data.Location,
									},
								})
								.catch((error) => {
									console.log(error);
								});

							const token = jwt.sign(
								{ id: newUser?.id, isAdmin: newUser?.isAdmin },
								process.env.JWT_SECRET as string,
								{
									expiresIn: '3h',
								},
							);

							res.header('session_token', token)
								.header('userid', newUser?.id.toString())
								.status(201)
								.send(await newUser);
						} catch (error) {
							console.error(error);
							return res.status(500).send(error);
						}
					}
				},
			)) ||
			res
				.status(404)
				.send(
					'No avatar uploaded, wrong format or file size (.PNG .JPEG .JPG < 15MB )',
				);
	} catch (error) {
		console.error(error);
		return res.status(405).send(error);
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			return res.status(404).send('Wrong email or password.');
		}
		if (!req.body.password) {
			console.log('No password');

			return res.status(404).send('Wrong email or password.');
		}

		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password,
		);

		if (!isPasswordCorrect) {
			return res.status(404).send('Wrong user or password.');
		}

		const token = jwt.sign(
			{ id: user.id, isAdmin: user.isAdmin },
			process.env.JWT_SECRET as string,
			{
				expiresIn: '3h',
			},
		);

		return res
			.header('session_token', token)
			.header('userid', user.id.toString())
			.status(200)
			.send('Successfully logged in!, token ' + token);
	} catch (error) {
		console.error(error);

		res.status(405).send('Error while logging in. Please try again later.');
	}
};
