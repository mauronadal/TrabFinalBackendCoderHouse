import { Router } from 'express';
import productsController from '../../controllers/api/product.controller.js';
import isAdmin from '../../middlewares/auth/isAdmin.middleware.js';
import authenticationMiddleware from '../../middlewares/auth/auth.middleware.js';

const router = Router();


router.get('/listado', productsController.getAllProducts);
router.get('/listado/:id', productsController.getProductById);
router.get('/busqueda', productsController.searchProductByFilter)
router.post('/', isAdmin, authenticationMiddleware, productsController.addProduct);
router.put('/:id', isAdmin, authenticationMiddleware, productsController.updateProductById);
router.delete('/:id', isAdmin, authenticationMiddleware, productsController.deleteProductById);

export default router;
