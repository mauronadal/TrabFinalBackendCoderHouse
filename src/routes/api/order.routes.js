import { Router } from 'express';
import ordersController from '../../controllers/api/order.controller.js';

const router = Router();


router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getOrderById);
router.post('/', ordersController.createOrder);
router.put('/:id', ordersController.confirmOrder);
router.delete('/:id', ordersController.deleteOrderById);

export default router;
