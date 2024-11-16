import jwt from 'jsonwebtoken';

/* THIS METHOD IS TO STORE THE TOKEN IN LOCALSTORAGE 
 export const requireToken = (req, res, next) => {
   try {
     console.log(req.headers)
     let token = req.headers?.authorization;  
     if (!token) throw new Error("The token does not exist in the Header. Try with Bearer");  
     token = token.split(" ")[1];
     const { uid }= jwt.verify(token, process.env.JWT_SECRET)
     req.uid = uid  
     next();
   } catch (error) {
     console.log(error);
     const TokenVerificationErrors = {
       "invalid signature": "Invalid JWT signature",
       "jwt expired": "JWT expired",
       "invalid token": "Invalid token",
       "No Bearer": "Format Bearer needed",
       "jwt malformed": "Invalid JWT format"
     
     return res.status(401).send({error: TokenVerificationErrors[error.message] });
   }
 }
*/

//** METHOD FOR TOKEN REFRESH **//
export const requireToken = (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader) throw new Error("No Bearer");

    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("Token not found");

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid
    
    next();
  } catch (error) {
    console.log(error);
    const TokenVerificationErrors = {
      "invalid signature": "Invalid JWT signature",
      "jwt expired": "JWT expired",
      "invalid token": "Invalid token",
      "No Bearer": "Format Bearer needed",
      "jwt malformed": "Invalid JWT format"
    }
    return res.status(401).send({error: TokenVerificationErrors[error.message] });
  }
}