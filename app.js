import history from 'connect-history-api-fallback';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

const app = express()

// MIDDLEWARES //
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTES //
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// MIDDLEWARE for router history mode //
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))

// SERVER
app.set( 'port', process.env.PORT || 3000 )
app.listen(app.get('port'), () => {
  console.log(`App listening on port: ${app.get('port')}`)
})
