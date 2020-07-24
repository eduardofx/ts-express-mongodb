import express from 'express';

import usersController from '../controllers/users';

const router = express.Router();

router.post('/signin', usersController.signIn);

router.post('/signup', usersController.signUp);

export default router;
