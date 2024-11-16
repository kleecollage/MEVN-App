import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const expiresIn = 60 * 15 // 15 mins
  try {
    const token = jwt.sign({uid}, process.env.JWT_SECRET, { expiresIn })

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
      secure: process.env.MODO == "production", // false
      expires: new Date(Date.now() + expiresIn * 1000)
    });
  } catch (error) {
    console.log(error)
  }
}