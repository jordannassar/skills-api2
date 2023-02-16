import { Request, Response } from 'express';
import prisma from '../utils/prismaClient';

export const createCategory = async (req: Request, res: Response) => {
	try {
		const category = await prisma.category.create({
			data: {
				name: req.body.name,
				parentId: req.body.parentId,
			},
		});
		res.status(200).send(category);
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not create category');
	}
};

export const getAllCategories = async (req: Request, res: Response) => {
	try {
		const allCategories = await prisma.category.findMany();
		res.status(202).json(allCategories);
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not get all categories');
	}
};

export const getCategoryById = async (req: Request, res: Response) => {
	try {
		const category = await prisma.category.findUnique({
			where: {
				id: parseInt(req.params.id, 10),
			},
		});

		if (!category) {
			return res.status(404).send('Category not found');
		}

		res.status(200).json(category);
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not get category');
	}
};

export const deleteCategory = async (req: Request, res: Response) => {
	try {
		await prisma.category.delete({
			where: {
				id: parseInt(req.params.id, 10),
			},
		});
		res.status(200).send('Category deleted');
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not delete category');
	}
};

export const updateCategory = async (req: Request, res: Response) => {
	try {
		const category = await prisma.category.update({
			where: {
				id: parseInt(req.params.id, 10),
			},
			data: {
				name: req.body.name,
				parentId: req.body.parentId,
			},
		});
		res.status(200).send(category);
	} catch (error) {
		console.error(error);
		res.status(400).send('Could not update category');
	}
};
