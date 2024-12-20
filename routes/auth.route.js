import { Router } from 'express';
import { infoUser, login, logout, refreshToken, register } from '../controllers/auth.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validatorManager.js';

const router = Router();

// REGISTER AUTH
router.post('/register', bodyRegisterValidator, register);
// LOGIN AUTH
router.post('/login', bodyLoginValidator, login);
// PROTECTED ROUTE
router.get('/protected', requireToken, infoUser)
router.get('/refresh', requireRefreshToken, refreshToken)
// LGOUT 
router.get('/logout', logout)

export default router;