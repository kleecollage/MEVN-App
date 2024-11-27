import history from 'connect-history-api-fallback';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import loginRoutes from './routes/loginRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import userRoutes from './routes/userRoutes.js';

//** APP INIT **//
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//** DB CONNECTION **//
mongoose.connect(process.env.MONGO_URI).then(
  () => { console.log('connected to mongoDb') },
  err => { console.error('Error connecting to MongoDB:', err); }
);

//** MIDDLEWARES **//
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//** ROUTES **//
app.use('/api', noteRoutes);
app.use('/api', userRoutes);
app.use('/login', loginRoutes);
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// MIDDLEWARE for router history mode //
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))

//** SERVER **//
app.set( 'port', process.env.PORT || 3000 )
app.listen(app.get('port'), () => {
  console.log(`App listening on port: ${app.get('port')}`)
})
