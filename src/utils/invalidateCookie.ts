import { Response } from 'express';

export const invalidateCookie = (noMatch: boolean, res: Response) =>
	noMatch &&
	res.clearCookie('session_token').status(403).send('Token is invalid!');
