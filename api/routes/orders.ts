import express from 'express';

import authController from '../controllers/auth';
import ordersController from '../controllers/orders';

const router = express.Router();

router.post('/', authController.checkAuth, ordersController.create);

router.get('/', authController.checkAuth, ordersController.getAll);

router.get('/:orderId', authController.checkAuth, ordersController.getOne);

router.delete('/:orderId', authController.checkAuth, ordersController.destroy);

export default router;
