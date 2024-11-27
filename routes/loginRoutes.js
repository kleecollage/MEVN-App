import { compareSync } from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = Router()

// POST: User access // EndPoint: /login
router.post('/', async (req, res) => {
  const body = req.body;

  try {
    const userDB = await User.findOne({email: body.email})
    // Evaluate user
    if (!userDB) {
      return res.status(400).json({
        message: "This email doesn't exists"
      })
    }
    // Evaluate password
    if (!compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        message: "Incorrect password"
      })
    }
    // Generate Token
    const token = jwt.sign({
      data: userDB
    }, 'secret', { expiresIn: 60 * 60 * 4 }); // 4 hours

    res.json({
      userDB,
      token
    })

  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error
    })
  }

})



export default router
