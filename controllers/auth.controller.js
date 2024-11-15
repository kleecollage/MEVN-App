import { validationResultExpress } from "../middlewares/validationResult.js";

export const register =  (req, res) => {
  validationResultExpress;
  res.json({ok: "register"});
  console.log(req.body);
};

export const login = (req, res) => {
  res.json({ok: "login"});
  console.log(req.body);
};