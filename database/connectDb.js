import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO)
  console.log('DB connection successful!')
} catch (error) {
  console.log("Couldn't connect to MongoDB: " + error)
}