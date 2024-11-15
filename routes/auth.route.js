import e from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/auth.controller.js';
import { validationResultExpress } from '../middlewares/validationResult.js';

const router = e.Router();
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


export default router;