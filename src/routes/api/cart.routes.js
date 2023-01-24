import { Router } from 'express';
import cartsController from '../../controllers/api/cart.controller.js';

const router = Router();

/* ------------------------------ Carts router ------------------------------ */
router.post('/:clientId', cartsController.createCart);
router.delete('/:id', cartsController.deleteCartById);
router.get('/:clientId/productos', cartsController.getAllProductsFromCartByClientId);
router.post('/:id/productos/:idProd', cartsController.addProductToCartById);
router.delete('/:clientId/productos/:idProd', cartsController.deleteProductFromCartByClientId);

export default router;
