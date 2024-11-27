import jwt from "jsonwebtoken";

export const verifyAuth =  (req, res, next) => {
  const token = req.get('token');

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(400).json({
        message: 'User not valid',
      })
    }
    req.user = decoded.data;
    next();
  })
}

export const verifyAdmin = (req, res, next) => {
  const rol = req.user.role

  if (rol == 'ADMIN') {
    next();
  } else {
    return res.status(401).json({
      message : 'User not valid'
    })
  }
}