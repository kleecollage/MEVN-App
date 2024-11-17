import { validationResult } from "express-validator";

export const validationResultExpressNot = (req, res, next) => {
 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({errors: errors.array()});
  };

  next();
}