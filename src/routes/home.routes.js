import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).sendFile(path.join(process.cwd(), '/src/public/home.html'));
});

export default router;
