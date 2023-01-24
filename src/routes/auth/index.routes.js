import { Router } from 'express';
import signupRouter from './signup.routes.js';
import loginRouter from './login.routes.js';
import logoutRouter from './logout.routes.js';
import authenticationMiddleware from '../../middlewares/auth/auth.middleware.js';

const router = Router();

// Se agrupan todas las rutas de auth
router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/logout', authenticationMiddleware, logoutRouter);

export default router;
