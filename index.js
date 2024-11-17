import express from "express";
import cookieParser from "cookie-parser";
import 'dotenv/config'
import './database/connectDb.js'
import authRouter from './routes/auth.route.js'
import linkRouter from './routes/link.router.js'

const app = express();
//* MIDLEWARES *// 
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public')) // only 4 login/token testing
//* ROUTES *//
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);
//* SERVER *//
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT) )

