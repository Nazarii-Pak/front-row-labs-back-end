import express, { Request, Response, NextFunction } from 'express';
import { body, query, param, validationResult } from 'express-validator';
import { prisma } from '../../index';

const reviewRouter = express.Router();

function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return; // Explicitly return to avoid further execution
  }
  next();
}

// Create a review
reviewRouter.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('author').notEmpty().withMessage('Author is required'),
  ],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { title, content, rating, author } = req.body;
      const review = await prisma.review.create({
        data: { title, content, rating, author, createdAt: new Date().toISOString() },
      });
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create review' });
    }
  }
);

// Get reviews with pagination and filtering
reviewRouter.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('page_size').optional().isInt({ min: 1 }).toInt(),
    query('search').optional().isString(),
    query('author').optional().isString(),
    query('rating').optional().isInt({ min: 1, max: 5 }).toInt(),
  ],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { page = 1, page_size = 10, search, author, rating } = req.query;
      const skip = (Number(page) - 1) * Number(page_size);
      const take = Number(page_size);
      const where: any = {};

      if (author) where['author'] = author;
      if (rating) where['rating'] = Number(rating);
      if (search) where['title'] = { contains: search };
      const reviews = await prisma.review.findMany({
        take,
        skip,
        where,
      });
      const total = await prisma.review.count({ where });

      res.status(200).json({ reviews, total, page });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  }
);

// Get a single review
reviewRouter.get(
  '/:id',
  [param('id').isInt().withMessage('ID must be an integer')],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const review = await prisma.review.findUnique({
        where: { id: Number(id) },
      });

      if (!review) {
        res.status(404).json({ error: 'Review not found' });
        return;
      }

      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch review' });
    }
  }
);

// Update a review
reviewRouter.put(
  '/:id',
  [
    param('id').isInt().withMessage('ID must be an integer'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  ],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, content, rating, author } = req.body;
      const updatedData: any = { title, content, rating, author };

      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] === undefined) delete updatedData[key];
      });

      const review = await prisma.review.update({
        where: { id: Number(id) },
        data: updatedData,
      });

      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update review' });
    }
  }
);

// Delete a review
reviewRouter.delete(
  '/:id',
  [param('id').isInt().withMessage('ID must be an integer')],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.review.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete review' });
    }
  }
);

export default reviewRouter;
