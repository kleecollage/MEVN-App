import bcrypt from 'bcrypt';
import express from 'express';
import underscore from 'underscore';
import { verifyAdmin, verifyAuth } from '../middleware/authentication.js';
import User from '../models/userModel.js';


const router = express.Router();
const _ = underscore

// POST: Create user // EndPoint: /api/new-user
router.post('/new-user' ,async (req, res) => {
  const body = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  // Encrypt password
  body.password = bcrypt.hashSync(req.body.password, 10);

  try {
    const userDB = await User.create(body);
    res.json(userDB);
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error
    })
  }
})

// PUT: Update user by id // EndPoint: /api/user/:id
router.put('/user/:id', [verifyAuth, verifyAdmin] ,async(req, res) => {
  const _id = req.params.id;
  const body = _.pick(req.body, ['name', 'email', 'password', 'active']);

  if (body.password) // Encrypt password
    body.password = bcrypt.hashSync(req.body.password, 10);

  try {
    const userDB = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true})
    return res.json(userDB)
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error
    })
  }
})

export default router