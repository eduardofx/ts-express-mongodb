import express from 'express';

import authController from '../controllers/auth';
import productsController from '../controllers/products';

const router = express.Router();

router.post('/', authController.checkAuth, productsController.create);

router.get('/', authController.checkAuth, productsController.getAll);

router.get('/:productId', productsController.getOne);

router.patch(
  '/:productId',
  authController.checkAuth,
  productsController.update
);

router.delete(
  '/:productId',
  authController.checkAuth,
  productsController.destroy
);

export default router;
