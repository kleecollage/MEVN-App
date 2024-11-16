import { Router } from 'express';
import { body } from 'express-validator';
import { infoUser, login, logout, refreshToken, register } from '../controllers/auth.controller.js';
import { validationResultExpress } from '../middlewares/validationResult.js';
import { requireToken } from '../middlewares/requireToken.js';

const router = Router();
// REGISTER AUTH
router.post(
  '/register',
  [ 
    body('email', 'This email is not valid')
      .trim()
      .isEmail()
      .normalizeEmail(),
    
    body('password', 'Password must have at least 6 characters')
      .trim()
      .isLength({ min: 6 })
      .custom( (value, {req}) => {
        if(value !== req.body.repassword) {
          throw new Error("Passwords don't match")
        }
        return value;
      })
  ],
  validationResultExpress,
  register
);
// LOGIN AUTH
router.post(
  '/login', 
  [ 
    body('email', 'This email is not valid').trim().isEmail().normalizeEmail(),
    body('password', 'Password must conatins at least 6 characters').trim().isLength({ min: 6 })
  ],
  validationResultExpress,
  login
);

router.get('/protected', requireToken, infoUser)

router.get('/refresh', refreshToken)

router.get('/logout', logout)

export default router;