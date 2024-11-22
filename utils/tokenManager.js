import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const expiresIn = 60 * 15
  try {
    const token = jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn})

    return {token, expiresIn}
  } catch (error) {
    console.log(error)
  }
}

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 2 // 2h
  try {
    const refreshToken = jwt.sign({uid}, process.env.JWT_REFRESH, {expiresIn})
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.MODE == "production", // false
      expires: new Date(Date.now() + expiresIn * 1000),
      sameSite:'none'
    });
  } catch (error) {
    console.log(error)
  }
};

export const tokenVerificationErrors = {
  "invalid signature": "Invalid JWT signature",
  "jwt expired": "JWT expired",
  "invalid token": "Invalid token",
  "No Bearer": "Format Bearer needed",
  "jwt malformed": "Invalid JWT format"
}
