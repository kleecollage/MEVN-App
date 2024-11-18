import axios from "axios";
import { validationResult, body, param } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({errors: errors.array()});
  };

  next();
};

export const paramsLinkValidator = [
  param("id", "Invalid ID Format (by expressValidator)")
  .trim()
  .notEmpty()
  .escape(),
  validationResultExpress
]

export const bodyLinkValidator = [
  body("longLink", "Format Link incorrect")
  .trim()
  .notEmpty()
  .custom(async value => {
    try {
      if (!value.startsWith('https://')) {
        value = 'https://' + value;
      }
      console.log(value);
      await axios.get(value)
    } catch (error) {
      console.log(error)
      throw new Error("LongLink Not Found 404");
    }
  }),
  validationResultExpress
]

export const bodyRegisterValidator = [ 
  body('email', 'This email is not valid').trim().isEmail().normalizeEmail(),
  body('password', 'Password must have at least 6 characters')
    .trim()
    .isLength({ min: 6 })
    .custom( (value, {req}) => {
      if(value !== req.body.repassword) {
        throw new Error("Passwords don't match")
      }
      return value;
    }),
    validationResultExpress
]

export const bodyLoginValidator = [ 
  body('email', 'This email is not valid').trim().isEmail().normalizeEmail(),
  body('password', 'Password must conatins at least 6 characters').trim().isLength({ min: 6 }),
  validationResultExpress,
]