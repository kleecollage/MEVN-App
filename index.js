import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import 'dotenv/config';
import './database/connectDb.js';
import authRouter from './routes/auth.route.js';
import linkRouter from './routes/link.route.js';
import redirectRouter from "./routes/redirect.route.js";

const app = express();
const whiteList = [ process.env.ORIGIN1, process.env.ORIGIN2, process.env.ORIGIN3, process.env.ORIGIN4]

// app.use(cors({
//   origin: [process.env.ORIGIN1]
// }))
//** CORS **//
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || whiteList.includes(origin)) {
      return callback(null, origin);
    }
    return callback("CORS error. Origin: " + origin + " not authorized")
  }
}))

//* MIDLEWARES *// 
app.use(express.json());
app.use(cookieParser());
// app.use(express.static('public')); // only 4 login/token testing
//* ROUTES *//
// app.use('/', redirectRouter); // backend redirection examples
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);
//* SERVER *//
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT) )