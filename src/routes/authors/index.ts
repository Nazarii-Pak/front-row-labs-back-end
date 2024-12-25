import { Request, Response, Router } from 'express';
import { prisma } from '../../index';

const authorsRouter = Router();

//get list of authors
authorsRouter.get('/', async (_req: Request, res: Response) => {
  const authors = await prisma.review.findMany({
    select: { author: true },
    distinct: ['author'],
  });
  const uniqueAuthors = authors.map((author) => author.author);
  res.status(200).json({ authors: uniqueAuthors });
});

export default authorsRouter;
