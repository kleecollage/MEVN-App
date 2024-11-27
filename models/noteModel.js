import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
  name: { type: String, required: [true, "Name field is required"], },
  description: String,
  userId: String,
  date: { type: String, default: Date.now() },
  active: { type: Boolean, default: true }
});

// transform into a model //
const Note = mongoose.model('Note', noteSchema)

export default Note;