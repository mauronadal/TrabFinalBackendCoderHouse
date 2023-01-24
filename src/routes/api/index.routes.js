import { Router } from 'express';
import productRouter from './product.routes.js';
import cartRouter from './cart.routes.js';
import userRouter from './user.routes.js';
import orderRouter from './order.routes.js';
import authenticationMiddleware from '../../middlewares/auth/auth.middleware.js';

const router = Router();

// Se agrupan todas las rutas de la api
router.use('/productos', productRouter);
router.use('/usuario', authenticationMiddleware, userRouter);
router.use('/carrito', authenticationMiddleware, cartRouter);
router.use('/ordenes', authenticationMiddleware, orderRouter);

export default router;
