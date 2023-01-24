import { Router } from 'express';

const router = new Router();

router.get('/', (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});

export default router;
