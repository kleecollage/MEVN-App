import express from 'express';
import { verifyAuth } from '../middleware/authentication.js';
import Note from '../models/noteModel.js'; // Note model //

const router = express.Router();

// POST: Add a new note // EndPoint: /api/new-note
router.post('/new-note', verifyAuth, async (req, res) => {
  const body = req.body
  body.userId = req.user._id

  try {
    const noteDB = await Note.create(body)
    res.status(200).json(noteDB)
  } catch (error) {
    return res.status(500).json({
      msg: 'Something went wrong',
      error
    })
  }
});

// GET: Get note by Id // EndPoint: /api/note/:id
router.get('/note/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const noteDB = await Note.findOne({_id})
    res.json(noteDB) // status 200 is default
  } catch (error) {
    return res.status(400).json({
      msg: 'Something went wrong',
      error
    })
  }
})

// GET: Get all notes // EndPoint: /api/note/
router.get('/note', verifyAuth, async(req, res) => {
  const userId = req.user._id

  try {
    const noteDB = await Note.find({userId});
    res.json(noteDB)
  } catch (error) {
    return res.status(400).json({
      msg: 'Something went wrong',
      error
    })
  }
})

// DELETE: Delete note by id // EndPoint: /api/note/id
router.delete('/note/:id',async(req, res) => {
  const _id = req.params.id;
  try {
    const noteDB = await Note.findByIdAndDelete({_id});

    if (!noteDB){
      return res.status(400).json({
        msg: 'Something went wrong',
        error
      })
    }

    res.json(noteDB)

  } catch (error) {
    return res.status(500).json({
      msg: 'Something went wrong',
      error
    })
  }
})

// PUT: Update note by id // EndPoint: /api/note/id
router.put('/note/:id',async(req, res) => {
  const _id = req.params.id;
  const body = req.body;

  try {
    const noteDB = await Note.findByIdAndUpdate(_id, body, {new: true});
    res.json(noteDB)
  } catch (error) {
    return res.status(500).json({
      msg: 'Something went wrong',
      error
    })
  }
})


// Exports module //
export default router;