import mongoose, { Schema } from "mongoose";

const roles = {
  values: ['ADMIN', 'USER'],
  message: '{VALUE} Invalid role'
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name file is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    message: 'Error, expected {VALUE} to be unique.'
  },
  password: {type: String, required: [true, 'Password is required']},
  date: {type: Date, default: Date.now},
  role: {type: String, default: 'USER', enum: roles},
  active: {type: Boolean, default: true}
});

// Password is not sending to view
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj
}

const User = mongoose.model('User', userSchema);

export default User