import jwt from 'jsonwebtoken'
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
		if(!refreshTokenCookie) throw new Error("Token dosn't exists");

    const { uid }= jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    req.uid = uid

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({error: tokenVerificationErrors[error.message]})	    
  }
}