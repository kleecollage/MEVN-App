import express from "express";
import 'dotenv/config'
import './database/connectDb.js'
import authRouter from './routes/auth.route.js'

const app = express();
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT) )

app.use(express.json());
app.use("/api/v1", authRouter)